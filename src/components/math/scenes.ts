/**
 * Mathematical scenes drawn behind the hero portrait.
 *
 * Every scene draws into a square canvas of side `size`, inside a circle of
 * radius `R` around the centre (the canvas is masked to a soft circle). Each
 * one builds itself up over its first few seconds and then keeps moving.
 */

export type Palette = {
  blue: string
  yellow: string
  gray: string
}

export type Frame = {
  ctx: CanvasRenderingContext2D
  size: number
  /** Milliseconds since the scene started. */
  t: number
  palette: Palette
}

export type Scene = {
  id: string
  name: string
  formula: string
  /** Time (ms) by which the scene is fully built; used for a still frame. */
  settle: number
  /** Precompute anything size-dependent and return the per-frame drawer. */
  create: (size: number) => (frame: Frame) => void
}

const TAU = Math.PI * 2
const easeOut = (x: number) => 1 - Math.pow(1 - Math.min(1, Math.max(0, x)), 3)
const radius = (size: number) => (size / 2) * 0.92

function primeKinds(limit: number): Uint8Array {
  const composite = new Uint8Array(limit + 3)
  composite[0] = composite[1] = 1
  for (let i = 2; i * i <= limit + 2; i++) {
    if (!composite[i]) for (let j = i * i; j <= limit + 2; j += i) composite[j] = 1
  }
  // 0 = composite, 1 = prime, 2 = twin prime
  const kinds = new Uint8Array(limit + 1)
  for (let n = 2; n <= limit; n++) {
    if (composite[n]) continue
    const twin = (n > 2 && !composite[n - 2]) || !composite[n + 2]
    kinds[n] = twin ? 2 : 1
  }
  return kinds
}

/** Fill many small dots of one colour in a single path. */
function dots(
  ctx: CanvasRenderingContext2D,
  points: ArrayLike<number>,
  count: number,
  r: number,
  color: string,
  alpha = 1,
) {
  ctx.beginPath()
  for (let i = 0; i < count * 2; i += 2) {
    const x = points[i]
    const y = points[i + 1]
    ctx.moveTo(x + r, y)
    ctx.arc(x, y, r, 0, TAU)
  }
  ctx.globalAlpha = alpha
  ctx.fillStyle = color
  ctx.fill()
  ctx.globalAlpha = 1
}

/* 1. Sacks spiral ---------------------------------------------------------- */

const sacks: Scene = {
  id: 'sacks',
  name: 'Sacks spiral',
  formula: 'r = √n,  θ = 2π√n',
  settle: 2600,
  create(size) {
    const N = 4200
    const kinds = primeKinds(N)
    const c = size / 2
    const scale = radius(size) / Math.sqrt(N)
    const buckets = [new Float32Array(N * 2), new Float32Array(N * 2), new Float32Array(N * 2)]
    const counts = [0, 0, 0]

    return ({ ctx, t, palette }) => {
      const shown = Math.floor(easeOut(t / 2600) * N)
      const rot = t * 0.000035
      counts.fill(0)
      for (let n = 1; n <= shown; n++) {
        const k = kinds[n]
        const s = Math.sqrt(n)
        const theta = TAU * s + rot
        const i = counts[k]++ * 2
        buckets[k][i] = c + s * scale * Math.cos(theta)
        buckets[k][i + 1] = c - s * scale * Math.sin(theta)
      }
      dots(ctx, buckets[0], counts[0], 0.7, palette.gray, 0.35)
      dots(ctx, buckets[1], counts[1], 1.45, palette.blue, 0.9)
      dots(ctx, buckets[2], counts[2], 1.7, palette.yellow)
    }
  },
}

/* 2. Ulam spiral ----------------------------------------------------------- */

const ulam: Scene = {
  id: 'ulam',
  name: 'Ulam spiral',
  formula: 'primes on a square spiral',
  settle: 3000,
  create(size) {
    const K = 71
    const N = K * K
    const kinds = primeKinds(N)
    const R = radius(size)
    const cell = (R * 2) / K / 1.08
    // Walk the square spiral: right 1, up 1, left 2, down 2, right 3, ...
    const gx = new Int16Array(N + 1)
    const gy = new Int16Array(N + 1)
    let x = 0
    let y = 0
    let n = 1
    let step = 1
    const dirs = [
      [1, 0],
      [0, -1],
      [-1, 0],
      [0, 1],
    ]
    let d = 0
    gx[1] = 0
    gy[1] = 0
    outer: while (n < N) {
      for (let rep = 0; rep < 2; rep++) {
        for (let s = 0; s < step; s++) {
          x += dirs[d][0]
          y += dirs[d][1]
          n++
          if (n > N) break outer
          gx[n] = x
          gy[n] = y
        }
        d = (d + 1) % 4
      }
      step++
    }
    const buckets = [new Float32Array(N * 2), new Float32Array(N * 2), new Float32Array(N * 2)]
    const counts = [0, 0, 0]
    const c = size / 2

    return ({ ctx, t, palette }) => {
      const shown = Math.floor(easeOut(t / 3000) * N)
      const rot = t * 0.00004
      const cos = Math.cos(rot)
      const sin = Math.sin(rot)
      counts.fill(0)
      for (let i = 1; i <= shown; i++) {
        const px = gx[i] * cell
        const py = gy[i] * cell
        const X = px * cos - py * sin
        const Y = px * sin + py * cos
        if (X * X + Y * Y > R * R) continue
        const k = kinds[i]
        const j = counts[k]++ * 2
        buckets[k][j] = c + X
        buckets[k][j + 1] = c + Y
      }
      dots(ctx, buckets[0], counts[0], 0.6, palette.gray, 0.3)
      dots(ctx, buckets[1], counts[1], 1.4, palette.blue, 0.9)
      dots(ctx, buckets[2], counts[2], 1.6, palette.yellow)
    }
  },
}

/* 3. Fourier epicycles ----------------------------------------------------- */

const fourier: Scene = {
  id: 'fourier',
  name: 'Fourier epicycles',
  formula: 'f(t) = Σ cₖ e^{ikt}',
  settle: 9000,
  create(size) {
    // Sample a five-pointed star and take its discrete Fourier transform.
    const M = 240
    const verts: [number, number][] = []
    for (let i = 0; i < 10; i++) {
      const r = i % 2 === 0 ? 1 : 0.42
      const a = -Math.PI / 2 + (i * Math.PI) / 5
      verts.push([r * Math.cos(a), r * Math.sin(a)])
    }
    const re: number[] = []
    const im: number[] = []
    for (let i = 0; i < M; i++) {
      const u = (i / M) * 10
      const k = Math.floor(u)
      const f = u - k
      const [ax, ay] = verts[k]
      const [bx, by] = verts[(k + 1) % 10]
      re.push(ax + (bx - ax) * f)
      im.push(ay + (by - ay) * f)
    }
    type Term = { freq: number; amp: number; phase: number }
    const terms: Term[] = []
    for (let k = 0; k < M; k++) {
      let sr = 0
      let si = 0
      for (let n = 0; n < M; n++) {
        const a = (TAU * k * n) / M
        sr += re[n] * Math.cos(a) + im[n] * Math.sin(a)
        si += im[n] * Math.cos(a) - re[n] * Math.sin(a)
      }
      sr /= M
      si /= M
      terms.push({
        freq: k <= M / 2 ? k : k - M,
        amp: Math.hypot(sr, si),
        phase: Math.atan2(si, sr),
      })
    }
    terms.sort((a, b) => b.amp - a.amp)
    const used = terms.slice(0, 48)

    const c = size / 2
    const scale = radius(size) * 0.86
    const PERIOD = 9000
    const TRACE = 360

    const point = (tau: number, upTo = used.length) => {
      let x = 0
      let y = 0
      for (let i = 0; i < upTo; i++) {
        const { freq, amp, phase } = used[i]
        x += amp * Math.cos(freq * tau + phase)
        y += amp * Math.sin(freq * tau + phase)
      }
      return [c + x * scale, c + y * scale] as const
    }

    return ({ ctx, t, palette }) => {
      const tau = ((t % PERIOD) / PERIOD) * TAU
      const progress = Math.min(1, t / PERIOD)

      // Trace drawn so far (full shape after the first lap)
      ctx.beginPath()
      const steps = Math.floor(TRACE * progress)
      for (let i = 0; i <= steps; i++) {
        const [x, y] = point((i / TRACE) * TAU)
        if (i === 0) ctx.moveTo(x, y)
        else ctx.lineTo(x, y)
      }
      if (progress >= 1) ctx.closePath()
      ctx.strokeStyle = palette.yellow
      ctx.lineWidth = 1.8
      ctx.stroke()

      // Epicycles
      let x = c
      let y = c
      ctx.lineWidth = 1
      for (let i = 0; i < used.length; i++) {
        const { freq, amp, phase } = used[i]
        const r = amp * scale
        const nx = x + r * Math.cos(freq * tau + phase)
        const ny = y + r * Math.sin(freq * tau + phase)
        if (r > 1.5) {
          ctx.beginPath()
          ctx.arc(x, y, r, 0, TAU)
          ctx.strokeStyle = palette.gray
          ctx.globalAlpha = 0.28
          ctx.stroke()
          ctx.globalAlpha = 1
        }
        ctx.beginPath()
        ctx.moveTo(x, y)
        ctx.lineTo(nx, ny)
        ctx.strokeStyle = palette.blue
        ctx.stroke()
        x = nx
        y = ny
      }
      ctx.beginPath()
      ctx.arc(x, y, 3, 0, TAU)
      ctx.fillStyle = palette.yellow
      ctx.fill()
    }
  },
}

/* 4. Lissajous curve ------------------------------------------------------- */

const lissajous: Scene = {
  id: 'lissajous',
  name: 'Lissajous curve',
  formula: 'x = sin(5t + δ),  y = sin(4t)',
  settle: 2500,
  create(size) {
    const c = size / 2
    const A = radius(size) * 0.68
    const STEPS = 900
    return ({ ctx, t, palette }) => {
      const delta = t * 0.00045
      const shown = Math.floor(easeOut(t / 2500) * STEPS)
      const at = (u: number) =>
        [c + A * Math.sin(5 * u + delta), c - A * Math.sin(4 * u)] as const

      // Faint echo of where the curve was a moment ago
      ctx.beginPath()
      for (let i = 0; i <= shown; i++) {
        const u = (i / STEPS) * TAU
        const x = c + A * Math.sin(5 * u + delta - 0.25)
        const y = c - A * Math.sin(4 * u)
        if (i === 0) ctx.moveTo(x, y)
        else ctx.lineTo(x, y)
      }
      ctx.strokeStyle = palette.gray
      ctx.globalAlpha = 0.35
      ctx.lineWidth = 1
      ctx.stroke()
      ctx.globalAlpha = 1

      ctx.beginPath()
      for (let i = 0; i <= shown; i++) {
        const [x, y] = at((i / STEPS) * TAU)
        if (i === 0) ctx.moveTo(x, y)
        else ctx.lineTo(x, y)
      }
      ctx.strokeStyle = palette.blue
      ctx.lineWidth = 1.6
      ctx.stroke()

      const [hx, hy] = at(t * 0.0012)
      ctx.beginPath()
      ctx.arc(hx, hy, 3.5, 0, TAU)
      ctx.fillStyle = palette.yellow
      ctx.fill()
    }
  },
}

/* 5. Lorenz attractor ------------------------------------------------------ */

const lorenz: Scene = {
  id: 'lorenz',
  name: 'Lorenz attractor',
  formula: 'ẋ = σ(y − x),  ẏ = x(ρ − z) − y,  ż = xy − βz',
  settle: 5000,
  create(size) {
    const sigma = 10
    const rho = 28
    const beta = 8 / 3
    const dt = 0.005
    const STEPS = 9000
    const pts = new Float32Array(STEPS * 3)
    let x = 0.1
    let y = 0
    let z = 0
    for (let i = -600; i < STEPS; i++) {
      const dx = sigma * (y - x)
      const dy = x * (rho - z) - y
      const dz = x * y - beta * z
      x += dx * dt
      y += dy * dt
      z += dz * dt
      if (i >= 0) {
        pts[i * 3] = x
        pts[i * 3 + 1] = y
        pts[i * 3 + 2] = z
      }
    }
    const c = size / 2
    const scale = radius(size) / 24.5
    const TAIL = 260

    return ({ ctx, t, palette }) => {
      const shown = Math.max(2, Math.floor(easeOut(t / 5000) * STEPS))
      const phi = t * 0.00022
      const cos = Math.cos(phi)
      const sin = Math.sin(phi)
      const project = (i: number) =>
        [
          c + (pts[i * 3] * cos - pts[i * 3 + 1] * sin) * scale,
          c - (pts[i * 3 + 2] - 25) * scale,
        ] as const

      ctx.beginPath()
      for (let i = 0; i < shown; i++) {
        const [px, py] = project(i)
        if (i === 0) ctx.moveTo(px, py)
        else ctx.lineTo(px, py)
      }
      ctx.strokeStyle = palette.blue
      ctx.globalAlpha = 0.6
      ctx.lineWidth = 0.9
      ctx.stroke()
      ctx.globalAlpha = 1

      // A bright "particle" running along the attractor
      const head = Math.floor((t * 0.6) % STEPS)
      const end = Math.min(head, shown - 1)
      ctx.beginPath()
      for (let i = Math.max(0, end - TAIL); i <= end; i++) {
        const [px, py] = project(i)
        if (i === Math.max(0, end - TAIL)) ctx.moveTo(px, py)
        else ctx.lineTo(px, py)
      }
      ctx.strokeStyle = palette.yellow
      ctx.lineWidth = 1.8
      ctx.stroke()
      const [hx, hy] = project(end)
      ctx.beginPath()
      ctx.arc(hx, hy, 3, 0, TAU)
      ctx.fillStyle = palette.yellow
      ctx.fill()
    }
  },
}

/* 6. Mandelbrot set -------------------------------------------------------- */

const mandelbrot: Scene = {
  id: 'mandelbrot',
  name: 'Mandelbrot set',
  formula: 'z ↦ z² + c',
  settle: 3200,
  create(size) {
    const MAX = 80
    const c = size / 2
    const R = radius(size)
    const gap = Math.max(3, size / 160)
    const scale = (R * 2) / 2.9
    const cx0 = -0.62
    const xs: number[] = []
    const ys: number[] = []
    const iters: number[] = []
    for (let py = c - R; py <= c + R; py += gap) {
      for (let px = c - R; px <= c + R; px += gap) {
        const dx = px - c
        const dy = py - c
        if (dx * dx + dy * dy > R * R) continue
        const cr = cx0 + dx / scale
        const ci = dy / scale
        let zr = 0
        let zi = 0
        let n = 0
        while (n < MAX && zr * zr + zi * zi <= 4) {
          const tmp = zr * zr - zi * zi + cr
          zi = 2 * zr * zi + ci
          zr = tmp
          n++
        }
        if (n < 4) continue
        xs.push(dx)
        ys.push(dy)
        iters.push(n)
      }
    }
    const total = xs.length
    const buckets = [new Float32Array(total * 2), new Float32Array(total * 2), new Float32Array(total * 2), new Float32Array(total * 2)]
    const counts = [0, 0, 0, 0]

    return ({ ctx, t, palette }) => {
      const limit = 4 + easeOut(t / 3200) * (MAX - 4)
      const rot = t * 0.00003
      const cos = Math.cos(rot)
      const sin = Math.sin(rot)
      counts.fill(0)
      for (let i = 0; i < total; i++) {
        const n = iters[i]
        if (n > limit) continue
        // 0: in the set, 1: far outside, 2: near the boundary, 3: on it
        const k = n >= MAX ? 0 : n < 9 ? 1 : n < 22 ? 2 : 3
        const j = counts[k]++ * 2
        buckets[k][j] = c + xs[i] * cos - ys[i] * sin
        buckets[k][j + 1] = c + xs[i] * sin + ys[i] * cos
      }
      dots(ctx, buckets[0], counts[0], 0.7, palette.gray, 0.3)
      dots(ctx, buckets[1], counts[1], 0.7, palette.gray, 0.45)
      dots(ctx, buckets[2], counts[2], 1.2, palette.blue, 0.9)
      dots(ctx, buckets[3], counts[3], 1.4, palette.yellow)
    }
  },
}

/* 7. Barnsley fern --------------------------------------------------------- */

const barnsley: Scene = {
  id: 'barnsley',
  name: 'Barnsley fern',
  formula: 'four affine maps, chosen at random',
  settle: 4000,
  create(size) {
    const N = 26000
    const raw = new Float32Array(N * 2)
    const stem = new Uint8Array(N)
    let x = 0
    let y = 0
    let seed = 7
    const rand = () => {
      seed = (seed * 16807) % 2147483647
      return seed / 2147483647
    }
    for (let i = 0; i < N; i++) {
      const r = rand()
      let nx: number
      let ny: number
      if (r < 0.01) {
        nx = 0
        ny = 0.16 * y
        stem[i] = 1
      } else if (r < 0.86) {
        nx = 0.85 * x + 0.04 * y
        ny = -0.04 * x + 0.85 * y + 1.6
      } else if (r < 0.93) {
        nx = 0.2 * x - 0.26 * y
        ny = 0.23 * x + 0.22 * y + 1.6
        stem[i] = 2
      } else {
        nx = -0.15 * x + 0.28 * y
        ny = 0.26 * x + 0.24 * y + 0.44
        stem[i] = 2
      }
      x = nx
      y = ny
      raw[i * 2] = x
      raw[i * 2 + 1] = y
    }
    const c = size / 2
    const R = radius(size)
    const scale = (R * 1.8) / 10
    const baseY = c + R * 0.9
    const blue = new Float32Array(N * 2)
    const yellow = new Float32Array(N * 2)

    return ({ ctx, t, palette }) => {
      const shown = Math.floor(easeOut(t / 4000) * N)
      const sway = Math.sin(t * 0.0007) * 0.035
      const cos = Math.cos(sway)
      const sin = Math.sin(sway)
      let nb = 0
      let ny = 0
      for (let i = 0; i < shown; i++) {
        const fx = (raw[i * 2] - 0.24) * scale
        const fy = raw[i * 2 + 1] * scale
        const px = c + fx * cos + fy * sin
        const py = baseY - (-fx * sin + fy * cos)
        if (stem[i] === 2 && i % 3 === 0) {
          yellow[ny * 2] = px
          yellow[ny * 2 + 1] = py
          ny++
        } else {
          blue[nb * 2] = px
          blue[nb * 2 + 1] = py
          nb++
        }
      }
      dots(ctx, blue, nb, 0.75, palette.blue, 0.85)
      dots(ctx, yellow, ny, 0.85, palette.yellow, 0.9)
    }
  },
}

/* 8. Koch snowflake -------------------------------------------------------- */

const koch: Scene = {
  id: 'koch',
  name: 'Koch snowflake',
  formula: 'dimension = log 4 / log 3',
  settle: 6000,
  create(size) {
    const LEVELS = 5
    const levels: number[][] = []
    let pts: number[] = []
    for (let i = 0; i < 3; i++) {
      const a = -Math.PI / 2 + (i * TAU) / 3
      pts.push(Math.cos(a), Math.sin(a))
    }
    levels.push(pts)
    for (let l = 1; l <= LEVELS; l++) {
      const next: number[] = []
      const n = pts.length / 2
      for (let i = 0; i < n; i++) {
        const ax = pts[i * 2]
        const ay = pts[i * 2 + 1]
        const bx = pts[((i + 1) % n) * 2]
        const by = pts[((i + 1) % n) * 2 + 1]
        const dx = (bx - ax) / 3
        const dy = (by - ay) / 3
        const px = ax + dx
        const py = ay + dy
        const qx = ax + 2 * dx
        const qy = ay + 2 * dy
        // Peak: rotate the middle third by -60° (outwards for this winding)
        const cos = Math.cos(-Math.PI / 3)
        const sin = Math.sin(-Math.PI / 3)
        const tx = px + dx * cos - dy * sin
        const ty = py + dx * sin + dy * cos
        next.push(ax, ay, px, py, tx, ty, qx, qy)
      }
      pts = next
      levels.push(pts)
    }
    const c = size / 2
    const scale = radius(size) * 0.9

    const outline = (ctx: CanvasRenderingContext2D, p: number[], rot: number) => {
      const cos = Math.cos(rot)
      const sin = Math.sin(rot)
      ctx.beginPath()
      for (let i = 0; i < p.length; i += 2) {
        const x = c + (p[i] * cos - p[i + 1] * sin) * scale
        const y = c + (p[i] * sin + p[i + 1] * cos) * scale
        if (i === 0) ctx.moveTo(x, y)
        else ctx.lineTo(x, y)
      }
      ctx.closePath()
    }

    return ({ ctx, t, palette }) => {
      const level = Math.min(LEVELS, Math.floor(t / 1100))
      const rot = t * 0.00006
      if (level > 0) {
        outline(ctx, levels[level - 1], rot)
        ctx.strokeStyle = palette.gray
        ctx.globalAlpha = 0.45
        ctx.lineWidth = 1
        ctx.stroke()
        ctx.globalAlpha = 1
      }
      outline(ctx, levels[level], rot)
      ctx.strokeStyle = palette.blue
      ctx.lineWidth = 1.6
      ctx.stroke()
      // Mark the vertices of the current level in yellow while they are few
      if (level <= 3) {
        const p = levels[level]
        const cos = Math.cos(rot)
        const sin = Math.sin(rot)
        const flat = new Float32Array(p.length)
        for (let i = 0; i < p.length; i += 2) {
          flat[i] = c + (p[i] * cos - p[i + 1] * sin) * scale
          flat[i + 1] = c + (p[i] * sin + p[i + 1] * cos) * scale
        }
        dots(ctx, flat, p.length / 2, 2.2, palette.yellow)
      }
    }
  },
}

/* 9. Cantor function ------------------------------------------------------- */

function cantor(x: number, depth: number): number {
  let result = 0
  let weight = 0.5
  for (let i = 0; i < depth; i++) {
    x *= 3
    const digit = Math.min(2, Math.floor(x))
    x -= digit
    if (digit === 1) return result + weight
    if (digit === 2) result += weight
    weight /= 2
  }
  return result + 2 * weight * x
}

const cantorScene: Scene = {
  id: 'cantor',
  name: 'Cantor function',
  formula: "the devil's staircase",
  settle: 6000,
  create(size) {
    const c = size / 2
    const half = radius(size) * 0.7
    const left = c - half
    const bottom = c + half
    const side = half * 2
    const SAMPLES = 900
    const MAX_DEPTH = 8

    return ({ ctx, t, palette }) => {
      const depth = Math.min(MAX_DEPTH, Math.floor(t / 700))

      // Axes
      ctx.beginPath()
      ctx.moveTo(left, bottom - side)
      ctx.lineTo(left, bottom)
      ctx.lineTo(left + side, bottom)
      ctx.strokeStyle = palette.gray
      ctx.globalAlpha = 0.5
      ctx.lineWidth = 1
      ctx.stroke()
      ctx.globalAlpha = 1

      // Staircase at the current depth
      ctx.beginPath()
      for (let i = 0; i <= SAMPLES; i++) {
        const x = i / SAMPLES
        const px = left + x * side
        const py = bottom - cantor(x, depth) * side
        if (i === 0) ctx.moveTo(px, py)
        else ctx.lineTo(px, py)
      }
      ctx.strokeStyle = palette.blue
      ctx.lineWidth = 1.7
      ctx.stroke()

      // The Cantor set at this depth, drawn under the axis
      let intervals: [number, number][] = [[0, 1]]
      for (let d = 0; d < Math.min(depth, 6); d++) {
        const next: [number, number][] = []
        for (const [a, b] of intervals) {
          const third = (b - a) / 3
          next.push([a, a + third], [b - third, b])
        }
        intervals = next
      }
      ctx.beginPath()
      for (const [a, b] of intervals) {
        ctx.moveTo(left + a * side, bottom + 14)
        ctx.lineTo(left + b * side, bottom + 14)
      }
      ctx.strokeStyle = palette.yellow
      ctx.lineWidth = 3
      ctx.stroke()
    }
  },
}

export const scenes: Scene[] = [
  sacks,
  ulam,
  fourier,
  lissajous,
  lorenz,
  mandelbrot,
  barnsley,
  koch,
  cantorScene,
]

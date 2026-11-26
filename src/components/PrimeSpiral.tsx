import { useEffect, useRef } from 'react'

const N = 4200
const REVEAL_MS = 2600
const SPIN_RAD_PER_MS = 0.000035

type Kind = 0 | 1 | 2 // composite, prime, twin prime

function classify(limit: number): Uint8Array {
  const composite = new Uint8Array(limit + 3)
  composite[0] = composite[1] = 1
  for (let i = 2; i * i <= limit + 2; i++) {
    if (!composite[i]) for (let j = i * i; j <= limit + 2; j += i) composite[j] = 1
  }
  const kinds = new Uint8Array(limit + 1)
  for (let n = 2; n <= limit; n++) {
    if (composite[n]) continue
    const twin = (n > 2 && !composite[n - 2]) || !composite[n + 2]
    kinds[n] = (twin ? 2 : 1) as Kind
  }
  return kinds
}

/**
 * The Sacks spiral: each integer n sits at radius √n and angle 2π√n, so
 * perfect squares line up on one ray and primes gather along curves.
 */
export default function PrimeSpiral() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const kinds = classify(N)
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const styles = getComputedStyle(document.documentElement)
    const accent = styles.getPropertyValue('--accent').trim() || '#5b8cff'
    const highlight = styles.getPropertyValue('--highlight').trim() || '#f5b544'

    let size = 0
    let frame = 0
    let start = 0
    let visible = true

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      size = canvas.clientWidth
      canvas.width = Math.round(size * dpr)
      canvas.height = Math.round(size * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const draw = (count: number, rotation: number) => {
      ctx.clearRect(0, 0, size, size)
      const c = size / 2
      const scale = (size / 2 / Math.sqrt(N)) * 0.97
      const layers: [Kind, string, number, number][] = [
        [0, 'rgba(150, 160, 181, 0.16)', 0.7, 0],
        [1, accent, 1.45, 0.9],
        [2, highlight, 1.7, 1],
      ]
      for (const [kind, color, radius, alpha] of layers) {
        ctx.beginPath()
        for (let n = 1; n <= count; n++) {
          if (kinds[n] !== kind) continue
          const s = Math.sqrt(n)
          const r = s * scale
          const theta = 2 * Math.PI * s + rotation
          const x = c + r * Math.cos(theta)
          const y = c - r * Math.sin(theta)
          ctx.moveTo(x + radius, y)
          ctx.arc(x, y, radius, 0, Math.PI * 2)
        }
        ctx.fillStyle = color
        ctx.globalAlpha = alpha || 1
        ctx.fill()
      }
      ctx.globalAlpha = 1
    }

    const tick = (now: number) => {
      if (!start) start = now
      const elapsed = now - start
      const progress = Math.min(1, elapsed / REVEAL_MS)
      const eased = 1 - Math.pow(1 - progress, 3)
      draw(Math.floor(eased * N), elapsed * SPIN_RAD_PER_MS)
      if (visible) frame = requestAnimationFrame(tick)
    }

    const ro = new ResizeObserver(() => {
      resize()
      if (reduceMotion) draw(N, 0)
    })
    ro.observe(canvas)
    resize()

    if (reduceMotion) {
      draw(N, 0)
      return () => ro.disconnect()
    }

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      cancelAnimationFrame(frame)
      if (visible) frame = requestAnimationFrame(tick)
    })
    io.observe(canvas)

    return () => {
      cancelAnimationFrame(frame)
      io.disconnect()
      ro.disconnect()
    }
  }, [])

  return <canvas ref={canvasRef} aria-hidden="true" />
}

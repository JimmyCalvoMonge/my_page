import { useEffect, useRef } from 'react'

type Node = { x: number; y: number; vx: number; vy: number; hub: boolean }
type Pulse = { a: number; b: number; start: number }

const LINK_DISTANCE = 170
const POINTER_DISTANCE = 210
const PULSE_MS = 1100
const PULSE_EVERY_MS = 180

/** Reads an "R G B" channel token such as --accent-rgb. */
function channels(name: string, fallback: string): string {
  const raw = getComputedStyle(document.documentElement).getPropertyValue(name).trim() || fallback
  return raw.split(/[\s,]+/).join(', ')
}

/**
 * A drifting graph for the contact section: nearby nodes link up, yellow
 * pulses travel along the links, and nodes near the pointer connect to it.
 * Fills its positioned parent; the parent receives the pointer events.
 */
export default function ConnectNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const host = canvas?.parentElement
    const ctx = canvas?.getContext('2d')
    if (!canvas || !host || !ctx) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const accent = channels('--accent-rgb', '64 140 255')
    const highlight = channels('--highlight-rgb', '250 204 21')
    const gray = '150, 150, 160'

    let width = 0
    let height = 0
    let nodes: Node[] = []
    let pulses: Pulse[] = []
    let lastPulse = 0
    let last = 0
    let frame = 0
    const pointer = { x: 0, y: 0, active: false }

    const seed = () => {
      const count = Math.max(22, Math.min(140, Math.round((width * height) / 8500)))
      nodes = Array.from({ length: count }, () => {
        const angle = Math.random() * Math.PI * 2
        const speed = 0.008 + Math.random() * 0.018 // px per ms
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          hub: Math.random() < 0.12,
        }
      })
      pulses = []
    }

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = host.clientWidth
      height = host.clientHeight
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      seed()
    }

    const draw = (now: number, dt: number) => {
      // Move, bouncing softly off the edges
      for (const n of nodes) {
        n.x += n.vx * dt
        n.y += n.vy * dt
        if (n.x < 0 || n.x > width) n.vx *= -1
        if (n.y < 0 || n.y > height) n.vy *= -1
        n.x = Math.max(0, Math.min(width, n.x))
        n.y = Math.max(0, Math.min(height, n.y))
      }

      ctx.clearRect(0, 0, width, height)

      // Links between nearby nodes, fading with distance
      const links: [number, number][] = []
      ctx.lineWidth = 1
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x
          const dy = nodes[i].y - nodes[j].y
          const d = Math.hypot(dx, dy)
          if (d > LINK_DISTANCE) continue
          links.push([i, j])
          const strength = 1 - d / LINK_DISTANCE
          ctx.strokeStyle = `rgba(${accent}, ${(strength * 0.5).toFixed(3)})`
          ctx.beginPath()
          ctx.moveTo(nodes[i].x, nodes[i].y)
          ctx.lineTo(nodes[j].x, nodes[j].y)
          ctx.stroke()
        }
      }

      // The pointer joins the graph
      if (pointer.active) {
        for (const n of nodes) {
          const d = Math.hypot(n.x - pointer.x, n.y - pointer.y)
          if (d > POINTER_DISTANCE) continue
          ctx.strokeStyle = `rgba(${highlight}, ${((1 - d / POINTER_DISTANCE) * 0.45).toFixed(3)})`
          ctx.beginPath()
          ctx.moveTo(pointer.x, pointer.y)
          ctx.lineTo(n.x, n.y)
          ctx.stroke()
        }
      }

      // Nodes
      for (const n of nodes) {
        ctx.beginPath()
        ctx.arc(n.x, n.y, n.hub ? 2.8 : 1.8, 0, Math.PI * 2)
        ctx.fillStyle = n.hub ? `rgba(${accent}, 0.95)` : `rgba(${gray}, 0.75)`
        ctx.fill()
      }

      // Pulses: data travelling along a link
      if (!reduceMotion && links.length && now - lastPulse > PULSE_EVERY_MS) {
        const [a, b] = links[Math.floor(Math.random() * links.length)]
        pulses.push(Math.random() < 0.5 ? { a, b, start: now } : { a: b, b: a, start: now })
        lastPulse = now
      }
      pulses = pulses.filter((p) => now - p.start < PULSE_MS)
      for (const p of pulses) {
        const t = (now - p.start) / PULSE_MS
        const from = nodes[p.a]
        const to = nodes[p.b]
        const x = from.x + (to.x - from.x) * t
        const y = from.y + (to.y - from.y) * t
        const fade = Math.sin(Math.PI * t)
        ctx.beginPath()
        ctx.arc(x, y, 6, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${highlight}, ${(0.12 * fade).toFixed(3)})`
        ctx.fill()
        ctx.beginPath()
        ctx.arc(x, y, 2.2, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${highlight}, ${(0.95 * fade).toFixed(3)})`
        ctx.fill()
      }
    }

    const tick = (now: number) => {
      const dt = last ? Math.min(50, now - last) : 0
      last = now
      draw(now, dt)
      frame = requestAnimationFrame(tick)
    }

    const onMove = (e: PointerEvent) => {
      const rect = host.getBoundingClientRect()
      pointer.x = e.clientX - rect.left
      pointer.y = e.clientY - rect.top
      pointer.active = true
    }
    const onLeave = () => {
      pointer.active = false
    }

    resize()
    const ro = new ResizeObserver(() => {
      if (host.clientWidth === width && host.clientHeight === height) return
      resize()
      if (reduceMotion) draw(0, 0)
    })
    ro.observe(host)

    if (reduceMotion) {
      draw(0, 0)
      return () => ro.disconnect()
    }

    host.addEventListener('pointermove', onMove)
    host.addEventListener('pointerleave', onLeave)

    // Only animate while the section is on screen
    const io = new IntersectionObserver(([entry]) => {
      cancelAnimationFrame(frame)
      last = 0
      if (entry.isIntersecting) frame = requestAnimationFrame(tick)
    })
    io.observe(host)

    return () => {
      cancelAnimationFrame(frame)
      io.disconnect()
      ro.disconnect()
      host.removeEventListener('pointermove', onMove)
      host.removeEventListener('pointerleave', onLeave)
    }
  }, [])

  return <canvas ref={canvasRef} aria-hidden="true" />
}

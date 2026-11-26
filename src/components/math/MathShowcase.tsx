import { useCallback, useEffect, useRef, useState } from 'react'
import { scenes, type Frame, type Palette } from './scenes.ts'
import styles from './MathShowcase.module.css'

const SCENE_MS = 11000
const FADE_MS = 700

type Props = {
  /** Rendered in the middle of the canvas (the portrait). */
  children?: React.ReactNode
}

export default function MathShowcase({ children }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [index, setIndex] = useState(0)
  const indexRef = useRef(0)
  const startRef = useRef(0)

  const go = useCallback((next: number) => {
    const i = (next + scenes.length) % scenes.length
    indexRef.current = i
    startRef.current = performance.now()
    setIndex(i)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const css = getComputedStyle(document.documentElement)
    const palette: Palette = {
      blue: css.getPropertyValue('--accent').trim() || '#408cff',
      yellow: css.getPropertyValue('--highlight').trim() || '#facc15',
      gray: css.getPropertyValue('--text-faint').trim() || '#6b6b74',
    }

    let size = 0
    let frame = 0
    let visible = true
    let shownIndex = -1
    let drawer: ((f: Frame) => void) | null = null
    const cache = new Map<string, (f: Frame) => void>()

    const drawerFor = (i: number) => {
      const scene = scenes[i]
      const key = `${scene.id}@${size}`
      let d = cache.get(key)
      if (!d) {
        d = scene.create(size)
        cache.set(key, d)
      }
      return d
    }

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const next = Math.round(canvas.clientWidth)
      if (next === size) return
      size = next
      cache.clear()
      shownIndex = -1
      canvas.width = Math.round(size * dpr)
      canvas.height = Math.round(size * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const render = (now: number) => {
      if (!size) return
      const i = indexRef.current
      if (i !== shownIndex) {
        drawer = drawerFor(i)
        shownIndex = i
      }
      const elapsed = now - startRef.current
      const t = reduceMotion ? scenes[i].settle : elapsed
      ctx.clearRect(0, 0, size, size)
      drawer?.({ ctx, size, t, palette })

      if (reduceMotion) {
        canvas.style.opacity = '1'
        return
      }
      const fadeIn = Math.min(1, elapsed / FADE_MS)
      const fadeOut = Math.min(1, (SCENE_MS - elapsed) / FADE_MS)
      canvas.style.opacity = String(Math.max(0, Math.min(fadeIn, fadeOut)))
      if (elapsed >= SCENE_MS) go(i + 1)
    }

    const tick = (now: number) => {
      render(now)
      if (visible && !reduceMotion) frame = requestAnimationFrame(tick)
    }

    startRef.current = performance.now()
    resize()

    const ro = new ResizeObserver(() => {
      resize()
      if (reduceMotion) render(performance.now())
    })
    ro.observe(canvas)

    if (reduceMotion) {
      render(performance.now())
      // Redraw when the visitor steps through scenes by hand
      const onChange = () => render(performance.now())
      window.addEventListener('mathshowcase:change', onChange)
      return () => {
        ro.disconnect()
        window.removeEventListener('mathshowcase:change', onChange)
      }
    }

    let pausedAt = 0
    const io = new IntersectionObserver(([entry]) => {
      const wasVisible = visible
      visible = entry.isIntersecting
      cancelAnimationFrame(frame)
      if (visible) {
        // Resume the current scene where it left off
        if (!wasVisible) startRef.current = performance.now() - pausedAt
        frame = requestAnimationFrame(tick)
      } else {
        pausedAt = performance.now() - startRef.current
      }
    })
    io.observe(canvas)

    return () => {
      cancelAnimationFrame(frame)
      io.disconnect()
      ro.disconnect()
    }
  }, [go])

  useEffect(() => {
    window.dispatchEvent(new Event('mathshowcase:change'))
  }, [index])

  const scene = scenes[index]
  const number = (n: number) => String(n + 1).padStart(2, '0')

  return (
    <figure className={styles.showcase}>
      <div className={styles.stage}>
        <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />
        {children}
      </div>

      <figcaption className={styles.caption}>
        <button
          type="button"
          className={styles.nav}
          onClick={() => go(index - 1)}
          aria-label="Previous animation"
        >
          ‹
        </button>
        <span className={styles.text} aria-live="polite">
          <span className={styles.count}>
            {number(index)} / {number(scenes.length - 1)}
          </span>
          <span key={scene.id} className={styles.label}>
            <span className={styles.name}>{scene.name}</span>
            <span className={styles.formula}>{scene.formula}</span>
          </span>
        </span>
        <button
          type="button"
          className={styles.nav}
          onClick={() => go(index + 1)}
          aria-label="Next animation"
        >
          ›
        </button>
      </figcaption>
    </figure>
  )
}

import { useCallback, useEffect, useId, useRef, useState } from 'react'
import { useL } from '../../i18n/locale.tsx'
import { messages } from '../../i18n/messages.ts'
import { scenes, type Frame, type Palette } from './scenes.ts'
import { MathText, Tex } from './Tex.tsx'
import styles from './MathShowcase.module.css'

/** How long each scene stays up before the next one, while not paused. */
const SCENE_MS = 11000
const FADE_MS = 700

type Props = {
  /** Rendered in the middle of the canvas (the portrait). */
  children?: React.ReactNode
}

export default function MathShowcase({ children }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [index, setIndex] = useState(0)
  const [open, setOpen] = useState(false)
  const panelId = useId()
  const l = useL()
  const m = messages.showcase

  // Shared with the animation loop without re-running its effect
  const indexRef = useRef(0)
  const sceneStartRef = useRef(0) // drives each scene's own animation
  const slotRef = useRef(0) // time spent on this scene while not paused
  const pausedRef = useRef(false)

  const go = useCallback((next: number) => {
    const i = (next + scenes.length) % scenes.length
    indexRef.current = i
    sceneStartRef.current = performance.now()
    slotRef.current = 0
    setIndex(i)
  }, [])

  useEffect(() => {
    pausedRef.current = open
  }, [open])

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
    let lastNow = 0
    let hiddenAt = 0
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

      // Cap the step so a background tab doesn't skip scenes on return
      const dt = lastNow ? Math.min(100, now - lastNow) : 0
      lastNow = now
      if (!pausedRef.current) slotRef.current += dt

      const t = reduceMotion ? scenes[i].settle : now - sceneStartRef.current
      ctx.clearRect(0, 0, size, size)
      drawer?.({ ctx, size, t, palette })

      if (reduceMotion) {
        canvas.style.opacity = '1'
        return
      }
      const fadeIn = Math.min(1, t / FADE_MS)
      const fadeOut = pausedRef.current ? 1 : Math.min(1, (SCENE_MS - slotRef.current) / FADE_MS)
      canvas.style.opacity = String(Math.max(0, Math.min(fadeIn, fadeOut)))
      if (!pausedRef.current && slotRef.current >= SCENE_MS) go(i + 1)
    }

    const tick = (now: number) => {
      render(now)
      frame = requestAnimationFrame(tick)
    }

    sceneStartRef.current = performance.now()
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

    // Only animate while the canvas is on screen; resume where it left off
    const io = new IntersectionObserver(([entry]) => {
      cancelAnimationFrame(frame)
      if (entry.isIntersecting) {
        if (hiddenAt) sceneStartRef.current += performance.now() - hiddenAt
        hiddenAt = 0
        lastNow = 0
        frame = requestAnimationFrame(tick)
      } else {
        hiddenAt = performance.now()
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
        <div className={styles.bar}>
          <button
            type="button"
            className={styles.nav}
            onClick={() => go(index - 1)}
            aria-label={l(m.previous)}
          >
            ‹
          </button>
          <span className={styles.text} aria-live="polite">
            <span className={styles.count}>
              {number(index)} / {number(scenes.length - 1)}
            </span>
            <span key={scene.id} className={styles.label}>
              <span className={styles.name}>{l(scene.name)}</span>
              <span className={styles.formula}>
                <Tex>{l(scene.formula)}</Tex>
              </span>
            </span>
          </span>
          <button
            type="button"
            className={styles.nav}
            onClick={() => go(index + 1)}
            aria-label={l(m.next)}
          >
            ›
          </button>
        </div>

        <button
          type="button"
          className={styles.toggle}
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((v) => !v)}
        >
          {l(open ? m.hide : m.show)}
          <svg viewBox="0 0 24 24" aria-hidden="true" className={styles.chevron}>
            <path d="m6 9 6 6 6-6" />
          </svg>
        </button>

        <div
          id={panelId}
          className={`${styles.panel} ${open ? styles.panelOpen : ''}`}
          inert={!open}
        >
          <div className={styles.panelInner}>
            <p key={scene.id} className={styles.explanation}>
              <MathText>{l(scene.explanation)}</MathText>
            </p>
            <p className={styles.note}>{l(m.paused)}</p>
          </div>
        </div>
      </figcaption>
    </figure>
  )
}

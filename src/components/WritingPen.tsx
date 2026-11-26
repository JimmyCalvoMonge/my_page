import { useEffect, useRef, type RefObject } from 'react'
import styles from './WritingPen.module.css'

/** Upward drawing speed, in px per second. */
const SPEED = 110
const HOLD_MS = 1400
const FADE_MS = 700

/** Pencil tip position inside the 32×32 icon (bottom-left). */
const TIP_X = 2
const TIP_Y = 30
const ICON_SIZE = 34

/** An outline hand holding a pencil; the pencil tip is at (2, 30). */
function HandIcon() {
  return (
    <svg viewBox="0 0 32 32" width={ICON_SIZE} height={ICON_SIZE} className={styles.icon}>
      {/* Pencil */}
      <g className={styles.pencil}>
        <path d="M2 30 L3.6 24.8 L16.9 8.6 L20 11.2 L6.7 27.4 Z" />
        <path d="M3.6 24.8 L6.7 27.4" />
        <path d="M14.4 11.7 L17.5 14.3" />
      </g>
      {/* Hand gripping it from the right, with a cuff */}
      <g className={styles.hand}>
        <path d="M8.6 19.6 C 10.6 17.2, 12.4 15.4, 14.6 14.2 C 17.6 13.6, 21 14.4, 25.6 15.6 L 25.6 25.2 C 22.4 26.2, 19.4 26.4, 16.4 25.6 C 13.2 25.4, 10.4 24.2, 8.8 22.6 C 8 21.7, 7.9 20.5, 8.6 19.6 Z" />
        <path d="M11.4 21.4 C 13.6 20.2, 16.2 20, 18.4 21.4" />
        <path d="M13.2 25.4 L 13.6 23.6 M 16.4 25.6 L 16.6 23.8" />
        <path d="M25.6 14.6 L 30.4 13.6 L 30.4 25.6 L 25.6 26.4 Z" />
        {/* Index finger resting along the pencil */}
        <path d="M17.4 14.6 L 9.4 23.6 C 8.5 24.6, 6.7 23.7, 7.3 22.4 L 14.2 12.9 C 15 12.2, 16.4 12.6, 17.4 14.6 Z" />
      </g>
    </svg>
  )
}

type Props = {
  /** The list the line is drawn through. */
  listRef: RefObject<HTMLElement | null>
  /** Class name of the year labels inside the list. */
  yearSelector: string
  /** Class added to a year once the pen has passed it. */
  writtenClass: string
}

/**
 * A hand that writes a vertical line upward through the years of a list,
 * lighting up each year as it passes, then fades and starts again.
 */
export default function WritingPen({ listRef, yearSelector, writtenClass }: Props) {
  const lineRef = useRef<HTMLSpanElement>(null)
  const penRef = useRef<HTMLSpanElement>(null)
  const layerRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const list = listRef.current
    const line = lineRef.current
    const pen = penRef.current
    const layer = layerRef.current
    if (!list || !line || !pen || !layer) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let years: { el: HTMLElement; y: number }[] = []
    let x = 0
    let top = 0
    let bottom = 0

    const measure = () => {
      const box = list.getBoundingClientRect()
      const els = [...list.querySelectorAll<HTMLElement>(yearSelector)]
      if (!els.length) return
      const first = els[0].getBoundingClientRect()
      x = first.left + first.width / 2 - box.left
      years = els.map((el) => {
        const r = el.getBoundingClientRect()
        return { el, y: r.top + r.height / 2 - box.top }
      })
      top = Math.max(0, years[0].y - 18)
      bottom = box.height
      layer.style.left = `${x}px`
    }

    const place = (head: number) => {
      line.style.top = `${head}px`
      line.style.height = `${Math.max(0, bottom - head)}px`
      pen.style.transform = `translate(${-TIP_X * (ICON_SIZE / 32)}px, ${head - TIP_Y * (ICON_SIZE / 32)}px)`
      for (const year of years) year.el.classList.toggle(writtenClass, year.y >= head)
    }

    measure()

    if (reduceMotion) {
      place(top)
      layer.style.opacity = '1'
      const ro = new ResizeObserver(() => {
        measure()
        place(top)
      })
      ro.observe(list)
      return () => ro.disconnect()
    }

    let frame = 0
    let start = 0
    let visible = false

    const tick = (now: number) => {
      if (!start) start = now
      const distance = bottom - top
      const drawMs = (distance / SPEED) * 1000
      const elapsed = now - start
      const cycle = drawMs + HOLD_MS + FADE_MS

      if (elapsed >= cycle) {
        start = now
        layer.style.opacity = '0'
        place(bottom)
      } else if (elapsed <= drawMs) {
        const t = elapsed / drawMs
        layer.style.opacity = String(Math.min(1, elapsed / 300))
        place(bottom - distance * t)
      } else if (elapsed <= drawMs + HOLD_MS) {
        layer.style.opacity = '1'
        place(top)
      } else {
        const fade = (elapsed - drawMs - HOLD_MS) / FADE_MS
        layer.style.opacity = String(1 - fade)
        if (fade > 0.6) for (const year of years) year.el.classList.remove(writtenClass)
      }
      if (visible) frame = requestAnimationFrame(tick)
    }

    const ro = new ResizeObserver(measure)
    ro.observe(list)

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      cancelAnimationFrame(frame)
      if (visible) {
        start = 0
        frame = requestAnimationFrame(tick)
      }
    })
    io.observe(list)

    return () => {
      cancelAnimationFrame(frame)
      io.disconnect()
      ro.disconnect()
      for (const year of years) year.el.classList.remove(writtenClass)
    }
  }, [listRef, yearSelector, writtenClass])

  return (
    <span ref={layerRef} className={styles.layer} aria-hidden="true">
      <span ref={lineRef} className={styles.line} />
      <span ref={penRef} className={styles.pen}>
        <span className={styles.wobble}>
          <HandIcon />
        </span>
      </span>
    </span>
  )
}

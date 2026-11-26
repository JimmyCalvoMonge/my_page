import type { ComponentType } from 'react'
import * as S from './sketches.tsx'
import styles from './Doodles.module.css'

type Placement = {
  Sketch: ComponentType
  /** Position as a percentage of the page's height and width. */
  top: number
  left: number
  rotate: number
  /** Also shown on small screens. */
  mobile?: boolean
}

// Spread down the page, alternating sides, mostly away from the hero animation.
const placements: Placement[] = [
  { Sketch: S.Euler, top: 2.5, left: 31, rotate: -6, mobile: true },
  { Sketch: S.CommSquare, top: 12, left: 1, rotate: 4 },
  { Sketch: S.Gaussian, top: 16.5, left: 33, rotate: 3, mobile: true },
  { Sketch: S.Pipeline, top: 19.4, left: 50, rotate: -2, mobile: true },
  { Sketch: S.SqlAggregate, top: 26.5, left: 2, rotate: -3, mobile: true },
  { Sketch: S.BigO, top: 31, left: 40, rotate: 4 },
  { Sketch: S.Bayes, top: 34, left: 72, rotate: 5, mobile: true },
  { Sketch: S.BellCurve, top: 38.5, left: 36, rotate: -4 },
  { Sketch: S.PythonPrimes, top: 44, left: 2, rotate: 2, mobile: true },
  { Sketch: S.StarSchema, top: 48.5, left: 77, rotate: -3, mobile: true },
  { Sketch: S.Basel, top: 54.5, left: 30, rotate: 6 },
  { Sketch: S.Epsilon, top: 57.5, left: 2, rotate: 3 },
  { Sketch: S.SqlWindow, top: 60.5, left: 57, rotate: -2, mobile: true },
  { Sketch: S.PythonPandas, top: 62.5, left: 24, rotate: 2, mobile: true },
  { Sketch: S.Eigen, top: 65.5, left: 3, rotate: -5 },
  { Sketch: S.Dag, top: 71, left: 63, rotate: 3, mobile: true },
  { Sketch: S.Fourier, top: 86.1, left: 44, rotate: -2 },
  { Sketch: S.Pythagoras, top: 86.5, left: 5, rotate: -4, mobile: true },
  { Sketch: S.PythonLorenz, top: 96.2, left: 4, rotate: -2, mobile: true },
]

/** Light sketches drawn on the graph paper behind the whole page. */
export default function Doodles() {
  return (
    <div className={styles.layer} aria-hidden="true">
      {placements.map(({ Sketch, top, left, rotate, mobile }, i) => (
        <div
          key={i}
          className={`${styles.item} ${mobile ? '' : styles.desktopOnly}`}
          style={{ top: `${top}%`, left: `${left}%`, rotate: `${rotate}deg` }}
        >
          <Sketch />
        </div>
      ))}
    </div>
  )
}

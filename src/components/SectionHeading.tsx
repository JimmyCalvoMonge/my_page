import type { ReactNode } from 'react'
import { useReveal } from '../hooks/useReveal.ts'
import styles from './SectionHeading.module.css'

type Props = {
  index: number
  label: string
  title: ReactNode
  intro?: ReactNode
}

export default function SectionHeading({ index, label, title, intro }: Props) {
  const ref = useReveal<HTMLDivElement>()
  return (
    <div ref={ref} className={`${styles.heading} reveal`}>
      <p className={styles.label}>
        <span className={styles.index}>§{index}</span>
        {label}
      </p>
      <h2 className={styles.title}>{title}</h2>
      {intro && <p className={styles.intro}>{intro}</p>}
    </div>
  )
}

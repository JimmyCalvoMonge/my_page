import type { ReactNode } from 'react'
import { useReveal } from '../hooks/useReveal.ts'
import styles from './SectionHeading.module.css'

type Props = {
  label: string
  title: ReactNode
  intro?: ReactNode
}

export default function SectionHeading({ label, title, intro }: Props) {
  const ref = useReveal<HTMLDivElement>()
  return (
    <div ref={ref} className={`${styles.heading} reveal`}>
      <p className={styles.label}>{label}</p>
      <h2 className={styles.title}>{title}</h2>
      {intro && <p className={styles.intro}>{intro}</p>}
    </div>
  )
}

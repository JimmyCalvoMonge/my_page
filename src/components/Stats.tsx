import { stats } from '../data/profile.ts'
import { useReveal } from '../hooks/useReveal.ts'
import styles from './Stats.module.css'

export default function Stats() {
  const ref = useReveal<HTMLDListElement>()
  return (
    <div className="container">
      <dl ref={ref} className={`${styles.stats} reveal`}>
        {stats.map((stat) => (
          <div key={stat.label} className={styles.stat}>
            <dt>{stat.label}</dt>
            <dd>{stat.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}

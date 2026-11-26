import notes from '../data/notes.ts'
import { useReveal } from '../hooks/useReveal.ts'
import { ArrowUpRightIcon } from './Icons.tsx'
import SectionHeading from './SectionHeading.tsx'
import styles from './Teaching.module.css'

export default function Teaching() {
  const ref = useReveal<HTMLUListElement>()

  return (
    <section className="section" id="teaching">
      <div className="container">
        <SectionHeading
          index={3}
          label="Teaching"
          title="Course notes"
          intro="Material I wrote for courses at the School of Mathematics of the University of Costa Rica. All notes are in Spanish."
        />

        <ul ref={ref} className={`${styles.grid} reveal`}>
          {notes.map((note) => (
            <li key={note.course}>
              <a href={note.link} target="_blank" rel="noreferrer" className={styles.card}>
                <span className={styles.cover}>
                  <img src={note.cover} alt="" loading="lazy" />
                </span>
                <span className={styles.body}>
                  <span className={styles.course}>{note.course}</span>
                  <span className={styles.title}>{note.title}</span>
                  <span className={styles.summary}>{note.summary}</span>
                  <span className={styles.link}>
                    Open PDF
                    <ArrowUpRightIcon width={16} height={16} />
                  </span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

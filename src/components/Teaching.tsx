import notes from '../data/notes.ts'
import { useReveal } from '../hooks/useReveal.ts'
import { useL } from '../i18n/locale.tsx'
import { messages } from '../i18n/messages.ts'
import { ArrowUpRightIcon } from './Icons.tsx'
import SectionHeading from './SectionHeading.tsx'
import styles from './Teaching.module.css'

export default function Teaching() {
  const ref = useReveal<HTMLUListElement>()
  const l = useL()
  const m = messages.teaching

  return (
    <section className="section" id="teaching">
      <div className="container">
        <SectionHeading
          index={3}
          label={l(m.label)}
          title={l(m.title)}
          intro={l(m.intro)}
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
                  <span className={styles.title}>{l(note.title)}</span>
                  <span className={styles.summary}>{l(note.summary)}</span>
                  <span className={styles.link}>
                    {l(m.openPdf)}
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

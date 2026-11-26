import { education, experience } from '../data/profile.ts'
import { useReveal } from '../hooks/useReveal.ts'
import { useL } from '../i18n/locale.tsx'
import { messages } from '../i18n/messages.ts'
import SectionHeading from './SectionHeading.tsx'
import styles from './About.module.css'

export default function About() {
  const bodyRef = useReveal<HTMLDivElement>()
  const listsRef = useReveal<HTMLDivElement>()
  const l = useL()
  const m = messages.about

  return (
    <section className="section" id="about">
      <div className="container">
        <SectionHeading index={1} label={l(m.label)} title={l(m.title)} />

        <div className={styles.grid}>
          <div ref={bodyRef} className={`${styles.body} reveal`}>
            {m.paragraphs.map((p) => (
              <p key={p.en}>{l(p)}</p>
            ))}
          </div>

          <div ref={listsRef} className={`${styles.lists} reveal`}>
            <div>
              <h3 className={styles.listTitle}>{l(m.experience)}</h3>
              <ol className={styles.timeline}>
                {experience.map((item) => (
                  <li key={item.place.en + item.role.en}>
                    <p className={styles.itemTitle}>
                      {l(item.role)}
                      {item.current && <span className={styles.badge}>{l(m.now)}</span>}
                    </p>
                    <p className={styles.itemPlace}>{l(item.place)}</p>
                    <p className={styles.itemDetail}>{l(item.detail)}</p>
                  </li>
                ))}
              </ol>
            </div>

            <div>
              <h3 className={styles.listTitle}>{l(m.education)}</h3>
              <ol className={styles.timeline}>
                {education.map((item) => (
                  <li key={item.degree.en}>
                    <p className={styles.itemTitle}>{l(item.degree)}</p>
                    <p className={styles.itemPlace}>
                      {item.href ? (
                        <a href={item.href} target="_blank" rel="noreferrer">
                          {l(item.place)}
                        </a>
                      ) : (
                        l(item.place)
                      )}
                    </p>
                    {item.detail && <p className={styles.itemDetail}>{l(item.detail)}</p>}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

import { education, experience } from '../data/profile.ts'
import { useReveal } from '../hooks/useReveal.ts'
import SectionHeading from './SectionHeading.tsx'
import styles from './About.module.css'

export default function About() {
  const bodyRef = useReveal<HTMLDivElement>()
  const listsRef = useReveal<HTMLDivElement>()

  return (
    <section className="section" id="about">
      <div className="container">
        <SectionHeading index={1} label="About" title="From pure mathematics to data engineering" />

        <div className={styles.grid}>
          <div ref={bodyRef} className={`${styles.body} reveal`}>
            <p>
              I studied pure mathematics at the University of Costa Rica, finishing with a
              master’s degree in algebraic geometry, and stayed on as a full-time professor
              for three years.
            </p>
            <p>
              Along the way I wrote class notes, papers and books, and I built this site to
              share that material with students, teachers and anyone curious about
              mathematics.
            </p>
            <p>
              Since then I’ve moved into industry: first as a statistician and data scientist
              at Intel, and now as a data engineer at Hakkoda. I also hold master’s degrees in
              applied mathematical methods and in full stack web development.
            </p>
          </div>

          <div ref={listsRef} className={`${styles.lists} reveal`}>
            <div>
              <h3 className={styles.listTitle}>Experience</h3>
              <ol className={styles.timeline}>
                {experience.map((item) => (
                  <li key={item.place}>
                    <p className={styles.itemTitle}>
                      {item.role}
                      {item.current && <span className={styles.badge}>Now</span>}
                    </p>
                    <p className={styles.itemPlace}>{item.place}</p>
                    <p className={styles.itemDetail}>{item.detail}</p>
                  </li>
                ))}
              </ol>
            </div>

            <div>
              <h3 className={styles.listTitle}>Education</h3>
              <ol className={styles.timeline}>
                {education.map((item) => (
                  <li key={item.degree}>
                    <p className={styles.itemTitle}>{item.degree}</p>
                    <p className={styles.itemPlace}>
                      {item.href ? (
                        <a href={item.href} target="_blank" rel="noreferrer">
                          {item.place}
                        </a>
                      ) : (
                        item.place
                      )}
                    </p>
                    {item.detail && <p className={styles.itemDetail}>{item.detail}</p>}
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

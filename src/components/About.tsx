import type { CSSProperties } from 'react'
import { certifications, education, experience } from '../data/profile.ts'
import { useReveal } from '../hooks/useReveal.ts'
import { useL } from '../i18n/locale.tsx'
import { messages } from '../i18n/messages.ts'
import { BrandLogo } from './BrandLogo.tsx'
import { ArrowUpRightIcon } from './Icons.tsx'
import SectionHeading from './SectionHeading.tsx'
import styles from './About.module.css'

/** Newest entries sit on the highest, right-most step. */
const step = (index: number, count: number) =>
  ({ '--step': count - 1 - index }) as CSSProperties

export default function About() {
  const bodyRef = useReveal<HTMLDivElement>()
  const listsRef = useReveal<HTMLDivElement>()
  const certsRef = useReveal<HTMLDivElement>()
  const l = useL()
  const m = messages.about

  return (
    <section className="section" id="about">
      <div className="container">
        <SectionHeading label={l(m.label)} title={l(m.title)} />

        <div className={styles.grid}>
          <div ref={bodyRef} className={`${styles.body} reveal`}>
            {m.paragraphs.map((p) => (
              <p key={p.en}>{l(p)}</p>
            ))}
          </div>

          <div ref={listsRef} className={`${styles.lists} reveal`}>
            <div>
              <h3 className={styles.listTitle}>{l(m.experience)}</h3>
              <ol className={styles.stairs}>
                {experience.map((item, i) => (
                  <li key={item.place.en + item.role.en} style={step(i, experience.length)}>
                    <p className={styles.itemTitle}>
                      {l(item.role)}
                      {item.current && <span className={styles.badge}>{l(m.now)}</span>}
                    </p>
                    <p className={styles.itemPlace}>{l(item.place)}</p>
                    <p className={styles.itemPeriod}>{l(item.period)}</p>
                    <p className={styles.itemDetail}>{l(item.detail)}</p>
                  </li>
                ))}
              </ol>
            </div>

            <div>
              <h3 className={styles.listTitle}>{l(m.education)}</h3>
              <ol className={styles.stairs}>
                {education.map((item, i) => (
                  <li key={item.degree.en} style={step(i, education.length)}>
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
                    <p className={styles.itemPeriod}>{item.period}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>

        <div ref={certsRef} className={`${styles.certs} reveal`}>
          <h3 className={styles.listTitle}>{l(m.certifications)}</h3>
          <ul className={styles.certList}>
            {certifications.map((cert) => (
              <li key={cert.name}>
                <a href={cert.href} target="_blank" rel="noreferrer" className={styles.cert}>
                  <span className={styles.certLogo}>
                    {cert.brand ? (
                      <BrandLogo brand={cert.brand} />
                    ) : (
                      <span className={styles.certInitial} aria-hidden="true">
                        {cert.issuer[0]}
                      </span>
                    )}
                  </span>
                  <span className={styles.certText}>
                    <span className={styles.certName}>{cert.name}</span>
                    <span className={styles.certIssuer}>{cert.issuer}</span>
                  </span>
                  <ArrowUpRightIcon width={14} height={14} className={styles.certArrow} />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

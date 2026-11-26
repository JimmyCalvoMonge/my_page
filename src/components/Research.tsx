import papers from '../data/research.ts'
import { useReveal } from '../hooks/useReveal.ts'
import { useL } from '../i18n/locale.tsx'
import { messages } from '../i18n/messages.ts'
import { ArrowUpRightIcon } from './Icons.tsx'
import SectionHeading from './SectionHeading.tsx'
import WritingPen from './WritingPen.tsx'
import styles from './Research.module.css'

export default function Research() {
  const ref = useReveal<HTMLOListElement>()
  const l = useL()
  const m = messages.research

  return (
    <section className={`section ${styles.section}`} id="research">
      <div className="container">
        <SectionHeading
          label={l(m.label)}
          title={l(m.title)}
          intro={l(m.intro)}
        />

        <ol ref={ref} className={`${styles.list} reveal`}>
          <WritingPen
            listRef={ref}
            yearSelector={`.${styles.year}`}
            writtenClass={styles.yearWritten}
          />
          {papers.map((paper) => (
            <li key={paper.title}>
              <a href={paper.link} target="_blank" rel="noreferrer" className={styles.item}>
                <span className={styles.year}>{paper.year}</span>
                <span className={styles.main}>
                  <span className={styles.title}>{paper.title}</span>
                  {paper.coauthors && (
                    <span className={styles.coauthors}>
                      {l(m.with)} {paper.coauthors}
                    </span>
                  )}
                  <span className={styles.summary}>{l(paper.summary)}</span>
                </span>
                <span className={styles.meta}>
                  <span className={styles.topic}>{l(paper.topic)}</span>
                  <span className={styles.source}>
                    {l(paper.venue)}
                    <ArrowUpRightIcon width={16} height={16} />
                  </span>
                </span>
              </a>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

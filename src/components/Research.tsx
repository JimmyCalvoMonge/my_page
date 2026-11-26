import papers, { sourceOf } from '../data/research.ts'
import { useReveal } from '../hooks/useReveal.ts'
import { ArrowUpRightIcon } from './Icons.tsx'
import SectionHeading from './SectionHeading.tsx'
import styles from './Research.module.css'

export default function Research() {
  const ref = useReveal<HTMLOListElement>()

  return (
    <section className={`section ${styles.section}`} id="research">
      <div className="container">
        <SectionHeading
          index={2}
          label="Research & writing"
          title="Papers, theses and articles"
          intro="Pure and applied: from Galois groups and elliptic curves to epidemic models and machine learning."
        />

        <ol ref={ref} className={`${styles.list} reveal`}>
          {papers.map((paper) => (
            <li key={paper.title}>
              <a href={paper.link} target="_blank" rel="noreferrer" className={styles.item}>
                <span className={styles.year}>{paper.year}</span>
                <span className={styles.main}>
                  <span className={styles.title}>{paper.title}</span>
                  <span className={styles.summary}>{paper.summary}</span>
                </span>
                <span className={styles.meta}>
                  <span className={styles.topic}>{paper.topic}</span>
                  <span className={styles.source}>
                    {sourceOf(paper.link)}
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

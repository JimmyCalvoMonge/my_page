import photo from '../assets/jimmy.jpg'
import { profile } from '../data/profile.ts'
import { ArrowRightIcon, DownloadIcon, GitHubIcon, LinkedInIcon, MailIcon } from './Icons.tsx'
import MathShowcase from './math/MathShowcase.tsx'
import styles from './Hero.module.css'

export default function Hero() {
  return (
    <section className={styles.hero} id="top">
      <div className={`container ${styles.inner}`}>
        <div className={styles.copy}>
          <h1 className={styles.title}>
            Hi, I’m <span className={styles.name}>Jimmy</span>
            <span className={styles.stop}>.</span>
            <span className={styles.role}>Mathematician &amp; data engineer.</span>
          </h1>

          <p className={styles.lead}>
            I studied pure mathematics, taught it at the University of Costa Rica, and now
            build data platforms. This is where I share my research, course notes and
            writing on mathematics.
          </p>

          <div className={styles.actions}>
            <a href="#research" className="btn btn-primary">
              See my research
              <ArrowRightIcon />
            </a>
            <a href={profile.cv} target="_blank" rel="noreferrer" className="btn btn-ghost">
              <DownloadIcon />
              Download CV
            </a>
          </div>

          <ul className={styles.social} aria-label="Elsewhere">
            <li>
              <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub">
                <GitHubIcon />
              </a>
            </li>
            <li>
              <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
                <LinkedInIcon />
              </a>
            </li>
            <li>
              <a href={`mailto:${profile.email}`} aria-label="Email">
                <MailIcon />
              </a>
            </li>
          </ul>
        </div>

        <div className={styles.visual}>
          <MathShowcase>
            <div className={styles.portrait}>
              <img src={photo} alt="Portrait of Jimmy Calvo-Monge" width={863} height={900} />
            </div>
          </MathShowcase>
        </div>
      </div>
    </section>
  )
}

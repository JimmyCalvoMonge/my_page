import photo from '../assets/jimmy.jpg'
import { profile } from '../data/profile.ts'
import { useL } from '../i18n/locale.tsx'
import { messages } from '../i18n/messages.ts'
import { ArrowRightIcon, DownloadIcon, GitHubIcon, LinkedInIcon, MailIcon } from './Icons.tsx'
import MathShowcase from './math/MathShowcase.tsx'
import styles from './Hero.module.css'

export default function Hero() {
  const l = useL()
  const m = messages.hero

  return (
    <section className={styles.hero} id="top">
      <div className={`container ${styles.inner}`}>
        <div className={styles.copy}>
          <h1 className={styles.title}>
            {l(m.greetingBefore)}
            <span className={styles.name}>{profile.firstName}</span>
            <span className={styles.stop}>{l(m.greetingAfter)}</span>
            <span className={styles.role}>{l(m.role)}</span>
          </h1>

          <p className={styles.lead}>{l(m.lead)}</p>

          <div className={styles.actions}>
            <a href="#research" className="btn btn-primary">
              {l(m.seeResearch)}
              <ArrowRightIcon />
            </a>
            <a href={profile.cv} target="_blank" rel="noreferrer" className="btn btn-ghost">
              <DownloadIcon />
              {l(m.downloadCv)}
            </a>
          </div>

          <ul className={styles.social} aria-label={l(m.elsewhere)}>
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
              <a href={`mailto:${profile.email}`} aria-label={l(m.email)}>
                <MailIcon />
              </a>
            </li>
          </ul>
        </div>

        <div className={styles.visual}>
          <MathShowcase>
            <div className={styles.portrait}>
              <img src={photo} alt={l(m.portraitAlt)} width={863} height={900} />
            </div>
          </MathShowcase>
        </div>
      </div>
    </section>
  )
}

import { profile } from '../data/profile.ts'
import { useReveal } from '../hooks/useReveal.ts'
import { useL } from '../i18n/locale.tsx'
import { messages } from '../i18n/messages.ts'
import { GitHubIcon, LinkedInIcon, MailIcon } from './Icons.tsx'
import styles from './Contact.module.css'

export default function Contact() {
  const ref = useReveal<HTMLDivElement>()
  const l = useL()
  const m = messages.contact

  return (
    <section className="section" id="contact">
      <div className="container">
        <div ref={ref} className={`${styles.card} reveal`}>
          <p className={styles.label}>
            <span>§4</span> {l(m.label)}
          </p>
          <h2 className={styles.title}>{l(m.title)}</h2>
          <p className={styles.text}>{l(m.text)}</p>
          <div className={styles.actions}>
            <a href={`mailto:${profile.email}`} className="btn btn-primary">
              <MailIcon />
              {profile.email}
            </a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" className="btn btn-ghost">
              <LinkedInIcon />
              LinkedIn
            </a>
            <a href={profile.github} target="_blank" rel="noreferrer" className="btn btn-ghost">
              <GitHubIcon />
              GitHub
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

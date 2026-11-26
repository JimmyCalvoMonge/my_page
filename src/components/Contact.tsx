import { profile } from '../data/profile.ts'
import { useReveal } from '../hooks/useReveal.ts'
import { useL } from '../i18n/locale.tsx'
import { messages } from '../i18n/messages.ts'
import ConnectNetwork from './ConnectNetwork.tsx'
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
          <ConnectNetwork />
          <div className={styles.veil} aria-hidden="true" />

          <div className={styles.content}>
            <p className={styles.label}>{l(m.label)}</p>
            <h2 className={styles.title}>{l(m.title)}</h2>
            <p className={styles.text}>{l(m.text)}</p>

            <p className={styles.helpLabel}>{l(m.helpWith)}</p>
            <ul className={styles.services}>
              {m.services.map((service) => (
                <li key={service.en}>{l(service)}</li>
              ))}
            </ul>

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
      </div>
    </section>
  )
}

import { profile } from '../data/profile.ts'
import { useReveal } from '../hooks/useReveal.ts'
import { GitHubIcon, LinkedInIcon, MailIcon } from './Icons.tsx'
import styles from './Contact.module.css'

export default function Contact() {
  const ref = useReveal<HTMLDivElement>()

  return (
    <section className="section" id="contact">
      <div className="container">
        <div ref={ref} className={`${styles.card} reveal`}>
          <p className={styles.label}>
            <span>§4</span> Contact
          </p>
          <h2 className={styles.title}>Let’s connect.</h2>
          <p className={styles.text}>
            Questions about the notes, a research idea, or a data problem? I’d like to hear
            from you.
          </p>
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

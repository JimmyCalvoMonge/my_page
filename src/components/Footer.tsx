import { profile } from '../data/profile.ts'
import styles from './Contact.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.footerInner}`}>
        <p>
          © {new Date().getFullYear()} {profile.name}
        </p>
        <p className={styles.qed} title="Quod erat demonstrandum">
          ∎
        </p>
      </div>
    </footer>
  )
}

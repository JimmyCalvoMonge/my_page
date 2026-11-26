import { useEffect, useState } from 'react'
import { profile } from '../data/profile.ts'
import { locales, useL, useLocale, type Locale } from '../i18n/locale.tsx'
import { messages } from '../i18n/messages.ts'
import { CloseIcon, DownloadIcon, MenuIcon } from './Icons.tsx'
import styles from './Navbar.module.css'

const m = messages.nav

const links = [
  { href: '#about', label: m.about },
  { href: '#research', label: m.research },
  { href: '#teaching', label: m.teaching },
  { href: '#contact', label: m.contact },
]

const languageNames: Record<Locale, string> = { en: 'English', es: 'Español' }

function LanguageToggle() {
  const { locale, setLocale } = useLocale()
  const l = useL()
  return (
    <div className={styles.lang} role="group" aria-label={l(m.language)}>
      {locales.map((code) => (
        <button
          key={code}
          type="button"
          lang={code}
          aria-pressed={locale === code}
          aria-label={languageNames[code]}
          title={languageNames[code]}
          onClick={() => setLocale(code)}
        >
          {code.toUpperCase()}
        </button>
      ))}
    </div>
  )
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const l = useL()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header className={`${styles.header} ${scrolled || open ? styles.solid : ''}`}>
      <nav className={`container ${styles.nav}`} aria-label={l(m.main)}>
        <a href="#top" className={styles.brand} onClick={() => setOpen(false)}>
          <span className={styles.mark} aria-hidden="true">
            ∂
          </span>
          Jimmy Calvo
        </a>

        <ul className={`${styles.links} ${open ? styles.open : ''}`} id="nav-links">
          {links.map((link) => (
            <li key={link.href}>
              <a href={link.href} onClick={() => setOpen(false)}>
                {l(link.label)}
              </a>
            </li>
          ))}
          <li className={styles.cvItem}>
            <a href={profile.cv} target="_blank" rel="noreferrer" className={styles.cv}>
              <DownloadIcon width={16} height={16} />
              CV
            </a>
          </li>
        </ul>

        <div className={styles.actions}>
          <LanguageToggle />
          <button
            type="button"
            className={styles.toggle}
            aria-expanded={open}
            aria-controls="nav-links"
            aria-label={l(open ? m.closeMenu : m.openMenu)}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </nav>
    </header>
  )
}

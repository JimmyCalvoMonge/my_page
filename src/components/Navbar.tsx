import { useEffect, useState } from 'react'
import { profile } from '../data/profile.ts'
import { CloseIcon, DownloadIcon, MenuIcon } from './Icons.tsx'
import styles from './Navbar.module.css'

const links = [
  { href: '#about', label: 'About' },
  { href: '#research', label: 'Research' },
  { href: '#teaching', label: 'Teaching' },
  { href: '#contact', label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

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
      <nav className={`container ${styles.nav}`} aria-label="Main">
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
                {link.label}
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

        <button
          type="button"
          className={styles.toggle}
          aria-expanded={open}
          aria-controls="nav-links"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <CloseIcon /> : <MenuIcon />}
        </button>
      </nav>
    </header>
  )
}

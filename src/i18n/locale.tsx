import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react'

export const locales = ['en', 'es'] as const
export type Locale = (typeof locales)[number]

/** A piece of text in every supported language. */
export type L10n = Record<Locale, string>

const DEFAULT_LOCALE: Locale = 'en'
const STORAGE_KEY = 'locale'

function initialLocale(): Locale {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved && (locales as readonly string[]).includes(saved)) return saved as Locale
  } catch {
    // Storage can be unavailable (private mode); fall back to the default
  }
  return DEFAULT_LOCALE
}

type LocaleContextValue = {
  locale: Locale
  setLocale: (locale: Locale) => void
}

const LocaleContext = createContext<LocaleContextValue | null>(null)

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale)

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next)
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {
      // Ignore: the choice still applies for this visit
    }
  }, [])

  useEffect(() => {
    document.documentElement.lang = locale
  }, [locale])

  return <LocaleContext.Provider value={{ locale, setLocale }}>{children}</LocaleContext.Provider>
}

export function useLocale(): LocaleContextValue {
  const value = useContext(LocaleContext)
  if (!value) throw new Error('useLocale must be used inside <LocaleProvider>')
  return value
}

/** Returns a function that picks the current language from an `L10n`. */
export function useL(): (text: L10n) => string {
  const { locale } = useLocale()
  return useCallback((text: L10n) => text[locale], [locale])
}

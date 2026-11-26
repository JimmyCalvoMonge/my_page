import { Fragment, useEffect, useMemo, useState } from 'react'

type Katex = typeof import('katex').default

// KaTeX is large, so it loads in its own chunk after the page renders.
let katexPromise: Promise<Katex> | null = null
let katexLoaded: Katex | null = null

function loadKatex(): Promise<Katex> {
  katexPromise ??= Promise.all([import('katex'), import('katex/dist/katex.min.css')]).then(
    ([mod]) => (katexLoaded = mod.default),
  )
  return katexPromise
}

function useKatex(): Katex | null {
  const [katex, setKatex] = useState<Katex | null>(katexLoaded)
  useEffect(() => {
    if (!katex) loadKatex().then(setKatex)
  }, [katex])
  return katex
}

/** A single LaTeX expression, rendered inline. */
export function Tex({ children }: { children: string }) {
  const katex = useKatex()
  const html = useMemo(
    () =>
      katex?.renderToString(children, { throwOnError: false, strict: 'ignore', output: 'html' }),
    [katex, children],
  )
  // Keep the line's height while KaTeX loads
  if (!html) return <span style={{ visibility: 'hidden' }}>&nbsp;</span>
  return <span dangerouslySetInnerHTML={{ __html: html }} />
}

/**
 * Prose with inline math between `$...$`. Only our own static strings go
 * through here, so rendering KaTeX's HTML output is safe.
 */
export function MathText({ children }: { children: string }) {
  const parts = useMemo(() => children.split(/(\$[^$]+\$)/g), [children])
  return (
    <>
      {parts.map((part, i) =>
        part.startsWith('$') && part.endsWith('$') && part.length > 1 ? (
          <Tex key={i}>{part.slice(1, -1)}</Tex>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        ),
      )}
    </>
  )
}

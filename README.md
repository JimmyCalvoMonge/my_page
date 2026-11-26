# Jimmy Calvo-Monge — personal site

A bilingual, math-themed portfolio for a mathematician and data engineer. It brings together research, course notes, experience and certifications, and invites visitors with a data or math problem to get in touch.

**Live site:** https://jimmycalvomonge.vercel.app

## Highlights

- **Math animations behind the portrait:** eight animations rotate in the hero: Lissajous curve, Sacks and Ulam prime spirals, Fourier epicycles, Lorenz attractor, Mandelbrot set, Barnsley fern and Koch snowflake. Each one comes with a LaTeX explanation of the mathematics behind it.
- **English and Spanish:** the EN/ES switch in the navbar changes every piece of text on the page. English is the default.
- **Animated details:**
  - Experience and Education drawn as a data pipeline.
  - A hand that writes a line through the years of the publications.
  - A network of nodes behind the contact card.
- **Notebook feel:** a graph-paper background with faint hand-drawn equations, diagrams and code.
- **Restrained by default:** animations pause when off screen, and stay still for visitors who've turned on reduced motion.

## Tech stack

- [React 19](https://react.dev) with TypeScript
- [Vite 6](https://vite.dev) for the dev server and build
- [react-router-dom 7](https://reactrouter.com) for routing
- [KaTeX](https://katex.org) for typesetting formulas, loaded on demand
- CSS Modules with design tokens in `src/index.css`
- Self-hosted fonts from [Fontsource](https://fontsource.org): Newsreader, Manrope, DM Mono and Caveat
- Deployed on [Vercel](https://vercel.com)

## Getting started

You need [Node.js](https://nodejs.org) 20 or newer.

```bash
npm install
```

```bash
npm run dev
```

The dev server runs at http://localhost:5173.

| Command | What it does |
|---|---|
| `npm run dev` | Starts the dev server with hot reload |
| `npm run build` | Type-checks the project and builds it into `dist/` |
| `npm run preview` | Serves the production build locally |

## Project structure

```
public/                  Static files served as-is (CV PDF, favicon)
src/
  main.tsx               App entry: language provider and router
  App.tsx                Routes
  index.css              Design tokens, fonts and global styles
  pages/
    Home.tsx             The single-page layout
  components/
    Navbar, Hero, About, Research, Teaching, Contact, Footer
    math/                Hero animations, their scenes and the KaTeX wrapper
    doodles/             The background sketches and where they sit
    ConnectNetwork.tsx   The network animation behind the contact card
    WritingPen.tsx       The hand that writes through the research years
    BrandLogo.tsx        Company logos for the certifications
  data/                  Content: profile, publications, course notes
  i18n/                  Language switching and interface text
  hooks/                 Small shared hooks (scroll reveal)
  assets/                Portrait and course-note covers
legacy/                  The previous version of the site, kept for reference
```

## Editing content

Most updates only touch the data files; no component changes are needed.

| To change… | Edit |
|---|---|
| Experience, education, certifications, links | `src/data/profile.ts` |
| Papers and articles | `src/data/research.ts` |
| Course notes | `src/data/notes.ts` (covers in `src/assets/notes/`) |
| Headings, bio, buttons and other interface text | `src/i18n/messages.ts` |
| Animation names, formulas and explanations | `src/components/math/scenes.ts` |
| The downloadable CV | Replace `public/CV_Jimmy_Calvo_Monge.pdf`, keeping the file name |

### Translations

Every piece of text is an `{ en, es }` pair:

```ts
title: { en: 'Course notes', es: 'Notas de curso' },
```

Both languages are required, so a missing translation fails the type check. Text that is the same in both languages, such as company names or formulas, uses a `same(...)` or `both(...)` helper.

Paper titles stay in their published language, and official certification names stay in English.

### Math in explanations

Inline LaTeX goes between `$…$` in an explanation and is typeset automatically:

```ts
en: String.raw`Each integer $n$ sits at radius $\sqrt{n}$ and angle $2\pi\sqrt{n}$.`,
```

Use `String.raw` so backslashes reach KaTeX unchanged.

## Adding a hero animation

Each animation is a `Scene` in `src/components/math/scenes.ts`:

```ts
const myScene: Scene = {
  id: 'my-scene',
  name: { en: 'My curve', es: 'Mi curva' },
  formula: both(String.raw`r = \cos(3\theta)`),
  explanation: { en: String.raw`…`, es: String.raw`…` },
  settle: 3000, // ms until fully drawn; used as the still frame for reduced motion
  create(size) {
    // Precompute anything that depends on the canvas size here
    return ({ ctx, t, palette }) => {
      // Draw one frame at time t (ms since the scene started)
    }
  },
}
```

Add it to the `scenes` array at the bottom of the file. The array's order is the rotation order.

Draw inside a circle of radius `radius(size)` around the centre, since the canvas is masked to a soft circle. Use the `palette` colours (`blue`, `yellow`, `gray`) to match the site.

## Design

- **Colours:** near-black background and neutral grays, blue as the main accent and yellow as the highlight. All are tokens at the top of `src/index.css`, and changing `--accent-rgb` or `--highlight-rgb` updates the whole site.
- **Typography:** `--font-display` (Newsreader) for headings, `--font-body` (Manrope) for text and `--font-mono` (DM Mono) for labels and code. The doodles use Caveat.
- **Background doodles:** the sketches are in `src/components/doodles/sketches.tsx`. Their positions, as percentages of the page, and the shorter list shown on phones are in `Doodles.tsx`.

## Deployment

The site deploys to Vercel. `vercel.json` sets:

- the Vite build (`npm run build`) and the `dist/` output folder;
- a fallback that serves `index.html` for every path, so client-side routes load on refresh.

Each push to `main` deploys to production, and each pull request gets a preview deployment.

## Legacy site

`legacy/` holds the previous Create React App version of the site, unchanged. It isn't part of the build.

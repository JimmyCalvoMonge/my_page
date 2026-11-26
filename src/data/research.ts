import type { L10n } from '../i18n/locale.tsx'

export type Paper = {
  /** Published title, kept in its original language. */
  title: string
  summary: L10n
  link: string
  year: number
  topic: L10n
}

const topics = {
  algebra: { en: 'Algebra', es: 'Álgebra' },
  numberTheory: { en: 'Number theory', es: 'Teoría de números' },
  biology: { en: 'Mathematical biology', es: 'Biología matemática' },
  dynamics: { en: 'Dynamical systems', es: 'Sistemas dinámicos' },
  geometry: { en: 'Algebraic geometry', es: 'Geometría algebraica' },
  history: { en: 'History of mathematics', es: 'Historia de la matemática' },
  ml: { en: 'Machine learning', es: 'Aprendizaje automático' },
} satisfies Record<string, L10n>

const papers: Paper[] = [
  {
    title: 'On the embedding of Galois groups into wreath products',
    summary: {
      en: 'An explicit application of the wreath product construction to the Galois groups of field extensions.',
      es: 'Una aplicación explícita de la construcción del producto corona a los grupos de Galois de extensiones de cuerpos.',
    },
    link: 'https://www.tandfonline.com/doi/full/10.1080/00927872.2024.2389956',
    year: 2024,
    topic: topics.algebra,
  },
  {
    title: 'The density and distribution of CM elliptic curves over ℚ',
    summary: {
      en: 'Proves that CM elliptic curves over ℚ have natural density zero when ordered by naive height, and that asymptotically all of them have CM by ℤ[(−1 + √−3)/2], with j-invariant 0.',
      es: 'Demuestra que las curvas elípticas con CM sobre ℚ tienen densidad natural cero cuando se ordenan por altura ingenua, y que asintóticamente todas tienen CM por ℤ[(−1 + √−3)/2], con invariante j igual a 0.',
    },
    link: 'https://www.sciencedirect.com/science/article/abs/pii/S0022247X24011144',
    year: 2024,
    topic: topics.numberTheory,
  },
  {
    title: 'Interplay between foraging choices and population growth dynamics',
    summary: {
      en: 'Couples a population dynamics model with optimal foraging to study how individual cost–benefit decisions and population-scale dynamics depend on each other.',
      es: 'Acopla un modelo de dinámica poblacional con uno de forrajeo óptimo para estudiar cómo dependen entre sí las decisiones individuales de costo-beneficio y la dinámica a escala poblacional.',
    },
    link: 'https://arxiv.org/abs/2408.02552',
    year: 2024,
    topic: topics.biology,
  },
  {
    title:
      'Source–sink dynamics in a two-patch SI epidemic model with life stages and no recovery from infection',
    summary: {
      en: 'Analysis of a two-patch, two-life-stage SI model, focusing on disease spread and host population viability in natural populations.',
      es: 'Análisis de un modelo SI con dos parches y dos etapas de vida, centrado en la propagación de la enfermedad y la viabilidad de la población huésped en poblaciones naturales.',
    },
    link: 'https://pubmed.ncbi.nlm.nih.gov/38976154/',
    year: 2024,
    topic: topics.biology,
  },
  {
    title:
      'A nonlinear relapse model with disaggregated contact rates: analysis of a forward–backward bifurcation',
    summary: {
      en: 'A nonlinear differential equation model of relapse, with an incidence rate inspired by recent adaptive algorithms.',
      es: 'Un modelo de ecuaciones diferenciales no lineales para la recaída, con una tasa de incidencia inspirada en algoritmos adaptativos recientes.',
    },
    link: 'https://www.sciencedirect.com/science/article/pii/S2468042723000581',
    year: 2023,
    topic: topics.dynamics,
  },
  {
    title: 'Extensions of torsors and the prime-to-p fundamental group scheme',
    summary: {
      en: "Master's thesis in pure mathematics at the University of Costa Rica (in Spanish).",
      es: 'Tesis de maestría en matemática pura de la Universidad de Costa Rica (en español).',
    },
    link: 'https://aif.centre-mersenne.org/item/10.5802/aif.3475.pdf',
    year: 2022,
    topic: topics.geometry,
  },
  {
    title: "Emil Artin's thesis and the genesis of the Weil conjectures",
    summary: {
      en: "Artin's 1924 thesis as the origin of the Artin conjectures, with a review of the work of E. Artin and F. K. Schmidt on algebraic function fields.",
      es: 'La tesis de Artin de 1924 como origen de las conjeturas de Artin, con una revisión del trabajo de E. Artin y F. K. Schmidt sobre cuerpos de funciones algebraicas.',
    },
    link: 'https://drive.google.com/file/d/1BTw2cQy2FxmyxuSTwEZIkvoGA3m6TBjv/view?usp=sharing',
    year: 2021,
    topic: topics.history,
  },
  {
    title: 'Basic classification algorithms in machine learning: mathematical foundations',
    summary: {
      en: 'A compendium of the mathematical definitions behind the best-known supervised and unsupervised classification algorithms.',
      es: 'Un compendio de las definiciones matemáticas detrás de los algoritmos de clasificación supervisados y no supervisados más conocidos.',
    },
    link: 'https://drive.google.com/file/d/1wStyw8I6IlFJBJIV62rlTW4ARVoUvaws/view?usp=sharing',
    year: 2021,
    topic: topics.ml,
  },
]

export default papers

/** Where a paper is published, from its link's host. */
export function sourceOf(link: string): string {
  const host = new URL(link).hostname.replace(/^www\./, '')
  const names: Record<string, string> = {
    'tandfonline.com': 'Taylor & Francis',
    'sciencedirect.com': 'ScienceDirect',
    'arxiv.org': 'arXiv',
    'pubmed.ncbi.nlm.nih.gov': 'PubMed',
    'aif.centre-mersenne.org': 'Annales de l’Institut Fourier',
    'drive.google.com': 'PDF',
  }
  return names[host] ?? host
}

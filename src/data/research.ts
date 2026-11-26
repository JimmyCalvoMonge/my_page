export type Paper = {
  title: string
  summary: string
  link: string
  year: number
  topic: string
}

const papers: Paper[] = [
  {
    title: 'On the embedding of Galois groups into wreath products',
    summary:
      'An explicit application of the wreath product construction to the Galois groups of field extensions.',
    link: 'https://www.tandfonline.com/doi/full/10.1080/00927872.2024.2389956',
    year: 2024,
    topic: 'Algebra',
  },
  {
    title: 'The density and distribution of CM elliptic curves over ℚ',
    summary:
      'Proves that CM elliptic curves over ℚ have natural density zero when ordered by naive height, and that asymptotically all of them have CM by ℤ[(−1 + √−3)/2], with j-invariant 0.',
    link: 'https://www.sciencedirect.com/science/article/abs/pii/S0022247X24011144',
    year: 2024,
    topic: 'Number theory',
  },
  {
    title: 'Interplay between foraging choices and population growth dynamics',
    summary:
      'Couples a population dynamics model with optimal foraging to study how individual cost–benefit decisions and population-scale dynamics depend on each other.',
    link: 'https://arxiv.org/abs/2408.02552',
    year: 2024,
    topic: 'Mathematical biology',
  },
  {
    title:
      'Source–sink dynamics in a two-patch SI epidemic model with life stages and no recovery from infection',
    summary:
      'Analysis of a two-patch, two-life-stage SI model, focusing on disease spread and host population viability in natural populations.',
    link: 'https://pubmed.ncbi.nlm.nih.gov/38976154/',
    year: 2024,
    topic: 'Mathematical biology',
  },
  {
    title:
      'A nonlinear relapse model with disaggregated contact rates: analysis of a forward–backward bifurcation',
    summary:
      'A nonlinear differential equation model of relapse, with an incidence rate inspired by recent adaptive algorithms.',
    link: 'https://www.sciencedirect.com/science/article/pii/S2468042723000581',
    year: 2023,
    topic: 'Dynamical systems',
  },
  {
    title: 'Extensions of torsors and the prime-to-p fundamental group scheme',
    summary: "Master's thesis in pure mathematics at the University of Costa Rica (in Spanish).",
    link: 'https://aif.centre-mersenne.org/item/10.5802/aif.3475.pdf',
    year: 2022,
    topic: 'Algebraic geometry',
  },
  {
    title: "Emil Artin's thesis and the genesis of the Weil conjectures",
    summary:
      "Artin's 1924 thesis as the origin of the Artin conjectures, with a review of the work of E. Artin and F. K. Schmidt on algebraic function fields.",
    link: 'https://drive.google.com/file/d/1BTw2cQy2FxmyxuSTwEZIkvoGA3m6TBjv/view?usp=sharing',
    year: 2021,
    topic: 'History of mathematics',
  },
  {
    title: 'Basic classification algorithms in machine learning: mathematical foundations',
    summary:
      'A compendium of the mathematical definitions behind the best-known supervised and unsupervised classification algorithms.',
    link: 'https://drive.google.com/file/d/1wStyw8I6IlFJBJIV62rlTW4ARVoUvaws/view?usp=sharing',
    year: 2021,
    topic: 'Machine learning',
  },
]

export default papers

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

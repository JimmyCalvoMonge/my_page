import type { L10n } from '../i18n/locale.tsx'

export const profile = {
  name: 'Jimmy Calvo-Monge',
  firstName: 'Jimmy',
  email: 'jimjocamon94@gmail.com',
  github: 'https://github.com/JimmyCalvoMonge',
  linkedin: 'https://www.linkedin.com/in/jimmy-calvo-monge-367636208/',
  cv: '/CV_Jimmy_Calvo_Monge.pdf',
}

const UCR: L10n = { en: 'University of Costa Rica', es: 'Universidad de Costa Rica' }
const same = (text: string): L10n => ({ en: text, es: text })

export type Experience = { role: L10n; place: L10n; detail: L10n; current?: boolean }

export const experience: Experience[] = [
  {
    role: { en: 'Data Engineer', es: 'Ingeniero de datos' },
    place: same('Hakkoda'),
    detail: {
      en: 'Building data platforms and pipelines.',
      es: 'Construyo plataformas y pipelines de datos.',
    },
    current: true,
  },
  {
    role: { en: 'Statistician & Data Scientist', es: 'Estadístico y científico de datos' },
    place: same('Intel'),
    detail: {
      en: 'Statistical modelling and data science for manufacturing.',
      es: 'Modelado estadístico y ciencia de datos para manufactura.',
    },
  },
  {
    role: { en: 'Professor of Mathematics', es: 'Profesor de Matemática' },
    place: UCR,
    detail: {
      en: 'Three years as full-time faculty at the School of Mathematics.',
      es: 'Tres años como docente de tiempo completo en la Escuela de Matemática.',
    },
  },
]

export type Education = { degree: L10n; place: L10n; detail?: L10n; href?: string }

export const education: Education[] = [
  {
    degree: { en: "Master's in Pure Mathematics", es: 'Maestría en Matemática Pura' },
    place: UCR,
    detail: { en: 'Specialised in algebraic geometry.', es: 'Con énfasis en geometría algebraica.' },
  },
  {
    degree: {
      en: "Master's in Applied Mathematical Methods",
      es: 'Maestría en Métodos Matemáticos y Aplicaciones',
    },
    place: UCR,
    href: 'http://www.posgradomatematica.ucr.ac.cr/index.php/oferta-academica/maestria-profesional-en-metodos-matematicos-y-aplicaciones',
  },
  {
    degree: {
      en: "Master's in Full Stack Web Development",
      es: 'Máster en Desarrollo Web Full Stack',
    },
    place: same('Three Points Business School'),
    href: 'https://www.threepoints.com/es/',
  },
]

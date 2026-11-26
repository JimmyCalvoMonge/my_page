import type { Brand } from '../components/BrandLogo.tsx'
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

export type Experience = {
  role: L10n
  place: L10n
  period: L10n
  detail: L10n
  current?: boolean
}

export const experience: Experience[] = [
  {
    role: same('Senior Data Engineer'),
    place: same('IBM'),
    period: { en: '2025 – today', es: '2025 – hoy' },
    detail: {
      en: 'Designing and building cloud data platforms.',
      es: 'Diseño y construcción de plataformas de datos en la nube.',
    },
    current: true,
  },
  {
    role: same('Data Engineer II'),
    place: { en: 'Hakkoda, an IBM company', es: 'Hakkoda, una empresa de IBM' },
    period: same('2024 – 2026'),
    detail: {
      en: 'End-to-end pipelines with Snowflake, dbt, AWS and Airflow: Customer 360 platforms, migrations from SQL Server to Snowflake, and near-real-time healthcare billing data.',
      es: 'Pipelines de punta a punta con Snowflake, dbt, AWS y Airflow: plataformas Customer 360, migraciones de SQL Server a Snowflake y datos de facturación médica casi en tiempo real.',
    },
  },
  {
    role: { en: 'Statistician & Data Scientist', es: 'Estadístico y científico de datos' },
    place: same('Intel'),
    period: same('2021 – 2023'),
    detail: {
      en: 'Machine learning to detect manufacturing defects, statistical consulting for engineering teams, and automated analysis and reporting tools.',
      es: 'Aprendizaje automático para detectar defectos de manufactura, consultoría estadística para equipos de ingeniería y herramientas automatizadas de análisis y reportes.',
    },
  },
  {
    role: { en: 'Mathematics Professor', es: 'Profesor de Matemática' },
    place: UCR,
    period: same('2019 – 2022'),
    detail: {
      en: 'Taught calculus, linear algebra, differential equations, number theory and abstract algebra, and brought Python into the courses.',
      es: 'Impartí cálculo, álgebra lineal, ecuaciones diferenciales, teoría de números y álgebra abstracta, e incorporé Python a los cursos.',
    },
  },
]

export type Education = { degree: L10n; place: L10n; period: string; href?: string }

export const education: Education[] = [
  {
    degree: { en: "Master's in Applied Mathematics", es: 'Maestría en Matemática Aplicada' },
    place: UCR,
    period: '2021 – 2023',
    href: 'http://www.posgradomatematica.ucr.ac.cr/index.php/oferta-academica/maestria-profesional-en-metodos-matematicos-y-aplicaciones',
  },
  {
    degree: {
      en: "Master's in Full Stack Web Development",
      es: 'Máster en Desarrollo Web Full Stack',
    },
    place: {
      en: 'Three Points Business School · UPC Barcelona',
      es: 'Three Points Business School · UPC Barcelona',
    },
    period: '2021 – 2022',
    href: 'https://www.threepoints.com/es/',
  },
  {
    degree: { en: "Master's in Pure Mathematics", es: 'Maestría en Matemática Pura' },
    place: UCR,
    period: '2019 – 2020',
  },
  {
    degree: { en: 'Bachelor’s in Mathematics', es: 'Bachillerato en Matemática' },
    place: UCR,
    period: '2013 – 2018',
  },
]

export type Certification = { name: string; issuer: string; href: string; brand?: Brand }

/** Official credential names, kept in English. */
export const certifications: Certification[] = [
  {
    name: 'SnowPro Specialty: Gen AI',
    issuer: 'Snowflake',
    brand: 'snowflake',
    href: 'https://achieve.snowflake.com/2b175f37-485b-47a8-9421-603332916de0#acc.9SonbtBy',
  },
  {
    name: 'Claude Certified Architect – Foundations',
    issuer: 'Anthropic',
    brand: 'anthropic',
    href: 'https://www.credly.com/badges/02a0c452-4e8a-4984-9131-c5b201a07875/public_url',
  },
  {
    name: 'SnowPro Advanced: Data Engineer',
    issuer: 'Snowflake',
    brand: 'snowflake',
    href: 'https://achieve.snowflake.com/2393cae1-2dc1-469e-a9f3-e2467317bfdd#acc.IyrDsFn4',
  },
  {
    name: 'AWS Certified Data Engineer – Associate',
    issuer: 'AWS',
    brand: 'aws',
    href: 'https://www.credly.com/badges/3ab5dc0c-354d-46dd-b4ce-95ac1bbd0eca/public_url',
  },
  {
    name: 'Apache Airflow 3 Fundamentals',
    issuer: 'Astronomer',
    href: 'https://www.credly.com/badges/c194277e-088c-4ecb-a9c8-edc1e5ccf6e4/public_url',
  },
  {
    name: 'dbt Certified Developer',
    issuer: 'dbt Labs',
    brand: 'dbt',
    href: 'https://credentials.getdbt.com/a9f173b6-48c5-4626-9dd3-444bb5df9cba#gs.8k6j4v',
  },
  {
    name: 'SnowPro Core',
    issuer: 'Snowflake',
    brand: 'snowflake',
    href: 'https://achieve.snowflake.com/4a65b769-d139-4378-82f1-30b3c9fd9770#gs.bxtnjs',
  },
  {
    name: 'AWS Certified Cloud Practitioner',
    issuer: 'AWS',
    brand: 'aws',
    href: 'https://www.credly.com/badges/81a5cf8e-3b9b-49b0-b04e-30d53da69776/public_url',
  },
]

import type { L10n } from '../i18n/locale.tsx'
import ecdif from '../assets/notes/ecdif.jpg'
import algabs from '../assets/notes/algabs.jpg'
import ma0250 from '../assets/notes/ma0250.jpg'
import zahlen from '../assets/notes/zahlen.png'

export type CourseNotes = {
  title: L10n
  course: string
  summary: L10n
  link: string
  cover: string
}

const notes: CourseNotes[] = [
  {
    title: {
      en: 'Differential Equations for Engineering',
      es: 'Ecuaciones diferenciales para ingeniería',
    },
    course: 'MA 1005',
    summary: {
      en: 'The full syllabus with plenty of solved exercises.',
      es: 'Todo el temario del curso, con abundantes ejercicios resueltos.',
    },
    link: 'https://drive.google.com/file/d/1xtVxJXW6WZCJlCA4dkO2Bk9WmCS99bGR/view?usp=sharing',
    cover: ecdif,
  },
  {
    title: { en: 'Elementary Abstract Algebra', es: 'Álgebra abstracta elemental' },
    course: 'MA 0370',
    summary: {
      en: 'Lecture notes for future math teachers, with applications and explorations in SageMath.',
      es: 'Notas para futuros docentes de matemática, con aplicaciones y exploraciones en SageMath.',
    },
    link: 'https://drive.google.com/file/d/1ksbjZY0W2dGWjlUpDePKk8p7QaJLCXLv/view?usp=sharing',
    cover: algabs,
  },
  {
    title: { en: 'Calculus in One Variable (Honors)', es: 'Cálculo en una variable (honores)' },
    course: 'MA 0250',
    summary: {
      en: 'An introductory real analysis course for pure mathematics and actuarial science.',
      es: 'Un curso introductorio de análisis real para las carreras de matemática pura y ciencias actuariales.',
    },
    link: 'https://drive.google.com/file/d/1zXET90oQ4WtDwCFPACwyUn-ca5CE-yMm/view?usp=sharing',
    cover: ma0250,
  },
  {
    title: { en: 'Introduction to Number Theory', es: 'Introducción a la teoría de números' },
    course: 'MA 0025',
    summary: {
      en: 'From the foundations to cryptography, with exploratory exercises in SageMath.',
      es: 'Desde los fundamentos hasta la criptografía, con ejercicios exploratorios en SageMath.',
    },
    link: 'https://drive.google.com/file/d/1B8aiBnaSYBbhsEsd60HqA0t5ojc68GLg/view?usp=sharing',
    cover: zahlen,
  },
]

export default notes

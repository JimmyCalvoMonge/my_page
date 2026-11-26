import ecdif from '../assets/notes/ecdif.jpg'
import algabs from '../assets/notes/algabs.jpg'
import ma0250 from '../assets/notes/ma0250.jpg'
import zahlen from '../assets/notes/zahlen.png'

export type CourseNotes = {
  title: string
  course: string
  summary: string
  link: string
  cover: string
}

const notes: CourseNotes[] = [
  {
    title: 'Differential Equations for Engineering',
    course: 'MA 1005',
    summary: 'The full syllabus with plenty of solved exercises.',
    link: 'https://drive.google.com/file/d/1xtVxJXW6WZCJlCA4dkO2Bk9WmCS99bGR/view?usp=sharing',
    cover: ecdif,
  },
  {
    title: 'Elementary Abstract Algebra',
    course: 'MA 0370',
    summary:
      'Lecture notes for future math teachers, with applications and explorations in SageMath.',
    link: 'https://drive.google.com/file/d/1ksbjZY0W2dGWjlUpDePKk8p7QaJLCXLv/view?usp=sharing',
    cover: algabs,
  },
  {
    title: 'Calculus in One Variable (Honors)',
    course: 'MA 0250',
    summary: 'An introductory real analysis course for pure mathematics and actuarial science.',
    link: 'https://drive.google.com/file/d/1zXET90oQ4WtDwCFPACwyUn-ca5CE-yMm/view?usp=sharing',
    cover: ma0250,
  },
  {
    title: 'Introduction to Number Theory',
    course: 'MA 0025',
    summary: 'From the foundations to cryptography, with exploratory exercises in SageMath.',
    link: 'https://drive.google.com/file/d/1B8aiBnaSYBbhsEsd60HqA0t5ojc68GLg/view?usp=sharing',
    cover: zahlen,
  },
]

export default notes

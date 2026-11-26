import type { L10n } from './locale.tsx'

/** Interface text. Each leaf has an English and a Spanish version. */
export const messages = {
  nav: {
    main: { en: 'Main', es: 'Principal' },
    about: { en: 'About', es: 'Sobre mí' },
    research: { en: 'Research', es: 'Investigación' },
    teaching: { en: 'Teaching', es: 'Docencia' },
    contact: { en: 'Contact', es: 'Contacto' },
    openMenu: { en: 'Open menu', es: 'Abrir menú' },
    closeMenu: { en: 'Close menu', es: 'Cerrar menú' },
    language: { en: 'Language', es: 'Idioma' },
  },
  hero: {
    // Split around the name so it can be styled: "Hi, I’m Jimmy!" / "¡Hola, soy Jimmy!"
    greetingBefore: { en: 'Hi, I’m ', es: '¡Hola, soy ' },
    greetingAfter: { en: '!', es: '!' },
    role: { en: 'Mathematician & data engineer.', es: 'Matemático e ingeniero de datos.' },
    lead: {
      en: 'I studied pure mathematics, taught it at the University of Costa Rica, and now build data platforms. This is where I share my research, course notes and writing on mathematics.',
      es: 'Estudié matemática pura, la enseñé en la Universidad de Costa Rica y ahora construyo plataformas de datos. Aquí comparto mi investigación, mis notas de curso y textos sobre matemática.',
    },
    seeResearch: { en: 'See my research', es: 'Ver mi investigación' },
    downloadCv: { en: 'Download CV', es: 'Descargar CV' },
    elsewhere: { en: 'Elsewhere', es: 'En otros sitios' },
    email: { en: 'Email', es: 'Correo' },
    portraitAlt: { en: 'Portrait of Jimmy Calvo-Monge', es: 'Retrato de Jimmy Calvo-Monge' },
  },
  showcase: {
    previous: { en: 'Previous animation', es: 'Animación anterior' },
    next: { en: 'Next animation', es: 'Animación siguiente' },
    show: { en: 'See explanation', es: 'Ver explicación' },
    hide: { en: 'Hide explanation', es: 'Ocultar explicación' },
    paused: {
      en: 'Rotation is paused while this is open.',
      es: 'La rotación se detiene mientras esto está abierto.',
    },
  },
  about: {
    label: { en: 'About', es: 'Sobre mí' },
    title: {
      en: 'From pure mathematics to data engineering',
      es: 'De la matemática pura a la ingeniería de datos',
    },
    paragraphs: [
      {
        en: 'I studied pure mathematics at the University of Costa Rica, finishing with a master’s degree in algebraic geometry, and stayed on as a full-time professor for three years.',
        es: 'Estudié matemática pura en la Universidad de Costa Rica, donde terminé una maestría en geometría algebraica, y me quedé como profesor de tiempo completo durante tres años.',
      },
      {
        en: 'Along the way I wrote class notes, papers and books, and I built this site to share that material with students, teachers and anyone curious about mathematics.',
        es: 'En ese tiempo escribí notas de clase, artículos y libros, y creé este sitio para compartir ese material con estudiantes, docentes y cualquier persona con curiosidad por la matemática.',
      },
      {
        en: 'Since then I’ve moved into industry: first as a statistician and data scientist at Intel, and now as a data engineer at Hakkoda. I also hold master’s degrees in applied mathematical methods and in full stack web development.',
        es: 'Después pasé a la industria: primero como estadístico y científico de datos en Intel, y ahora como ingeniero de datos en Hakkoda. También tengo maestrías en métodos matemáticos aplicados y en desarrollo web full stack.',
      },
    ],
    experience: { en: 'Experience', es: 'Experiencia' },
    education: { en: 'Education', es: 'Formación' },
    now: { en: 'Now', es: 'Actual' },
  },
  research: {
    label: { en: 'Research & writing', es: 'Investigación y escritos' },
    title: { en: 'Papers, theses and articles', es: 'Artículos, tesis y textos' },
    intro: {
      en: 'Pure and applied: from Galois groups and elliptic curves to epidemic models and machine learning.',
      es: 'Pura y aplicada: desde grupos de Galois y curvas elípticas hasta modelos epidemiológicos y aprendizaje automático.',
    },
  },
  teaching: {
    label: { en: 'Teaching', es: 'Docencia' },
    title: { en: 'Course notes', es: 'Notas de curso' },
    intro: {
      en: 'Material I wrote for courses at the School of Mathematics of the University of Costa Rica. All notes are in Spanish.',
      es: 'Material que escribí para cursos de la Escuela de Matemática de la Universidad de Costa Rica. Todas las notas están en español.',
    },
    openPdf: { en: 'Open PDF', es: 'Abrir PDF' },
  },
  contact: {
    label: { en: 'Contact', es: 'Contacto' },
    title: { en: 'Let’s connect.', es: 'Hablemos.' },
    text: {
      en: 'Questions about the notes, a research idea, or a data problem? I’d like to hear from you.',
      es: '¿Preguntas sobre las notas, una idea de investigación o un problema de datos? Me encantaría saber de ti.',
    },
  },
} satisfies Record<string, Record<string, L10n | L10n[]>>

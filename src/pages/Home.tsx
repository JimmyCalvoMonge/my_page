import About from '../components/About.tsx'
import Contact from '../components/Contact.tsx'
import Footer from '../components/Footer.tsx'
import Hero from '../components/Hero.tsx'
import Navbar from '../components/Navbar.tsx'
import Research from '../components/Research.tsx'
import Teaching from '../components/Teaching.tsx'

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Research />
        <Teaching />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

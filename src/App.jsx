import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Services from './components/Services'
import About from './components/About'
import Opinions from './components/Opinions'
import Gallery from './components/Gallery'
import Contact from './components/Contact'
import CTA from './components/CTA'
import Footer from './components/Footer'
import './index.css'

function App() {
  return (
    <>
      <Navbar />
      <section id="hero">
        <Hero />
      </section>
      <Services />
      <About />
      <Opinions />
      <Gallery />
      <CTA />
      <Contact />
      <Footer />
    </>
  )
}

export default App
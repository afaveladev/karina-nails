import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Services from './components/Services'
import About from './components/About'
import Results from './components/Results'
import Gallery from './components/Gallery'
import Contact from './components/Contact'
import Opinions from './components/Opinions'
import CTA from './components/CTA'
import Footer from './components/Footer'
import CountdownParallax from './components/CountdownParallax'

import './index.css'

gsap.registerPlugin(ScrollTrigger)

function App() {

  useEffect(() => {
    gsap.utils.toArray('.fade-up').forEach((element) => {
      gsap.fromTo(element,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: element,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      )
    })
  }, [])

  const targetDate = new Date()
  targetDate.setDate(targetDate.getDate() + 7)

  return (
    <>
      <Navbar />
      <Hero />

      {/* Countdown Parallax */}
      <CountdownParallax targetDate={targetDate} />

      {/* Secciones con animación fade-up */}
      <div className="fade-up"><Services /></div>
      <div className="fade-up"><About /></div>
      <div className="fade-up"><Results /></div>
      <div className="fade-up"><Gallery /></div>
      <div className="fade-up"><CTA /></div>
      <div className="fade-up"><Contact /></div>
      <div className="fade-up"><Opinions /></div>

      <Footer />

      {/* WhatsApp Flotante */}
      <a href="https://wa.me/541134567890" className="whatsapp-float" target="_blank" rel="noopener noreferrer">
        <i className="fab fa-whatsapp"></i>
      </a>
    </>
  )
}

export default App
import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Services from './components/Services'
import About from './components/About'
import Opinions from './components/Opinions'
import Gallery from './components/Gallery'
import Contact from './components/Contact'
import CTA from './components/CTA'
import Footer from './components/Footer'
import CountdownTimer from './components/CountdownTimer'
import './index.css'

gsap.registerPlugin(ScrollTrigger)

function App() {
  useEffect(() => {
    // Animaciones fade-up con GSAP + ScrollTrigger
    gsap.utils.toArray('.fade-up').forEach((element) => {
      gsap.fromTo(element, 
        {
          opacity: 0,
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: element,
            start: "top 85%",
            end: "bottom 70%",
            toggleActions: "play none none reverse"
          }
        }
      )
    })

    // Animación de entrada para secciones
    gsap.utils.toArray('section').forEach((section, i) => {
      gsap.fromTo(section,
        {
          scale: 0.98,
          opacity: 0.5
        },
        {
          scale: 1,
          opacity: 1,
          duration: 0.6,
          scrollTrigger: {
            trigger: section,
            start: "top 90%",
            end: "bottom 80%",
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
      
      {/* Countdown Timer con animación */}
      <div className="countdown-wrapper fade-up">
        <div className="container">
          <CountdownTimer 
            targetDate={targetDate} 
            title="🔥 Promoción de lanzamiento" 
            promoText="✨ 15% OFF en todos los combos ✨" 
          />
        </div>
      </div>
      
      <Services />
      <About />
      <Opinions />
      <Gallery />
      <CTA />
      <Contact />
      <Footer />
      
      {/* Botón flotante de WhatsApp con GSAP */}
      <div className="whatsapp-float" id="whatsappFloat">
        <i className="fab fa-whatsapp"></i>
      </div>
    </>
  )
}

export default App
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
import lugarImg from './assets/Lugar.webp'

gsap.registerPlugin(ScrollTrigger)

function App() {
  useEffect(() => {
    // Animaciones fade-up con ScrollTrigger
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
      
      <div className="container fade-up">
        <CountdownTimer 
          targetDate={targetDate} 
          title="🔥 Promoción de lanzamiento" 
          promoText="✨ 15% OFF en todos los combos ✨" 
        />
      </div>
      
      <div className="fade-up"><Services /></div>
      <div className="fade-up"><About /></div>
      <div className="fade-up"><Opinions /></div>
      <div className="fade-up"><Gallery /></div>
      <div className="fade-up"><CTA /></div>
      <div className="fade-up"><Contact /></div>
      <Footer />
      
      <a href="https://wa.me/541134567890" className="whatsapp-float" target="_blank" rel="noopener noreferrer">
        <i className="fab fa-whatsapp"></i>
      </a>
    </>
  )
}

export default App
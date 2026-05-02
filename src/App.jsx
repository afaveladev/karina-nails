import { useEffect } from 'react'
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

function App() {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('visible')
      })
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' })
    document.querySelectorAll('.fade-up').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const targetDate = new Date()
  targetDate.setDate(targetDate.getDate() + 7)

  return (
    <>
      <Navbar />
      <section id="hero"><Hero /></section>
      <div className="container"><CountdownTimer targetDate={targetDate} title="🔥 Promoción de lanzamiento" promoText="✨ 15% OFF en todos los combos ✨" /></div>
      <div className="fade-up"><Services /></div>
      <div className="fade-up"><About /></div>
      <div className="fade-up"><Opinions /></div>
      <div className="fade-up"><Gallery /></div>
      <div className="fade-up"><CTA /></div>
      <div className="fade-up"><Contact /></div>
      <Footer />
    </>
  )
}

export default App
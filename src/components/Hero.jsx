import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { GiLipstick } from 'react-icons/gi'

const Hero = () => {
  const titleRef = useRef(null)
  const iconRef = useRef(null)

  useEffect(() => {
    const title = titleRef.current
    const text = title.innerText
    title.innerHTML = ''
    
    text.split('').forEach((char, i) => {
      const span = document.createElement('span')
      span.innerText = char === ' ' ? '\u00A0' : char
      span.style.opacity = '0'
      span.style.display = 'inline-block'
      title.appendChild(span)
      
      gsap.to(span, {
        opacity: 1,
        duration: 0.05,
        delay: i * 0.05,
        ease: 'power2.out'
      })
    })
    
    gsap.to(iconRef.current, {
      rotation: 360,
      duration: 8,
      repeat: -1,
      ease: 'none'
    })
  }, [])

  return (
    <section id="hero" style={styles.hero}>
      <div style={styles.container}>
        <div ref={iconRef} style={styles.icon}>
          <GiLipstick size={80} color="#14B8A6" />
        </div>
        <h1 ref={titleRef} style={styles.title}>
          KARINA'S NAILS & LASHES
        </h1>
        <p style={styles.subtitle}>Belleza que eleva tu estilo</p>
        <button className="btn-primary" onClick={() => {
          const contactSection = document.getElementById('contact')
          if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' })
          }
        }}>
          Agendar Cita
        </button>
      </div>
    </section>
  )
}

const styles = {
  hero: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#000000',
    textAlign: 'center'
  },
  container: {
    padding: '20px'
  },
  icon: {
    marginBottom: '30px'
  },
  title: {
    fontSize: 'clamp(2rem, 8vw, 4rem)',
    fontFamily: 'Playfair Display, serif',
    letterSpacing: '2px',
    color: 'white'
  },
  subtitle: {
    fontSize: 'clamp(1rem, 4vw, 1.5rem)',
    color: '#14B8A6',
    marginTop: '20px',
    marginBottom: '30px',
    fontFamily: 'Poppins, sans-serif'
  }
}

export default Hero
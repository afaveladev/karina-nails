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
      duration: 12,
      repeat: -1,
      ease: 'none'
    })
  }, [])

  return (
    <section id="hero" style={styles.hero}>
      {/* Fondo decorativo sutil */}
      <div style={styles.bgDecoration}>
        <div style={styles.glowOrb1}></div>
        <div style={styles.glowOrb2}></div>
      </div>
      
      <div style={styles.container}>
        <div ref={iconRef} style={styles.icon}>
          <GiLipstick size={90} color="#2EC4B6" />
        </div>
        <h1 ref={titleRef} style={styles.title}>
          KARINA'S <span style={styles.titleAccent}>NAILS & LASHES</span>
        </h1>
        <div style={styles.goldLine}></div>
        <p style={styles.subtitle}>Belleza que eleva tu estilo</p>
        <button className="btn-primary glow-effect" onClick={() => {
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
    background: 'radial-gradient(circle at 10% 20%, rgba(46, 196, 182, 0.08) 0%, #0F0F10 70%)',
    textAlign: 'center',
    position: 'relative',
    overflow: 'hidden'
  },
  bgDecoration: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    zIndex: 0
  },
  glowOrb1: {
    position: 'absolute',
    top: '-20%',
    right: '-10%',
    width: '500px',
    height: '500px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(46, 196, 182, 0.15) 0%, transparent 70%)',
    animation: 'floatGlow 12s ease-in-out infinite'
  },
  glowOrb2: {
    position: 'absolute',
    bottom: '-20%',
    left: '-10%',
    width: '400px',
    height: '400px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(201, 169, 110, 0.1) 0%, transparent 70%)',
    animation: 'floatGlow 15s ease-in-out infinite reverse'
  },
  container: {
    padding: '20px',
    position: 'relative',
    zIndex: 1
  },
  icon: {
    marginBottom: '30px',
    filter: 'drop-shadow(0 0 15px rgba(46, 196, 182, 0.3))'
  },
  title: {
    fontSize: 'clamp(2rem, 8vw, 4.5rem)',
    fontFamily: 'Playfair Display, serif',
    letterSpacing: '3px',
    color: '#F5F5F5',
    marginBottom: '20px'
  },
  titleAccent: {
    background: 'linear-gradient(135deg, #2EC4B6 0%, #C9A96E 100%)',
    WebkitBackgroundClip: 'text',
    backgroundClip: 'text',
    color: 'transparent'
  },
  goldLine: {
    width: '80px',
    height: '2px',
    background: 'linear-gradient(90deg, #2EC4B6, #C9A96E, transparent)',
    margin: '20px auto',
    borderRadius: '2px'
  },
  subtitle: {
    fontSize: 'clamp(1rem, 4vw, 1.3rem)',
    color: '#A0A0A0',
    marginTop: '10px',
    marginBottom: '35px',
    fontFamily: 'Poppins, sans-serif',
    fontWeight: 300,
    letterSpacing: '1px'
  }
}

// Agregar animaciones al document
const animationStyles = document.createElement('style')
animationStyles.textContent = `
  @keyframes floatGlow {
    0%, 100% {
      transform: translate(0, 0) scale(1);
      opacity: 0.5;
    }
    50% {
      transform: translate(30px, 20px) scale(1.1);
      opacity: 0.8;
    }
  }
  
  @keyframes subtlePulse {
    0%, 100% {
      opacity: 0.6;
    }
    50% {
      opacity: 1;
    }
  }
`
document.head.appendChild(animationStyles)

export default Hero
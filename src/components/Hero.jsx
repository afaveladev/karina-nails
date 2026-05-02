import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { GiLipstick } from 'react-icons/gi'

const Hero = () => {
  const titleRef = useRef(null)
  const subtitleRef = useRef(null)
  const iconRef = useRef(null)

  useEffect(() => {
    // Animación del título
    const title = titleRef.current
    const titleText = title.innerText
    title.innerHTML = ''

    titleText.split('').forEach((char, i) => {
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

    // Animación del subtítulo
    const subtitle = subtitleRef.current
    const subtitleText = subtitle.innerText
    subtitle.innerHTML = ''

    subtitleText.split('').forEach((char, i) => {
      const span = document.createElement('span')
      span.innerText = char === ' ' ? '\u00A0' : char
      span.style.opacity = '0'
      span.style.display = 'inline-block'
      subtitle.appendChild(span)

      gsap.to(span, {
        opacity: 1,
        duration: 0.05,
        delay: i * 0.05 + 0.5,
        ease: 'power2.out'
      })
    })

    // Ícono girando
    gsap.to(iconRef.current, {
      rotation: 360,
      duration: 12,
      repeat: -1,
      ease: 'none'
    })
  }, [])

  return (
    <section id="hero" style={styles.hero}>
      <div style={styles.bgDecoration}>
        <div style={styles.glowOrb1}></div>
        <div style={styles.glowOrb2}></div>
      </div>

      <div style={styles.container}>
        
        {/* Ícono */}
        <div ref={iconRef} style={styles.icon}>
          <GiLipstick size={window.innerWidth <= 480 ? 55 : window.innerWidth <= 768 ? 70 : 90} color="#2EC4B6" />
        </div>

        {/* Badge estilo imagen */}
        <div style={styles.studioBadge}>
          ✦ Studio Premium de Belleza
        </div>

        {/* Título */}
        <h1 ref={titleRef} style={styles.title}>
          Karina Nails
        </h1>

        {/* Subtítulo */}
        <h2 ref={subtitleRef} style={styles.subtitle}>
          & Lashes
        </h2>

        {/* Línea */}
        <div style={styles.goldLine}></div>

        {/* Descripción */}
        <p style={styles.description}>
          Belleza que eleva tu estilo
        </p>

        {/* Botón */}
        <button
          className="btn-primary glow-effect"
          onClick={() => {
            const contactSection = document.getElementById('contact')
            if (contactSection) {
              contactSection.scrollIntoView({ behavior: 'smooth' })
            }
          }}
        >
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
    background: 'radial-gradient(circle at 10% 20%, rgba(46, 196, 182, 0.08) 0%, #0A0A0F 90%)',
    textAlign: 'center',
    position: 'relative',
    overflow: 'hidden',
    padding: '80px 20px'
  },

  bgDecoration: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 0
  },

  glowOrb1: {
    position: 'absolute',
    top: '-20%',
    right: '-10%',
    width: 'min(500px, 80vw)',
    height: 'min(500px, 80vw)',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(46,196,182,0.12) 0%, transparent 70%)',
    animation: 'floatGlow 12s ease-in-out infinite'
  },

  glowOrb2: {
    position: 'absolute',
    bottom: '-20%',
    left: '-10%',
    width: 'min(400px, 70vw)',
    height: 'min(400px, 70vw)',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(201,169,110,0.08) 0%, transparent 70%)',
    animation: 'floatGlow 15s ease-in-out infinite reverse'
  },

  container: {
    padding: '20px',
    position: 'relative',
    zIndex: 1,
    maxWidth: '900px'
  },

  icon: {
    marginBottom: '25px',
    filter: 'drop-shadow(0 0 15px rgba(46,196,182,0.4))'
  },

  // 💎 BADGE PRO
  studioBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    padding: '8px 18px',
    borderRadius: '30px',
    fontSize: 'clamp(0.65rem, 3.5vw, 0.9rem)',
    color: '#C9A96E',
    border: '1px solid rgba(255,255,255,0.15)',
    background: 'rgba(255,255,255,0.05)',
    backdropFilter: 'blur(12px)',
    marginBottom: '20px',
    letterSpacing: '2px'
  },

  // 🎨 TÍTULO CON DEGRADADO
  title: {
    fontSize: 'clamp(1.8rem, 7vw, 4.5rem)',
    fontFamily: 'Playfair Display, serif',
    letterSpacing: 'clamp(1px, 1.5vw, 3px)',
    marginBottom: '5px',
    lineHeight: '1.2',

    background: 'linear-gradient(90deg, #ffffff 0%, #dfefff 30%, #2EC4B6 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent'
  },

  // 🎨 SUBTÍTULO CON DEGRADADO
  subtitle: {
    fontSize: 'clamp(1.5rem, 6vw, 3rem)',
    fontFamily: 'Playfair Display, serif',
    letterSpacing: 'clamp(1px, 1.5vw, 3px)',
    marginTop: '-10px',
    marginBottom: '15px',
    lineHeight: '1.2',

    background: 'linear-gradient(90deg, #ffffff 0%, #dfefff 30%, #2EC4B6 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent'
  },

  goldLine: {
    width: 'clamp(50px, 15vw, 80px)',
    height: '2px',
    background: 'linear-gradient(90deg, #2EC4B6, #C9A96E, #D8A7B9)',
    margin: '20px auto',
    borderRadius: '2px'
  },

  description: {
    fontSize: 'clamp(0.8rem, 3.5vw, 1.1rem)',
    color: '#A0A0A0',
    marginBottom: '35px',
    fontFamily: 'Poppins, sans-serif',
    letterSpacing: '1px'
  }
}

// Animación global
const animationStyles = document.createElement('style')
animationStyles.textContent = `
@keyframes floatGlow {
  0%, 100% { transform: translate(0,0) scale(1); opacity: 0.5; }
  50% { transform: translate(30px,20px) scale(1.1); opacity: 0.8; }
}
`
document.head.appendChild(animationStyles)

export default Hero
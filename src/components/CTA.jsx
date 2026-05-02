import { useEffect, useRef, useState } from 'react'
import { FaStar, FaSmile, FaHeart, FaClock } from 'react-icons/fa'

const CTA = () => {
  const [counts, setCounts] = useState({
    stars: 0,
    clients: 0,
    satisfaction: 0,
    experience: 0
  })
  
  const sectionRef = useRef(null)
  const animatedRef = useRef(false)

  const animateNumber = (target, setter, duration = 2000) => {
    const step = target / 60
    let current = 0
    const interval = setInterval(() => {
      current += step
      if (current >= target) {
        setter(target)
        clearInterval(interval)
      } else {
        setter(Math.floor(current))
      }
    }, duration / 60)
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !animatedRef.current) {
          animatedRef.current = true
          animateNumber(49, (val) => setCounts(prev => ({ ...prev, stars: val })))
          animateNumber(500, (val) => setCounts(prev => ({ ...prev, clients: val })))
          animateNumber(100, (val) => setCounts(prev => ({ ...prev, satisfaction: val })))
          animateNumber(5, (val) => setCounts(prev => ({ ...prev, experience: val })))
        }
      },
      { threshold: 0.5 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} style={styles.cta}>
      <div className="container" style={styles.container}>
        <h2 style={styles.title}>Nuestras <span style={styles.accent}>Estadísticas</span></h2>
        <div className="section-divider"></div>
        <p style={styles.subtitle}>Números que hablan por sí solos</p>

        <div className="stats-grid" style={styles.grid}>
          <div className="stat-card" style={styles.card}>
            <div style={styles.icon}>
              <FaStar size={50} color="#C9A96E" />
            </div>
            <div style={styles.number}>{counts.stars}.9 ★</div>
            <div style={styles.label}>Calificación promedio</div>
            <div style={styles.description}>⭐ Basado en 500+ reseñas</div>
          </div>

          <div className="stat-card" style={styles.card}>
            <div style={styles.icon}>
              <FaSmile size={50} color="#2EC4B6" />
            </div>
            <div style={styles.number}>+{counts.clients}</div>
            <div style={styles.label}>Clientas satisfechas</div>
            <div style={styles.description}>💅 En los últimos 12 meses</div>
          </div>

          <div className="stat-card" style={styles.card}>
            <div style={styles.icon}>
              <FaHeart size={50} color="#2EC4B6" />
            </div>
            <div style={styles.number}>{counts.satisfaction}%</div>
            <div style={styles.label}>Recomendación</div>
            <div style={styles.description}>✨ Clientes que vuelven</div>
          </div>

          <div className="stat-card" style={styles.card}>
            <div style={styles.icon}>
              <FaClock size={50} color="#2EC4B6" />
            </div>
            <div style={styles.number}>+{counts.experience}</div>
            <div style={styles.label}>Años de experiencia</div>
            <div style={styles.description}>🎯 Profesionalismo garantizado</div>
          </div>
        </div>

        <div style={styles.buttonContainer}>
          <button 
            className="btn-primary glow-effect" 
            onClick={() => {
              const contactSection = document.getElementById('contact')
              if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' })
              }
            }}
            style={styles.button}
          >
            ¡Reserva tu cita ahora!
          </button>
        </div>
      </div>
    </section>
  )
}

const styles = {
  cta: {
    padding: '100px 0',
    background: 'linear-gradient(135deg, #0F0F10 0%, #0a0a0a 100%)',
    borderTop: '1px solid rgba(46, 196, 182, 0.3)',
    borderBottom: '1px solid rgba(46, 196, 182, 0.3)',
    position: 'relative'
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 24px',
    textAlign: 'center'
  },
  title: {
    fontSize: 'clamp(2rem, 5vw, 3.2rem)',
    fontFamily: 'Playfair Display, serif',
    marginBottom: '10px',
    color: '#F5F5F5'
  },
  accent: {
    background: 'linear-gradient(135deg, #2EC4B6 0%, #C9A96E 100%)',
    WebkitBackgroundClip: 'text',
    backgroundClip: 'text',
    color: 'transparent'
  },
  subtitle: {
    textAlign: 'center',
    color: '#A0A0A0',
    marginBottom: '60px',
    fontSize: '1rem',
    fontWeight: 300,
    letterSpacing: '0.5px'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '30px',
    marginBottom: '60px'
  },
  card: {
    background: 'rgba(26, 26, 30, 0.6)',
    backdropFilter: 'blur(10px)',
    padding: '35px 20px',
    borderRadius: '20px',
    textAlign: 'center',
    transition: 'all 0.4s cubic-bezier(0.2, 0.9, 0.4, 1.1)',
    border: '1px solid rgba(46, 196, 182, 0.1)'
  },
  icon: {
    marginBottom: '20px',
    transition: 'all 0.3s ease'
  },
  number: {
    fontSize: 'clamp(2rem, 4vw, 3rem)',
    fontWeight: 'bold',
    background: 'linear-gradient(135deg, #2EC4B6 0%, #C9A96E 100%)',
    WebkitBackgroundClip: 'text',
    backgroundClip: 'text',
    color: 'transparent',
    fontFamily: 'Playfair Display, serif',
    marginBottom: '10px'
  },
  label: {
    fontSize: 'clamp(0.85rem, 2vw, 1rem)',
    color: '#F5F5F5',
    marginBottom: '8px',
    fontWeight: '500',
    letterSpacing: '0.5px'
  },
  description: {
    fontSize: '0.8rem',
    color: '#A0A0A0'
  },
  buttonContainer: {
    marginTop: '20px'
  },
  button: {
    fontSize: 'clamp(0.9rem, 2.5vw, 1.1rem)',
    padding: 'clamp(10px, 3vw, 14px) clamp(25px, 6vw, 45px)',
    letterSpacing: '1px'
  }
}

const hoverStyles = document.createElement('style')
hoverStyles.textContent = `
  @media (max-width: 992px) {
    .stats-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 25px !important; }
  }
  @media (max-width: 768px) {
    .stats-grid { grid-template-columns: 1fr !important; gap: 20px !important; }
    .stat-card { padding: 25px 15px !important; }
    .stat-card .number { font-size: clamp(1.5rem, 6vw, 2rem) !important; }
  }
  @media (max-width: 480px) {
    .stat-card { padding: 20px 12px !important; }
    .stat-card .icon svg { width: 35px !important; height: 35px !important; }
    .stat-card .label { font-size: 0.85rem !important; }
    .stat-card .description { font-size: 0.7rem !important; }
  }
  .stat-card:hover {
    transform: translateY(-12px);
    border-color: rgba(46, 196, 182, 0.4);
    box-shadow: 0 20px 40px rgba(46, 196, 182, 0.15);
  }
  .stat-card:hover .icon {
    transform: scale(1.1);
  }
`
document.head.appendChild(hoverStyles)

export default CTA
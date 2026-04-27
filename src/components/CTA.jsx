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
        <p style={styles.subtitle}>Números que hablan por sí solos</p>

        <div style={styles.grid}>
          <div style={styles.card}>
            <div style={styles.icon}>
              <FaStar size={50} color="#14B8A6" />
            </div>
            <div style={styles.number}>{counts.stars}.9 ★</div>
            <div style={styles.label}>Calificación promedio</div>
            <div style={styles.description}>⭐ Basado en 500+ reseñas</div>
          </div>

          <div style={styles.card}>
            <div style={styles.icon}>
              <FaSmile size={50} color="#14B8A6" />
            </div>
            <div style={styles.number}>+{counts.clients}</div>
            <div style={styles.label}>Clientas satisfechas</div>
            <div style={styles.description}>💅 En los últimos 12 meses</div>
          </div>

          <div style={styles.card}>
            <div style={styles.icon}>
              <FaHeart size={50} color="#14B8A6" />
            </div>
            <div style={styles.number}>{counts.satisfaction}%</div>
            <div style={styles.label}>Recomendación</div>
            <div style={styles.description}>✨ Clientes que vuelven</div>
          </div>

          <div style={styles.card}>
            <div style={styles.icon}>
              <FaClock size={50} color="#14B8A6" />
            </div>
            <div style={styles.number}>+{counts.experience}</div>
            <div style={styles.label}>Años de experiencia</div>
            <div style={styles.description}>🎯 Profesionalismo garantizado</div>
          </div>
        </div>

        <div style={styles.buttonContainer}>
          <button 
            className="btn-primary" 
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
    padding: '80px 0',
    background: 'linear-gradient(135deg, #000000 0%, #0a0a0a 100%)',
    borderTop: '1px solid #14B8A6',
    borderBottom: '1px solid #14B8A6'
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 20px',
    textAlign: 'center'
  },
  title: {
    fontSize: 'clamp(2rem, 5vw, 3rem)',
    fontFamily: 'Playfair Display, serif',
    marginBottom: '10px',
    color: 'white'
  },
  accent: {
    color: '#14B8A6'
  },
  subtitle: {
    textAlign: 'center',
    color: '#9CA3AF',
    marginBottom: '50px',
    fontSize: '1.1rem'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '30px',
    marginBottom: '50px'
  },
  card: {
    backgroundColor: '#111',
    padding: '30px',
    borderRadius: '15px',
    textAlign: 'center',
    transition: 'transform 0.3s ease',
    border: '1px solid #222'
  },
  icon: {
    marginBottom: '20px'
  },
  number: {
    fontSize: 'clamp(2rem, 4vw, 3rem)',
    fontWeight: 'bold',
    color: '#14B8A6',
    fontFamily: 'Playfair Display, serif',
    marginBottom: '10px'
  },
  label: {
    fontSize: '1.1rem',
    color: 'white',
    marginBottom: '10px',
    fontWeight: '500'
  },
  description: {
    fontSize: '0.8rem',
    color: '#9CA3AF'
  },
  buttonContainer: {
    marginTop: '20px'
  },
  button: {
    fontSize: '1.2rem',
    padding: '15px 40px'
  }
}

// Hover effects
const hoverStyles = document.createElement('style')
hoverStyles.textContent = `
  #cta .card:hover {
    transform: translateY(-10px);
    border-color: #14B8A6;
  }
`
document.head.appendChild(hoverStyles)

export default CTA
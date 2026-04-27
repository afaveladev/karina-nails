import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { GiNails, GiEyelashes, GiLipstick } from 'react-icons/gi'
import { FaRegEye } from 'react-icons/fa'
import { FaStar } from 'react-icons/fa6'
import { LuSparkles } from 'react-icons/lu'

const Services = () => {
  const cardsRef = useRef([])

  useEffect(() => {
    cardsRef.current.forEach((card) => {
      if (!card) return
      
      card.addEventListener('mouseenter', () => {
        gsap.to(card, {
          rotateY: 8,
          rotateX: 4,
          scale: 1.02,
          duration: 0.4,
          ease: 'power2.out'
        })
      })
      
      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          rotateY: 0,
          rotateX: 0,
          scale: 1,
          duration: 0.4,
          ease: 'power2.out'
        })
      })
    })
  }, [])

  const services = [
    { id: 1, name: 'Uñas Acrílicas', price: '$350', duration: '1.5 hrs', icon: <GiNails size={50} />, description: 'Durabilidad y elegancia' },
    { id: 2, name: 'Uñas de Gel', price: '$300', duration: '1 hr', icon: <LuSparkles size={50} />, description: 'Brillo natural y resistente' },
    { id: 3, name: 'Pestañas Clásicas', price: '$400', duration: '1.5 hrs', icon: <GiEyelashes size={50} />, description: 'Mirada espectacular' },
    { id: 4, name: 'Pestañas Volumen', price: '$500', duration: '2 hrs', icon: <FaStar size={50} />, description: 'Volumen impactante' },
    { id: 5, name: 'Perfilado de Cejas', price: '$150', duration: '30 min', icon: <FaRegEye size={50} />, description: 'Cejas perfectas' },
    { id: 6, name: 'Combo Uñas + Pestañas', price: '$700', duration: '3 hrs', icon: <GiLipstick size={50} />, description: 'Precio especial' }
  ]

  const handleServiceClick = (service) => {
    localStorage.setItem('selectedService', JSON.stringify(service))
    const contactSection = document.getElementById('contact')
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="services" style={styles.services}>
      <div className="container" style={styles.container}>
        <h2 style={styles.title}>Nuestros <span style={styles.accent}>Servicios</span></h2>
        <div className="section-divider"></div>
        <p style={styles.subtitle}>Elige el servicio que más te guste</p>
        
        <div style={styles.grid}>
          {services.map((service, index) => (
            <div
              key={service.id}
              ref={el => cardsRef.current[index] = el}
              className="service-card"
              onClick={() => handleServiceClick(service)}
            >
              <div style={styles.iconWrapper}>
                <div className="service-icon" style={{ color: '#2EC4B6' }}>{service.icon}</div>
              </div>
              <h3 style={styles.serviceName}>{service.name}</h3>
              <p style={styles.description}>{service.description}</p>
              <div className="gold-divider" style={{ margin: '15px 0' }}></div>
              <div style={styles.serviceFooter}>
                <span style={styles.price}>{service.price}</span>
                <span style={styles.duration}>{service.duration}</span>
              </div>
              <button className="btn-primary" style={styles.button}>Agendar Cita</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

const styles = {
  services: {
    padding: '100px 0',
    backgroundColor: '#0F0F10',
    minHeight: '100vh'
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 24px'
  },
  title: {
    textAlign: 'center',
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
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '30px'
  },
  iconWrapper: {
    marginBottom: '20px',
    display: 'flex',
    justifyContent: 'center'
  },
  serviceName: {
    fontSize: '1.5rem',
    fontFamily: 'Playfair Display, serif',
    marginBottom: '10px',
    color: '#F5F5F5'
  },
  description: {
    color: '#A0A0A0',
    marginBottom: '20px',
    fontSize: '0.9rem'
  },
  serviceFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px'
  },
  price: {
    color: '#2EC4B6',
    fontSize: '1.4rem',
    fontWeight: 'bold',
    fontFamily: 'Playfair Display, serif'
  },
  duration: {
    color: '#C9A96E',
    fontSize: '0.85rem',
    letterSpacing: '0.5px'
  },
  button: {
    width: '100%',
    marginTop: '5px',
    background: 'linear-gradient(135deg, #2EC4B6 0%, #20a094 100%)',
    borderRadius: '40px',
    padding: '12px',
    fontWeight: 500,
    letterSpacing: '1px'
  }
}

export default Services
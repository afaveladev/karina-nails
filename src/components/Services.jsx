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
          rotateY: 10,
          rotateX: 5,
          scale: 1.05,
          duration: 0.3,
          ease: 'power2.out'
        })
      })
      
      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          rotateY: 0,
          rotateX: 0,
          scale: 1,
          duration: 0.3,
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
        <p style={styles.subtitle}>Elige el servicio que más te guste</p>
        
        <div style={styles.grid}>
          {services.map((service, index) => (
            <div
              key={service.id}
              ref={el => cardsRef.current[index] = el}
              style={styles.card}
              onClick={() => handleServiceClick(service)}
            >
              <div style={styles.iconWrapper}>
                <div style={{ color: '#14B8A6' }}>{service.icon}</div>
              </div>
              <h3 style={styles.serviceName}>{service.name}</h3>
              <p style={styles.description}>{service.description}</p>
              <div style={styles.serviceFooter}>
                <span style={styles.price}>{service.price}</span>
                <span style={styles.duration}>{service.duration}</span>
              </div>
              <button style={styles.button}>Agendar</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

const styles = {
  services: {
    padding: '80px 0',
    backgroundColor: '#000000',
    minHeight: '100vh'
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 20px'
  },
  title: {
    textAlign: 'center',
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
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '30px'
  },
  card: {
    backgroundColor: '#111111',
    borderRadius: '15px',
    padding: '30px',
    textAlign: 'center',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    border: '1px solid #222',
    transformStyle: 'preserve-3d'
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
    color: 'white'
  },
  description: {
    color: '#9CA3AF',
    marginBottom: '20px',
    fontSize: '0.9rem'
  },
  serviceFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '20px',
    padding: '10px 0',
    borderTop: '1px solid #222',
    borderBottom: '1px solid #222'
  },
  price: {
    color: '#14B8A6',
    fontSize: '1.3rem',
    fontWeight: 'bold'
  },
  duration: {
    color: '#9CA3AF',
    fontSize: '0.9rem'
  },
  button: {
    backgroundColor: '#14B8A6',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontFamily: 'Poppins, sans-serif',
    fontWeight: '600',
    width: '100%',
    transition: 'all 0.3s ease'
  }
}

export default Services
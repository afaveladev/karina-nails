import { GiLipstick } from 'react-icons/gi'
import { FaWhatsapp, FaInstagram, FaFacebook, FaMapMarkerAlt, FaPhone, FaClock } from 'react-icons/fa'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const scrollToSection = (id) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <footer style={styles.footer}>
      <div className="container" style={styles.container}>
        <div style={styles.grid}>
          {/* Logo y descripción */}
          <div style={styles.section}>
            <div style={styles.logo}>
              <GiLipstick size={50} color="#2EC4B6" />
              <span style={styles.logoText}>KARINA'S</span>
            </div>
            <p style={styles.description}>
              Belleza que eleva tu estilo. Especialistas en uñas y pestañas con más de 5 años de experiencia.
            </p>
            <div style={styles.socialIcons}>
              <a href="https://wa.me/528715353066" target="_blank" rel="noopener noreferrer" className="social-icon" style={styles.socialIcon}>
                <FaWhatsapp size={22} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon" style={styles.socialIcon}>
                <FaInstagram size={22} />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon" style={styles.socialIcon}>
                <FaFacebook size={22} />
              </a>
            </div>
          </div>

          {/* Navegación */}
          <div style={styles.section}>
            <h3 style={styles.title}>Navegación</h3>
            <ul style={styles.links}>
              <li onClick={() => scrollToSection('hero')}>Inicio</li>
              <li onClick={() => scrollToSection('services')}>Servicios</li>
              <li onClick={() => scrollToSection('about')}>Nosotras</li>
              <li onClick={() => scrollToSection('gallery')}>Galería</li>
              <li onClick={() => scrollToSection('opinions')}>Opiniones</li>
              <li onClick={() => scrollToSection('contact')}>Contacto</li>
            </ul>
          </div>

          {/* Contacto */}
          <div style={styles.section}>
            <h3 style={styles.title}>Contacto</h3>
            <ul style={styles.contactInfo}>
              <li>
                <FaMapMarkerAlt size={18} color="#C9A96E" />
                <span>Calle Tolosa 320, Col. Santa Sofía, Gómez Palacio, Durango</span>
              </li>
              <li>
                <FaPhone size={18} color="#2EC4B6" />
                <span>871 535 3066</span>
              </li>
              <li>
                <FaClock size={18} color="#2EC4B6" />
                <span>Horario: Desde las 11:00 a.m.</span>
              </li>
            </ul>
          </div>

          {/* Horario */}
          <div style={styles.section}>
            <h3 style={styles.title}>Horario de Atención</h3>
            <ul style={styles.schedule}>
              <li><span>Lunes a Viernes:</span><span>11:00 - 20:00</span></li>
              <li><span>Sábado:</span><span>11:00 - 18:00</span></li>
              <li><span>Domingo:</span><span>Cerrado</span></li>
            </ul>
          </div>
        </div>

        <div style={styles.bottom}>
          <p>&copy; {currentYear} Karina Nails & Lashes - Todos los derechos reservados</p>
          <p style={styles.developer}>Desarrollado con <span style={{ color: '#C9A96E' }}>💚</span> para Karina</p>
        </div>
      </div>

      {/* WhatsApp Flotante */}
      <a
        href="https://wa.me/528715353066?text=Hola%20Karina,%20quisiera%20agendar%20una%20cita%20para%20u%C3%B1as%20o%20pesta%C3%B1as"
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-float"
        style={styles.whatsapp}
      >
        <FaWhatsapp size={32} color="white" />
      </a>
    </footer>
  )
}

const styles = {
  footer: {
    backgroundColor: '#0F0F10',
    padding: '60px 0 30px',
    borderTop: '1px solid rgba(46, 196, 182, 0.3)',
    position: 'relative'
  },
  container: {
    maxWidth: '1280px',
    margin: '0 auto',
    padding: '0 24px'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '50px',
    marginBottom: '50px'
  },
  section: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px'
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '5px'
  },
  logoText: {
    fontSize: '1.6rem',
    fontFamily: 'Playfair Display, serif',
    color: '#F5F5F5',
    letterSpacing: '2px',
    fontWeight: 600
  },
  description: {
    color: '#A0A0A0',
    lineHeight: '1.7',
    fontSize: '0.9rem'
  },
  socialIcons: {
    display: 'flex',
    gap: '12px',
    marginTop: '10px'
  },
  socialIcon: {
    backgroundColor: '#1A1A1E',
    width: '38px',
    height: '38px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#2EC4B6',
    transition: 'all 0.3s cubic-bezier(0.2, 0.9, 0.4, 1.1)',
    border: '1px solid rgba(46, 196, 182, 0.2)'
  },
  title: {
    fontSize: '1.2rem',
    fontFamily: 'Playfair Display, serif',
    color: '#F5F5F5',
    marginBottom: '5px',
    letterSpacing: '0.5px'
  },
  links: {
    listStyle: 'none',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },
  contactInfo: {
    listStyle: 'none',
    display: 'flex',
    flexDirection: 'column',
    gap: '15px'
  },
  schedule: {
    listStyle: 'none',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },
  bottom: {
    textAlign: 'center',
    paddingTop: '25px',
    borderTop: '1px solid rgba(46, 196, 182, 0.15)',
    color: '#A0A0A0',
    fontSize: '0.8rem'
  },
  developer: {
    marginTop: '10px',
    color: '#2EC4B6',
    fontSize: '0.75rem',
    letterSpacing: '0.5px'
  },
  whatsapp: {
    position: 'fixed',
    bottom: '24px',
    right: '24px',
    background: 'linear-gradient(135deg, #25D366, #128C7E)',
    width: '56px',
    height: '56px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    transition: 'all 0.3s cubic-bezier(0.2, 0.9, 0.4, 1.1)',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)',
    border: 'none'
  }
}

// Hover effects
const hoverStyles = document.createElement('style')
hoverStyles.textContent = `
  footer li {
    cursor: pointer;
    transition: all 0.3s ease;
    color: #A0A0A0;
  }
  
  footer li:hover {
    color: #C9A96E;
    transform: translateX(5px);
  }
  
  .social-icon:hover {
    background: linear-gradient(135deg, #2EC4B6, #C9A96E);
    color: #F5F5F5 !important;
    transform: translateY(-5px);
    border-color: transparent;
    box-shadow: 0 5px 15px rgba(46, 196, 182, 0.3);
  }
  
  .whatsapp-float:hover {
    transform: scale(1.1) rotate(5deg);
    box-shadow: 0 8px 25px rgba(37, 211, 102, 0.4);
  }
  
  @media (max-width: 768px) {
    footer .grid {
      gap: 35px;
    }
    
    footer .whatsapp-float {
      width: 50px;
      height: 50px;
      bottom: 20px;
      right: 20px;
    }
  }
`
document.head.appendChild(hoverStyles)

export default Footer
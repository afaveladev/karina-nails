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
              <GiLipstick size={50} color="#14B8A6" />
              <span style={styles.logoText}>KARINA'S</span>
            </div>
            <p style={styles.description}>
              Belleza que eleva tu estilo. Especialistas en uñas y pestañas con más de 5 años de experiencia.
            </p>
            <div style={styles.socialIcons}>
              <a href="https://wa.me/525000000000" target="_blank" rel="noopener noreferrer" style={styles.socialIcon}>
                <FaWhatsapp size={24} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" style={styles.socialIcon}>
                <FaInstagram size={24} />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" style={styles.socialIcon}>
                <FaFacebook size={24} />
              </a>
            </div>
          </div>

          {/* Navegación */}
          <div style={styles.section}>
            <h3 style={styles.title}>Navegación ✂️</h3>
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
            <h3 style={styles.title}>Contacto 📞</h3>
            <ul style={styles.contactInfo}>
              <li>
                <FaMapMarkerAlt size={18} color="#14B8A6" />
                <span>Calle Tolosa 320, Col. Santa Sofía, Gómez Palacio, Durango</span>
              </li>
              <li>
                <FaPhone size={18} color="#14B8A6" />
                <span>871 535 3066</span>
              </li>
              <li>
                <FaClock size={18} color="#14B8A6" />
                <span>Horario: Desde las 11:00 a.m.</span>
              </li>
            </ul>
          </div>

          {/* Horario */}
          <div style={styles.section}>
            <h3 style={styles.title}>Horario de Atención ⏰</h3>
            <ul style={styles.schedule}>
              <li><span>Lunes a Viernes:</span><span>11:00 - 20:00</span></li>
              <li><span>Sábado:</span><span>11:00 - 18:00</span></li>
              <li><span>Domingo:</span><span>Cerrado</span></li>
            </ul>
          </div>
        </div>

        <div style={styles.bottom}>
          <p>&copy; {currentYear} Karina Nails & Lashes - Todos los derechos reservados</p>
          <p style={styles.developer}>Desarrollado con 💚 para Karina</p>
        </div>
      </div>

      {/* WhatsApp Flotante */}
      <a
        href="https://wa.me/528715353066?text=Hola%20Karina,%20quisiera%20agendar%20una%20cita%20para%20u%C3%B1as%20o%20pesta%C3%B1as"
        target="_blank"
        rel="noopener noreferrer"
        style={styles.whatsapp}
      >
        <FaWhatsapp size={35} color="white" />
      </a>
    </footer>
  )
}

const styles = {
  footer: {
    backgroundColor: '#0a0a0a',
    padding: '60px 0 20px',
    borderTop: '2px solid #14B8A6'
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 20px'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '40px',
    marginBottom: '40px'
  },
  section: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px'
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '10px'
  },
  logoText: {
    fontSize: '1.8rem',
    fontFamily: 'Playfair Display, serif',
    color: 'white',
    letterSpacing: '2px'
  },
  description: {
    color: '#9CA3AF',
    lineHeight: '1.6',
    fontSize: '0.9rem'
  },
  socialIcons: {
    display: 'flex',
    gap: '15px',
    marginTop: '10px'
  },
  socialIcon: {
    backgroundColor: '#222',
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#14B8A6',
    transition: 'all 0.3s ease'
  },
  title: {
    fontSize: '1.2rem',
    fontFamily: 'Playfair Display, serif',
    color: 'white',
    marginBottom: '10px'
  },
  links: {
    listStyle: 'none',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
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
    gap: '10px'
  },
  bottom: {
    textAlign: 'center',
    paddingTop: '20px',
    borderTop: '1px solid #222',
    color: '#9CA3AF',
    fontSize: '0.8rem'
  },
  developer: {
    marginTop: '10px',
    color: '#14B8A6'
  },
  whatsapp: {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    backgroundColor: '#25D366',
    width: '60px',
    height: '60px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 10px rgba(0,0,0,0.3)'
  }
}

// Hover effects
const hoverStyles = document.createElement('style')
hoverStyles.textContent = `
  footer li {
    cursor: pointer;
    transition: color 0.3s ease;
  }
  footer li:hover {
    color: #14B8A6;
  }
  .social-icon:hover {
    background-color: #14B8A6;
    color: white !important;
    transform: translateY(-5px);
  }
  .whatsapp:hover {
    transform: scale(1.1);
    box-shadow: 0 4px 15px rgba(37, 211, 102, 0.4);
  }
`
document.head.appendChild(hoverStyles)

export default Footer
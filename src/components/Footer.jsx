import { FaWhatsapp, FaInstagram, FaFacebook, FaMapMarkerAlt, FaPhone, FaClock } from 'react-icons/fa'
import logo from '../assets/logo.webp'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const scrollToSection = (id) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const scrollToHero = () => {
    const heroSection = document.getElementById('hero')
    if (heroSection) {
      heroSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <footer style={styles.footer}>
      <div className="container" style={styles.container}>
        <div className="footer-grid" style={styles.grid}>
          {/* Logo y descripción */}
          <div style={styles.section}>
            <div className="footer-logo" style={styles.logo} onClick={scrollToHero}>
              <img src={logo} alt="Karina's Nails & Lashes" style={styles.logoImage} />
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
              <li><FaMapMarkerAlt size={18} color="#C9A96E" /><span>Calle Tolosa 320, Col. Santa Sofía, Gómez Palacio, Durango</span></li>
              <li><FaPhone size={18} color="#2EC4B6" /><span>871 535 3066</span></li>
              <li><FaClock size={18} color="#2EC4B6" /><span>Horario: Desde las 11:00 a.m.</span></li>
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

      <a href="https://wa.me/528715353066?text=Hola%20Karina,%20quisiera%20agendar%20una%20cita" target="_blank" rel="noopener noreferrer" className="whatsapp-float" style={styles.whatsapp}>
        <FaWhatsapp size={32} color="white" />
      </a>
    </footer>
  )
}

const styles = {
  footer: { backgroundColor: '#0F0F10', padding: '60px 0 30px', borderTop: '1px solid rgba(46, 196, 182, 0.3)' },
  container: { maxWidth: '1280px', margin: '0 auto', padding: '0 24px' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '50px', marginBottom: '50px' },
  section: { display: 'flex', flexDirection: 'column', gap: '15px' },
  logo: { display: 'flex', alignItems: 'center', cursor: 'pointer', transition: 'all 0.3s ease', marginBottom: '5px' },
  logoImage: { width: 'clamp(45px, 6vw, 60px)', height: 'clamp(45px, 6vw, 60px)', borderRadius: '50%', objectFit: 'cover', border: '2px solid #2EC4B6', transition: 'all 0.3s cubic-bezier(0.2, 0.9, 0.4, 1.1)', boxShadow: '0 0 10px rgba(46, 196, 182, 0.3)' },
  description: { color: '#A0A0A0', lineHeight: '1.7', fontSize: '0.9rem' },
  socialIcons: { display: 'flex', gap: '12px', marginTop: '10px' },
  socialIcon: { backgroundColor: '#1A1A1E', width: '38px', height: '38px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#2EC4B6', transition: 'all 0.3s cubic-bezier(0.2, 0.9, 0.4, 1.1)', border: '1px solid rgba(46, 196, 182, 0.2)' },
  title: { fontSize: 'clamp(1rem, 3vw, 1.2rem)', fontFamily: 'Playfair Display, serif', color: '#F5F5F5', marginBottom: '5px' },
  links: { listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' },
  contactInfo: { listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '15px' },
  schedule: { listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' },
  bottom: { textAlign: 'center', paddingTop: '25px', borderTop: '1px solid rgba(46, 196, 182, 0.15)', color: '#A0A0A0', fontSize: '0.8rem' },
  developer: { marginTop: '10px', color: '#2EC4B6', fontSize: '0.75rem' },
  whatsapp: { position: 'fixed', bottom: '24px', right: '24px', background: 'linear-gradient(135deg, #25D366, #128C7E)', width: 'clamp(45px, 8vw, 56px)', height: 'clamp(45px, 8vw, 56px)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, transition: 'all 0.3s cubic-bezier(0.2, 0.9, 0.4, 1.1)', boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)', animation: 'float 2s ease-in-out infinite' }
}

const hoverStyles = document.createElement('style')
hoverStyles.textContent = `
  @media (max-width: 992px) {
    .footer-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 40px !important; }
  }
  @media (max-width: 768px) {
    .footer-grid { grid-template-columns: 1fr !important; text-align: center !important; gap: 35px !important; }
    .footer-logo { justify-content: center !important; }
    .footer-logo img { width: 50px !important; height: 50px !important; }
    .social-icons { justify-content: center !important; }
    .footer-links { align-items: center !important; }
    .contact-info li { justify-content: center !important; }
    .schedule li { justify-content: center !important; gap: 10px !important; }
    .whatsapp-float { width: 50px !important; height: 50px !important; bottom: 20px !important; right: 20px !important; }
  }
  @media (max-width: 480px) {
    .footer-grid { gap: 30px !important; margin-bottom: 30px !important; }
    .footer-logo img { width: 45px !important; height: 45px !important; }
    .title { font-size: 1rem !important; }
    footer li, .contact-info li, .schedule li { font-size: 0.75rem !important; }
    .social-icon { width: 32px !important; height: 32px !important; }
    .social-icon svg { width: 16px !important; height: 16px !important; }
    .bottom { font-size: 0.7rem !important; }
    .developer { font-size: 0.65rem !important; }
    .whatsapp-float { width: 45px !important; height: 45px !important; bottom: 16px !important; right: 16px !important; }
    .whatsapp-float svg { width: 22px !important; height: 22px !important; }
  }
  footer li { cursor: pointer; transition: all 0.3s ease; color: #A0A0A0; }
  footer li:hover { color: #C9A96E; transform: translateX(5px); }
  .social-icon:hover { background: linear-gradient(135deg, #2EC4B6, #C9A96E); color: #F5F5F5 !important; transform: translateY(-5px); }
  .whatsapp-float:hover { transform: scale(1.1) rotate(5deg); }
  .footer-logo:hover img {
    transform: scale(1.08);
    border-color: #C9A96E;
    box-shadow: 0 0 20px rgba(201, 169, 110, 0.5);
  }
`
document.head.appendChild(hoverStyles)

export default Footer
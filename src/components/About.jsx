import { GiNails, GiEyelashes, GiLipstick } from 'react-icons/gi'
import { FaRegEye } from 'react-icons/fa'
import { FaStar } from 'react-icons/fa6'
import { LuSparkles } from 'react-icons/lu'

const About = () => {
  const features = [
    { icon: <GiNails size={40} />, title: 'Uñas Perfectas', description: 'Acrílico, gel y semipermanente' },
    { icon: <GiEyelashes size={40} />, title: 'Pestañas Espectaculares', description: 'Clásicas y volumen' },
    { icon: <FaRegEye size={40} />, title: 'Cejas Profesionales', description: 'Perfilado y diseño' },
    { icon: <LuSparkles size={40} />, title: 'Productos Premium', description: 'Materiales de alta calidad' },
    { icon: <FaStar size={40} />, title: 'Higiene Garantizada', description: 'Esterilización total' },
    { icon: <GiLipstick size={40} />, title: 'Atención Personalizada', description: 'Trato único y especial' }
  ]

  return (
    <section id="about" style={styles.about}>
      <div className="container" style={styles.container}>
        <div className="about-grid" style={styles.grid}>
          {/* Columna Izquierda - Imagen */}
          <div style={styles.imageCol}>
            <div style={styles.imageWrapper}>
              <div style={styles.placeholderImage}>
                <GiLipstick size={120} color="#2EC4B6" />
                <p style={styles.imageText}>Karina</p>
                <p style={styles.imageSubtext}>Especialista en Uñas & Pestañas</p>
              </div>
            </div>
          </div>

          {/* Columna Derecha - Contenido */}
          <div style={styles.contentCol}>
            <h2 style={styles.title}>Sobre <span style={styles.accent}>Nosotras</span></h2>
            <div className="section-divider" style={{ margin: '0 auto 20px auto' }}></div>
            <p style={styles.description}>
              En <strong style={{ color: '#2EC4B6' }}>Karina Nails & Lashes</strong> nos apasiona realzar tu belleza natural. 
              Con más de 5 años de experiencia, ofrecemos servicios de alta calidad en un ambiente 
              acogedor y profesional.
            </p>
            <p style={styles.description}>
              Utilizamos productos de primeras marcas y seguimos los más altos estándares de 
              higiene para garantizar tu satisfacción y seguridad.
            </p>

            {/* Features Grid */}
            <div className="features-grid" style={styles.featuresGrid}>
              {features.map((feature, index) => (
                <div key={index} className="feature-card" style={styles.featureCard}>
                  <div style={styles.featureIcon}>{feature.icon}</div>
                  <h3 style={styles.featureTitle}>{feature.title}</h3>
                  <p style={styles.featureDescription}>{feature.description}</p>
                </div>
              ))}
            </div>

            <button className="btn-primary glow-effect" onClick={() => {
              const contactSection = document.getElementById('contact')
              if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' })
              }
            }}>
              Agenda tu cita
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

const styles = {
  about: {
    padding: '100px 0',
    backgroundColor: '#0F0F10',
    position: 'relative',
    overflow: 'hidden'
  },
  container: {
    maxWidth: '1280px',
    margin: '0 auto',
    padding: '0 24px'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '60px',
    alignItems: 'center'
  },
  imageCol: {
    display: 'flex',
    justifyContent: 'center'
  },
  imageWrapper: {
    width: '100%',
    maxWidth: '420px',
    borderRadius: '24px',
    overflow: 'hidden',
    border: '2px solid rgba(46, 196, 182, 0.3)',
    transition: 'all 0.4s cubic-bezier(0.2, 0.9, 0.4, 1.1)',
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)'
  },
  placeholderImage: {
    background: 'linear-gradient(135deg, #1A1A1E 0%, #0F0F10 100%)',
    height: '520px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '20px',
    textAlign: 'center',
    transition: 'all 0.4s ease'
  },
  imageText: {
    fontSize: 'clamp(1.5rem, 4vw, 2.2rem)',
    fontFamily: 'Playfair Display, serif',
    color: '#F5F5F5',
    marginTop: '20px',
    letterSpacing: '1px'
  },
  imageSubtext: {
    color: '#C9A96E',
    fontSize: 'clamp(0.8rem, 2vw, 1rem)',
    letterSpacing: '1px',
    fontWeight: 300
  },
  contentCol: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px'
  },
  title: {
    fontSize: 'clamp(2rem, 5vw, 3.2rem)',
    fontFamily: 'Playfair Display, serif',
    marginBottom: '0',
    textAlign: 'left'
  },
  accent: {
    background: 'linear-gradient(135deg, #2EC4B6 0%, #C9A96E 100%)',
    WebkitBackgroundClip: 'text',
    backgroundClip: 'text',
    color: 'transparent'
  },
  description: {
    color: '#A0A0A0',
    lineHeight: '1.7',
    fontSize: 'clamp(0.85rem, 2vw, 1rem)',
    fontWeight: 300
  },
  featuresGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
    gap: '20px',
    margin: '10px 0'
  },
  featureCard: {
    textAlign: 'center',
    padding: '20px 16px',
    backgroundColor: 'rgba(26, 26, 30, 0.6)',
    backdropFilter: 'blur(10px)',
    borderRadius: '16px',
    transition: 'all 0.3s cubic-bezier(0.2, 0.9, 0.4, 1.1)',
    border: '1px solid rgba(46, 196, 182, 0.1)'
  },
  featureIcon: {
    color: '#2EC4B6',
    marginBottom: '12px',
    transition: 'all 0.3s ease'
  },
  featureTitle: {
    fontSize: 'clamp(0.85rem, 2vw, 0.95rem)',
    fontFamily: 'Poppins, sans-serif',
    fontWeight: '600',
    marginBottom: '6px',
    color: '#F5F5F5'
  },
  featureDescription: {
    fontSize: 'clamp(0.7rem, 1.8vw, 0.75rem)',
    color: '#A0A0A0',
    lineHeight: '1.4'
  }
}

// Media queries
const mediaStyles = document.createElement('style')
mediaStyles.textContent = `
  @media (max-width: 992px) {
    .about-grid { gap: 40px !important; }
    .feature-card { padding: 16px 12px !important; }
  }
  @media (max-width: 768px) {
    .about-grid { grid-template-columns: 1fr !important; gap: 40px !important; text-align: center; }
    .about-grid .title { text-align: center !important; }
    .section-divider { margin: 0 auto 20px auto !important; }
    .features-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 15px !important; }
    .image-wrapper { max-width: 300px !important; margin: 0 auto; }
    .placeholder-image { height: 400px !important; }
  }
  @media (max-width: 480px) {
    .features-grid { grid-template-columns: 1fr !important; }
    .feature-card { padding: 12px 10px !important; }
    .image-text { font-size: 1.5rem !important; }
    .image-subtext { font-size: 0.8rem !important; }
  }
  .feature-card:hover {
    transform: translateY(-5px);
    border-color: rgba(46, 196, 182, 0.3);
    box-shadow: 0 10px 25px rgba(46, 196, 182, 0.1);
  }
  .feature-card:hover .feature-icon {
    color: #C9A96E !important;
    transform: scale(1.05);
  }
  .image-wrapper:hover {
    transform: translateY(-5px);
    border-color: #2EC4B6;
    box-shadow: 0 25px 45px rgba(46, 196, 182, 0.15);
  }
`
document.head.appendChild(mediaStyles)

export default About
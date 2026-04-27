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
        <div style={styles.grid}>
          {/* Columna Izquierda - Imagen */}
          <div style={styles.imageCol}>
            <div style={styles.imageWrapper}>
              <div style={styles.placeholderImage}>
                <GiLipstick size={120} color="#14B8A6" />
                <p style={styles.imageText}>Karina</p>
                <p style={styles.imageSubtext}>Especialista en Uñas & Pestañas</p>
              </div>
            </div>
          </div>

          {/* Columna Derecha - Contenido */}
          <div style={styles.contentCol}>
            <h2 style={styles.title}>Sobre <span style={styles.accent}>Nosotras</span></h2>
            <p style={styles.description}>
              En <strong>Karina Nails & Lashes</strong> nos apasiona realzar tu belleza natural. 
              Con más de 5 años de experiencia, ofrecemos servicios de alta calidad en un ambiente 
              acogedor y profesional.
            </p>
            <p style={styles.description}>
              Utilizamos productos de primeras marcas y seguimos los más altos estándares de 
              higiene para garantizar tu satisfacción y seguridad.
            </p>

            {/* Features Grid */}
            <div style={styles.featuresGrid}>
              {features.map((feature, index) => (
                <div key={index} style={styles.featureCard}>
                  <div style={styles.featureIcon}>{feature.icon}</div>
                  <h3 style={styles.featureTitle}>{feature.title}</h3>
                  <p style={styles.featureDescription}>{feature.description}</p>
                </div>
              ))}
            </div>

            <button className="btn-primary" onClick={() => {
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
    padding: '80px 0',
    backgroundColor: '#0a0a0a'
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 20px'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '50px',
    alignItems: 'center'
  },
  imageCol: {
    display: 'flex',
    justifyContent: 'center'
  },
  imageWrapper: {
    width: '100%',
    maxWidth: '400px',
    borderRadius: '20px',
    overflow: 'hidden',
    border: '3px solid #14B8A6'
  },
  placeholderImage: {
    backgroundColor: '#111',
    height: '500px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '15px',
    textAlign: 'center'
  },
  imageText: {
    fontSize: '2rem',
    fontFamily: 'Playfair Display, serif',
    color: 'white',
    marginTop: '20px'
  },
  imageSubtext: {
    color: '#14B8A6',
    fontSize: '1rem'
  },
  contentCol: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  },
  title: {
    fontSize: 'clamp(2rem, 5vw, 3rem)',
    fontFamily: 'Playfair Display, serif',
    marginBottom: '10px'
  },
  accent: {
    color: '#14B8A6'
  },
  description: {
    color: '#9CA3AF',
    lineHeight: '1.6',
    fontSize: '1rem'
  },
  featuresGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
    gap: '20px',
    margin: '20px 0'
  },
  featureCard: {
    textAlign: 'center',
    padding: '20px',
    backgroundColor: '#111',
    borderRadius: '10px',
    transition: 'transform 0.3s ease'
  },
  featureIcon: {
    color: '#14B8A6',
    marginBottom: '10px'
  },
  featureTitle: {
    fontSize: '1rem',
    fontFamily: 'Poppins, sans-serif',
    fontWeight: '600',
    marginBottom: '5px',
    color: 'white'
  },
  featureDescription: {
    fontSize: '0.8rem',
    color: '#9CA3AF'
  }
}

// Media query para responsive
const mediaStyles = document.createElement('style')
mediaStyles.textContent = `
  @media (max-width: 768px) {
    #about .grid {
      grid-template-columns: 1fr !important;
    }
  }
`
document.head.appendChild(mediaStyles)

export default About
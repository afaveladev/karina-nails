import { useState, useEffect } from 'react'
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa'

const Opinions = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [autoplay, setAutoplay] = useState(true)

  const testimonials = [
    { id: 1, name: 'María González', rating: 5, text: 'Excelente servicio, mis uñas quedaron perfectas. Muy profesional y atenta. Sin duda volveré.', avatar: 'https://randomuser.me/api/portraits/women/1.jpg' },
    { id: 2, name: 'Laura Martínez', rating: 5, text: 'Las pestañas me duraron muchísimo tiempo. Super recomendado, calidad y precio excelentes.', avatar: 'https://randomuser.me/api/portraits/women/2.jpg' },
    { id: 3, name: 'Ana Rodríguez', rating: 4.5, text: 'Muy buen trato y atención. El lugar es muy limpio y acogedor. Me encantó el resultado.', avatar: 'https://randomuser.me/api/portraits/women/3.jpg' },
    { id: 4, name: 'Sofía López', rating: 5, text: 'Karina es una artista, mis cejas quedaron perfectas. 100% recomendada.', avatar: 'https://randomuser.me/api/portraits/women/4.jpg' },
    { id: 5, name: 'Valentina Pérez', rating: 5, text: 'El combo uñas + pestañas es lo mejor. Ahorras dinero y quedas espectacular.', avatar: 'https://randomuser.me/api/portraits/women/5.jpg' },
    { id: 6, name: 'Camila Fernández', rating: 4, text: 'Muy buen servicio, solo mejoraría el tiempo de espera. Pero el resultado vale la pena.', avatar: 'https://randomuser.me/api/portraits/women/6.jpg' },
    { id: 7, name: 'Isabella Torres', rating: 5, text: 'Las mejores uñas que me he hecho. Karina es muy detallista.', avatar: 'https://randomuser.me/api/portraits/women/7.jpg' },
    { id: 8, name: 'Lucía Ramírez', rating: 5, text: 'Mi lugar favorito para hacerme pestañas. Siempre salgo feliz.', avatar: 'https://randomuser.me/api/portraits/women/8.jpg' },
    { id: 9, name: 'Emma Castro', rating: 4.5, text: 'Muy profesional y el local está muy bonito. Precios accesibles.', avatar: 'https://randomuser.me/api/portraits/women/9.jpg' },
    { id: 10, name: 'Victoria Morales', rating: 5, text: 'Karina es la mejor! Atención personalizada y resultado increíble.', avatar: 'https://randomuser.me/api/portraits/women/10.jpg' }
  ]

  const renderStars = (rating) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 !== 0
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={i} color="#C9A96E" size={20} />)
    }
    if (hasHalfStar) {
      stars.push(<FaStarHalfAlt key="half" color="#C9A96E" size={20} />)
    }
    const remainingStars = 5 - Math.ceil(rating)
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<FaRegStar key={`empty-${i}`} color="#C9A96E" size={20} />)
    }
    return stars
  }

  useEffect(() => {
    let interval
    if (autoplay) {
      interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length)
      }, 5000)
    }
    return () => clearInterval(interval)
  }, [autoplay, testimonials.length])

  const goToNext = () => {
    setAutoplay(false)
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    setTimeout(() => setAutoplay(true), 10000)
  }

  const goToPrev = () => {
    setAutoplay(false)
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
    setTimeout(() => setAutoplay(true), 10000)
  }

  const goToIndex = (index) => {
    setAutoplay(false)
    setCurrentIndex(index)
    setTimeout(() => setAutoplay(true), 10000)
  }

  return (
    <section id="opinions" style={styles.opinions}>
      <div className="container" style={styles.container}>
        <h2 style={styles.title}>Lo que dicen <span style={styles.accent}>nuestras clientas</span></h2>
        <div className="section-divider"></div>
        <p style={styles.subtitle}>Más de 500 clientas satisfechas</p>

        <div className="testimonials-carousel" style={styles.carouselContainer}>
          <button onClick={goToPrev} className="nav-btn" style={styles.navButton}>❮</button>
          
          <div style={styles.cardContainer}>
            <div className="testimonial-card" style={styles.card}>
              <img src={testimonials[currentIndex].avatar} alt={testimonials[currentIndex].name} style={styles.avatar} />
              <div style={styles.stars}>{renderStars(testimonials[currentIndex].rating)}</div>
              <p style={styles.comment}>"{testimonials[currentIndex].text}"</p>
              <h3 style={styles.customerName}>{testimonials[currentIndex].name}</h3>
            </div>
          </div>

          <button onClick={goToNext} className="nav-btn" style={styles.navButton}>❯</button>
        </div>

        <div className="pagination-dots" style={styles.dots}>
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToIndex(index)}
              style={{
                ...styles.dot,
                backgroundColor: index === currentIndex ? '#2EC4B6' : '#1A1A1E'
              }}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

const styles = {
  opinions: {
    padding: '100px 0',
    backgroundColor: '#0F0F10'
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
  carouselContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '20px',
    flexWrap: 'wrap'
  },
  navButton: {
    background: 'linear-gradient(135deg, #2EC4B6 0%, #20a094 100%)',
    color: '#F5F5F5',
    border: 'none',
    width: 'clamp(40px, 8vw, 50px)',
    height: 'clamp(40px, 8vw, 50px)',
    borderRadius: '50%',
    fontSize: 'clamp(1rem, 3vw, 1.5rem)',
    cursor: 'pointer',
    transition: 'all 0.3s cubic-bezier(0.2, 0.9, 0.4, 1.1)',
    boxShadow: '0 4px 15px rgba(46, 196, 182, 0.2)'
  },
  cardContainer: {
    flex: 1,
    maxWidth: '550px',
    minWidth: '280px'
  },
  card: {
    background: 'rgba(26, 26, 30, 0.6)',
    backdropFilter: 'blur(10px)',
    borderRadius: '24px',
    padding: 'clamp(25px, 5vw, 45px) clamp(20px, 4vw, 35px)',
    textAlign: 'center',
    border: '1px solid rgba(46, 196, 182, 0.2)',
    transition: 'all 0.4s cubic-bezier(0.2, 0.9, 0.4, 1.1)'
  },
  avatar: {
    width: 'clamp(60px, 12vw, 85px)',
    height: 'clamp(60px, 12vw, 85px)',
    borderRadius: '50%',
    objectFit: 'cover',
    marginBottom: '20px',
    border: '3px solid #C9A96E',
    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.2)'
  },
  stars: {
    marginBottom: '20px',
    display: 'flex',
    justifyContent: 'center',
    gap: '6px',
    flexWrap: 'wrap'
  },
  comment: {
    color: '#E0E0E0',
    fontSize: 'clamp(0.85rem, 2.5vw, 1rem)',
    lineHeight: '1.7',
    marginBottom: '20px',
    fontStyle: 'italic',
    fontWeight: 300
  },
  customerName: {
    color: '#F5F5F5',
    fontSize: 'clamp(1rem, 3vw, 1.2rem)',
    fontFamily: 'Playfair Display, serif',
    letterSpacing: '1px'
  },
  dots: {
    display: 'flex',
    justifyContent: 'center',
    gap: 'clamp(8px, 2vw, 12px)',
    marginTop: '40px'
  },
  dot: {
    width: 'clamp(8px, 2vw, 10px)',
    height: 'clamp(8px, 2vw, 10px)',
    borderRadius: '50%',
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  }
}

const hoverStyles = document.createElement('style')
hoverStyles.textContent = `
  @media (max-width: 768px) {
    .testimonials-carousel { gap: 10px !important; }
    .testimonial-card { padding: 25px 20px !important; }
    .pagination-dots { gap: 8px !important; margin-top: 25px !important; }
    .nav-btn { width: 40px !important; height: 40px !important; font-size: 1.2rem !important; }
  }
  @media (max-width: 480px) {
    .testimonial-card { padding: 20px 15px !important; }
    .comment { font-size: 0.85rem !important; }
    .avatar { width: 60px !important; height: 60px !important; }
    .stars { gap: 3px !important; }
    .stars svg { width: 16px !important; height: 16px !important; }
  }
  .testimonial-card:hover {
    transform: translateY(-8px);
    border-color: rgba(46, 196, 182, 0.4);
    box-shadow: 0 20px 40px rgba(46, 196, 182, 0.1);
  }
  .nav-btn:hover {
    transform: scale(1.1);
    box-shadow: 0 8px 25px rgba(46, 196, 182, 0.4);
  }
  .dot:hover {
    transform: scale(1.2);
    background-color: #2EC4B6 !important;
  }
`
document.head.appendChild(hoverStyles)

export default Opinions
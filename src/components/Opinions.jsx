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

  // Renderizar estrellas según rating
  const renderStars = (rating) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 !== 0
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={i} color="#14B8A6" size={20} />)
    }
    if (hasHalfStar) {
      stars.push(<FaStarHalfAlt key="half" color="#14B8A6" size={20} />)
    }
    const remainingStars = 5 - Math.ceil(rating)
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<FaRegStar key={`empty-${i}`} color="#14B8A6" size={20} />)
    }
    return stars
  }

  // Autoplay
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
        <p style={styles.subtitle}>Más de 500 clientas satisfechas</p>

        <div style={styles.carouselContainer}>
          <button onClick={goToPrev} style={styles.navButton}>❮</button>
          
          <div style={styles.cardContainer}>
            <div style={styles.card}>
              <img src={testimonials[currentIndex].avatar} alt={testimonials[currentIndex].name} style={styles.avatar} />
              <div style={styles.stars}>{renderStars(testimonials[currentIndex].rating)}</div>
              <p style={styles.comment}>"{testimonials[currentIndex].text}"</p>
              <h3 style={styles.customerName}>{testimonials[currentIndex].name}</h3>
            </div>
          </div>

          <button onClick={goToNext} style={styles.navButton}>❯</button>
        </div>

        <div style={styles.dots}>
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToIndex(index)}
              style={{
                ...styles.dot,
                backgroundColor: index === currentIndex ? '#14B8A6' : '#333'
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
    padding: '80px 0',
    backgroundColor: '#000000'
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
  carouselContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '20px',
    flexWrap: 'wrap'
  },
  navButton: {
    backgroundColor: '#14B8A6',
    color: 'white',
    border: 'none',
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    fontSize: '1.5rem',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  },
  cardContainer: {
    flex: 1,
    maxWidth: '500px',
    minWidth: '280px'
  },
  card: {
    backgroundColor: '#111',
    borderRadius: '20px',
    padding: '40px',
    textAlign: 'center',
    border: '1px solid #14B8A6'
  },
  avatar: {
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    objectFit: 'cover',
    marginBottom: '20px',
    border: '3px solid #14B8A6'
  },
  stars: {
    marginBottom: '20px',
    display: 'flex',
    justifyContent: 'center',
    gap: '5px'
  },
  comment: {
    color: '#9CA3AF',
    fontSize: '1rem',
    lineHeight: '1.6',
    marginBottom: '20px',
    fontStyle: 'italic'
  },
  customerName: {
    color: 'white',
    fontSize: '1.2rem',
    fontFamily: 'Playfair Display, serif'
  },
  dots: {
    display: 'flex',
    justifyContent: 'center',
    gap: '10px',
    marginTop: '30px'
  },
  dot: {
    width: '12px',
    height: '12px',
    borderRadius: '50%',
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  }
}

export default Opinions
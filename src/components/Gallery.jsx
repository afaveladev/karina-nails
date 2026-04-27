import { useEffect, useRef, useState } from 'react'
import { FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa'

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const scrollContainerRef = useRef(null)

  // Imágenes de muestra (WebP - reemplazar con tus imágenes reales)
  const images = [
    { id: 1, url: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400&h=300&fit=crop', title: 'Uñas Acrílicas' },
    { id: 2, url: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400&h=300&fit=crop', title: 'Uñas de Gel' },
    { id: 3, url: 'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?w=400&h=300&fit=crop', title: 'Pestañas Clásicas' },
    { id: 4, url: 'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?w=400&h=300&fit=crop', title: 'Pestañas Volumen' },
    { id: 5, url: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&h=300&fit=crop', title: 'Cejas Perfectas' },
    { id: 6, url: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&h=300&fit=crop', title: 'Manicura' },
    { id: 7, url: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=300&fit=crop', title: 'Pedicura' },
    { id: 8, url: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=300&fit=crop', title: 'Combo Especial' },
    { id: 9, url: 'https://images.unsplash.com/photo-1610995747043-1a981e2448fa?w=400&h=300&fit=crop', title: 'Diseños Únicos' },
    { id: 10, url: 'https://images.unsplash.com/photo-1610995747043-1a981e2448fa?w=400&h=300&fit=crop', title: 'Efectos Brillantes' },
    { id: 11, url: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&h=300&fit=crop', title: 'Lifting de Pestañas' },
    { id: 12, url: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&h=300&fit=crop', title: 'Tinte de Cejas' }
  ]

  // Scroll automático infinito
  useEffect(() => {
    const container = scrollContainerRef.current
    if (!container) return

    let scrollAmount = 0
    const scrollStep = 1
    const maxScroll = container.scrollWidth - container.clientWidth

    const autoScroll = setInterval(() => {
      if (scrollAmount >= maxScroll) {
        scrollAmount = 0
      } else {
        scrollAmount += scrollStep
      }
      container.scrollTo({ left: scrollAmount, behavior: 'smooth' })
    }, 30)

    return () => clearInterval(autoScroll)
  }, [])

  const openLightbox = (index) => {
    setCurrentIndex(index)
    setSelectedImage(images[index])
  }

  const closeLightbox = () => {
    setSelectedImage(null)
  }

  const nextImage = () => {
    const newIndex = (currentIndex + 1) % images.length
    setCurrentIndex(newIndex)
    setSelectedImage(images[newIndex])
  }

  const prevImage = () => {
    const newIndex = (currentIndex - 1 + images.length) % images.length
    setCurrentIndex(newIndex)
    setSelectedImage(images[newIndex])
  }

  // Cerrar con tecla ESC
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') closeLightbox()
      if (e.key === 'ArrowRight') nextImage()
      if (e.key === 'ArrowLeft') prevImage()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [currentIndex])

  return (
    <section id="gallery" style={styles.gallery}>
      <div className="container" style={styles.container}>
        <h2 style={styles.title}>Nuestra <span style={styles.accent}>Galería</span></h2>
        <div className="section-divider"></div>
        <p style={styles.subtitle}>Mira nuestros trabajos</p>

        <div ref={scrollContainerRef} style={styles.scrollContainer}>
          <div style={styles.galleryGrid}>
            {images.map((image, index) => (
              <div
                key={image.id}
                className="gallery-item"
                onClick={() => openLightbox(index)}
              >
                <img src={image.url} alt={image.title} style={styles.image} />
                <div style={styles.overlay}>
                  <p style={styles.overlayText}>{image.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div style={styles.lightbox} onClick={closeLightbox}>
          <button style={styles.closeBtn} onClick={closeLightbox}>
            <FaTimes size={30} color="#C9A96E" />
          </button>
          <button style={{ ...styles.navBtn, left: '20px' }} onClick={(e) => { e.stopPropagation(); prevImage(); }}>
            <FaChevronLeft size={40} color="#2EC4B6" />
          </button>
          <button style={{ ...styles.navBtn, right: '20px' }} onClick={(e) => { e.stopPropagation(); nextImage(); }}>
            <FaChevronRight size={40} color="#2EC4B6" />
          </button>
          <div style={styles.lightboxContent} onClick={(e) => e.stopPropagation()}>
            <img src={selectedImage.url} alt={selectedImage.title} style={styles.lightboxImage} />
            <p style={styles.lightboxTitle}>{selectedImage.title}</p>
          </div>
        </div>
      )}
    </section>
  )
}

const styles = {
  gallery: {
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
  scrollContainer: {
    overflowX: 'auto',
    scrollBehavior: 'smooth',
    cursor: 'grab',
    borderRadius: '20px'
  },
  galleryGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(12, minmax(300px, 1fr))',
    gap: '24px',
    padding: '10px'
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'transform 0.6s cubic-bezier(0.2, 0.9, 0.4, 1.1)'
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    background: 'linear-gradient(135deg, rgba(46, 196, 182, 0.9), rgba(201, 169, 110, 0.9))',
    padding: '15px',
    transform: 'translateY(100%)',
    transition: 'transform 0.4s cubic-bezier(0.2, 0.9, 0.4, 1.1)'
  },
  overlayText: {
    color: '#F5F5F5',
    textAlign: 'center',
    fontSize: '1rem',
    fontWeight: 500,
    letterSpacing: '0.5px'
  },
  lightbox: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(15, 15, 16, 0.98)',
    zIndex: 2000,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer'
  },
  closeBtn: {
    position: 'absolute',
    top: '20px',
    right: '20px',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    zIndex: 2001,
    transition: 'all 0.3s ease'
  },
  navBtn: {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    background: 'rgba(46, 196, 182, 0.2)',
    border: 'none',
    borderRadius: '50%',
    width: '60px',
    height: '60px',
    cursor: 'pointer',
    zIndex: 2001,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.3s ease',
    backdropFilter: 'blur(10px)'
  },
  lightboxContent: {
    maxWidth: '90%',
    maxHeight: '90%',
    textAlign: 'center'
  },
  lightboxImage: {
    maxWidth: '100%',
    maxHeight: '80vh',
    borderRadius: '20px',
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4)'
  },
  lightboxTitle: {
    color: '#C9A96E',
    marginTop: '20px',
    fontSize: '1.2rem',
    fontFamily: 'Playfair Display, serif',
    letterSpacing: '1px'
  }
}

// Hover effects
const hoverStyles = document.createElement('style')
hoverStyles.textContent = `
  .gallery-item {
    border-radius: 20px;
    overflow: hidden;
    transition: all 0.4s cubic-bezier(0.2, 0.9, 0.4, 1.1);
    cursor: pointer;
  }
  
  .gallery-item:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 35px rgba(46, 196, 182, 0.2);
  }
  
  .gallery-item:hover img {
    transform: scale(1.08);
  }
  
  .gallery-item:hover .overlay {
    transform: translateY(0);
  }
  
  .nav-btn:hover {
    background-color: #2EC4B6 !important;
    transform: translateY(-50%) scale(1.1);
  }
  
  .close-btn:hover {
    transform: rotate(90deg);
  }
`
document.head.appendChild(hoverStyles)

export default Gallery
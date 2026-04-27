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
        <p style={styles.subtitle}>Mira nuestros trabajos</p>

        <div ref={scrollContainerRef} style={styles.scrollContainer}>
          <div style={styles.galleryGrid}>
            {images.map((image, index) => (
              <div
                key={image.id}
                style={styles.galleryItem}
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
            <FaTimes size={30} color="white" />
          </button>
          <button style={{ ...styles.navBtn, left: '20px' }} onClick={(e) => { e.stopPropagation(); prevImage(); }}>
            <FaChevronLeft size={40} color="white" />
          </button>
          <button style={{ ...styles.navBtn, right: '20px' }} onClick={(e) => { e.stopPropagation(); nextImage(); }}>
            <FaChevronRight size={40} color="white" />
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
    padding: '80px 0',
    backgroundColor: '#0a0a0a'
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
  scrollContainer: {
    overflowX: 'auto',
    scrollBehavior: 'smooth',
    cursor: 'grab'
  },
  galleryGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(12, minmax(280px, 1fr))',
    gap: '20px',
    padding: '10px'
  },
  galleryItem: {
    position: 'relative',
    borderRadius: '10px',
    overflow: 'hidden',
    cursor: 'pointer',
    aspectRatio: '4/3'
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'transform 0.3s ease'
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.8)',
    padding: '10px',
    transform: 'translateY(100%)',
    transition: 'transform 0.3s ease'
  },
  overlayText: {
    color: '#14B8A6',
    textAlign: 'center',
    fontSize: '0.9rem'
  },
  lightbox: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.95)',
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
    zIndex: 2001
  },
  navBtn: {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    background: 'rgba(0,0,0,0.5)',
    border: 'none',
    borderRadius: '50%',
    width: '60px',
    height: '60px',
    cursor: 'pointer',
    zIndex: 2001,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  lightboxContent: {
    maxWidth: '90%',
    maxHeight: '90%',
    textAlign: 'center'
  },
  lightboxImage: {
    maxWidth: '100%',
    maxHeight: '80vh',
    borderRadius: '10px'
  },
  lightboxTitle: {
    color: '#14B8A6',
    marginTop: '20px',
    fontSize: '1.2rem'
  }
}

// Hover effects
const hoverStyles = document.createElement('style')
hoverStyles.textContent = `
  #gallery .gallery-item:hover img {
    transform: scale(1.1);
  }
  #gallery .gallery-item:hover .overlay {
    transform: translateY(0);
  }
  #gallery .nav-btn:hover {
    background-color: #14B8A6;
  }
`
document.head.appendChild(hoverStyles)

export default Gallery
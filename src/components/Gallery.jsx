import { useState } from 'react'
import { FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa'

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [activeCategory, setActiveCategory] = useState('todas')

  const categories = ['todas', 'uñas', 'pestañas', 'cejas']

  const images = {
    uñas: [
      { id: 1, url: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400&h=300&fit=crop', title: 'Uñas Acrílicas' },
      { id: 2, url: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400&h=300&fit=crop', title: 'Uñas de Gel' },
      { id: 6, url: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&h=300&fit=crop', title: 'Manicura' }
    ],
    pestañas: [
      { id: 3, url: 'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?w=400&h=300&fit=crop', title: 'Pestañas Clásicas' },
      { id: 4, url: 'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?w=400&h=300&fit=crop', title: 'Pestañas Volumen' },
      { id: 11, url: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&h=300&fit=crop', title: 'Lifting de Pestañas' }
    ],
    cejas: [
      { id: 5, url: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&h=300&fit=crop', title: 'Cejas Perfectas' },
      { id: 12, url: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&h=300&fit=crop', title: 'Tinte de Cejas' }
    ]
  }

  const getAllImages = () => {
    return [...images.uñas, ...images.pestañas, ...images.cejas]
  }

  const getCurrentImages = () => {
    if (activeCategory === 'todas') return getAllImages()
    return images[activeCategory] || []
  }

  const currentImages = getCurrentImages()

  const openLightbox = (index) => {
    setCurrentIndex(index)
    setSelectedImage(currentImages[index])
  }

  const closeLightbox = () => setSelectedImage(null)

  const nextImage = () => {
    const newIndex = (currentIndex + 1) % currentImages.length
    setCurrentIndex(newIndex)
    setSelectedImage(currentImages[newIndex])
  }

  const prevImage = () => {
    const newIndex = (currentIndex - 1 + currentImages.length) % currentImages.length
    setCurrentIndex(newIndex)
    setSelectedImage(currentImages[newIndex])
  }

  return (
    <section id="gallery" style={styles.gallery}>
      <div className="container" style={styles.container}>
        <h2 style={styles.title}>Nuestra <span style={styles.accent}>Galería</span></h2>
        <div className="section-divider"></div>
        <p style={styles.subtitle}>Descubre nuestros trabajos por categoría</p>

        <div className="gallery-categories">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`category-btn ${activeCategory === cat ? 'active' : ''}`}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>

        <div className="gallery-grid-category">
          {currentImages.map((image, index) => (
            <div key={image.id} className="gallery-item" onClick={() => openLightbox(index)}>
              <img src={image.url} alt={image.title} />
              <div className="gallery-overlay">
                <p>{image.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedImage && (
        <div style={styles.lightbox} onClick={closeLightbox}>
          <button style={styles.closeBtn} onClick={closeLightbox}><FaTimes size={30} color="#C9A96E" /></button>
          <button style={{ ...styles.navBtn, left: '20px' }} onClick={(e) => { e.stopPropagation(); prevImage(); }}><FaChevronLeft size={40} color="#2EC4B6" /></button>
          <button style={{ ...styles.navBtn, right: '20px' }} onClick={(e) => { e.stopPropagation(); nextImage(); }}><FaChevronRight size={40} color="#2EC4B6" /></button>
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
  gallery: { padding: '100px 0', backgroundColor: '#0F0F10' },
  container: { maxWidth: '1200px', margin: '0 auto', padding: '0 24px' },
  title: { textAlign: 'center', fontSize: 'clamp(2rem, 5vw, 3.2rem)', fontFamily: 'Playfair Display, serif', marginBottom: '10px', color: '#F5F5F5' },
  accent: { background: 'linear-gradient(135deg, #2EC4B6 0%, #C9A96E 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' },
  subtitle: { textAlign: 'center', color: '#A0A0A0', marginBottom: '40px', fontSize: '1rem' },
  lightbox: { position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(15,15,16,0.98)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' },
  closeBtn: { position: 'absolute', top: '20px', right: '20px', background: 'none', border: 'none', cursor: 'pointer', zIndex: 2001, transition: 'all 0.3s ease' },
  navBtn: { position: 'absolute', top: '50%', transform: 'translateY(-50%)', background: 'rgba(46,196,182,0.2)', border: 'none', borderRadius: '50%', width: 'clamp(45px, 8vw, 60px)', height: 'clamp(45px, 8vw, 60px)', cursor: 'pointer', zIndex: 2001, display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(10px)', transition: 'all 0.3s ease' },
  lightboxContent: { maxWidth: '90%', maxHeight: '90%', textAlign: 'center' },
  lightboxImage: { maxWidth: '100%', maxHeight: '80vh', borderRadius: '20px' },
  lightboxTitle: { color: '#C9A96E', marginTop: '20px', fontSize: 'clamp(0.9rem, 3vw, 1.2rem)' }
}

const responsiveStyles = document.createElement('style')
responsiveStyles.textContent = `
  @media (max-width: 992px) {
    .gallery-grid-category { grid-template-columns: repeat(2, 1fr) !important; gap: 20px !important; }
    .gallery-item img { height: 250px !important; }
  }
  @media (max-width: 768px) {
    .gallery { padding: 70px 0 !important; }
    .gallery-grid-category { grid-template-columns: 1fr !important; gap: 16px !important; }
    .gallery-item img { height: 220px !important; }
    .gallery-categories { gap: 10px !important; margin-bottom: 30px !important; }
    .category-btn { padding: 6px 16px !important; font-size: 12px !important; }
    .nav-btn { width: 45px !important; height: 45px !important; }
    .nav-btn svg { width: 25px !important; height: 25px !important; }
  }
  @media (max-width: 480px) {
    .gallery { padding: 50px 0 !important; }
    .gallery-item img { height: 180px !important; }
    .category-btn { padding: 5px 12px !important; font-size: 10px !important; }
    .lightbox-content { width: 95% !important; }
    .close-btn { top: 10px !important; right: 10px !important; }
    .close-btn svg { width: 25px !important; height: 25px !important; }
    .nav-btn { width: 40px !important; height: 40px !important; }
    .nav-btn svg { width: 20px !important; height: 20px !important; }
    .lightbox-title { font-size: 0.9rem !important; }
  }
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
  .gallery-item:hover .gallery-overlay {
    transform: translateY(0);
  }
`
document.head.appendChild(responsiveStyles)

export default Gallery
import { useState, useEffect } from 'react'
import { FaBars, FaTimes } from 'react-icons/fa'
import logo from '../assets/logo.webp'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [clickCount, setClickCount] = useState(0)
  const [scrolled, setScrolled] = useState(false)
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 })

  const menuItems = [
    { id: 'hero', label: 'Inicio' },
    { id: 'services', label: 'Servicios' },
    { id: 'about', label: 'Nosotras' },
    { id: 'opinions', label: 'Opiniones' },
    { id: 'gallery', label: 'Galería' },
    { id: 'contact', label: 'Contacto' }
  ]

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleMouseEnter = (index, event) => {
    const target = event.currentTarget
    const parent = target.parentElement
    const parentRect = parent.getBoundingClientRect()
    const targetRect = target.getBoundingClientRect()
    
    setIndicatorStyle({
      left: targetRect.left - parentRect.left,
      width: targetRect.width
    })
  }

  const handleMouseLeave = () => {
    setIndicatorStyle({ left: 0, width: 0 })
  }

  // 3 clics en el logo para acceder al admin / redirigir al inicio
  const handleLogoClick = () => {
    const newCount = clickCount + 1
    setClickCount(newCount)
    
    // Redirigir al inicio (scroll suave al hero)
    const heroSection = document.getElementById('hero')
    if (heroSection) {
      heroSection.scrollIntoView({ behavior: 'smooth' })
    }
    
    if (newCount === 3) {
      window.location.href = '/admin'
      setClickCount(0)
    }
    
    setTimeout(() => {
      setClickCount(0)
    }, 3000)
  }

  const scrollToSection = (id) => {
    setIsOpen(false)
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      <nav className={`navbar-glass ${scrolled ? 'scrolled-nav' : ''}`} style={styles.navbar}>
        <div style={styles.container}>
          {/* Logo circular - solo la imagen */}
          <div className="logo-container" style={styles.logo} onClick={handleLogoClick}>
            <img src={logo} alt="Karina's Nails & Lashes" style={styles.logoImage} />
          </div>

          {/* Desktop Magic Menu */}
          <div className="magic-menu-desktop" style={styles.magicContainer} onMouseLeave={handleMouseLeave}>
            <ul style={styles.desktopMenu}>
              {menuItems.map((item, index) => (
                <li
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  onMouseEnter={(e) => handleMouseEnter(index, e)}
                  style={styles.menuItem}
                >
                  {item.label}
                </li>
              ))}
            </ul>
            <div className="magic-indicator" style={{ ...styles.indicator, left: indicatorStyle.left, width: indicatorStyle.width, opacity: indicatorStyle.width > 0 ? 1 : 0 }} />
          </div>

          {/* Mobile Menu Icon */}
          <div className="mobile-menu-icon" style={styles.mobileIcon} onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <FaTimes size={28} color="#2EC4B6" /> : <FaBars size={28} color="#2EC4B6" />}
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`mobile-menu-overlay ${isOpen ? 'open' : ''}`} style={{ ...styles.mobileMenu, ...(isOpen ? styles.mobileMenuOpen : {}) }}>
        <ul style={styles.mobileMenuItems}>
          {menuItems.map((item) => (
            <li key={item.id} style={styles.mobileMenuItem} onClick={() => scrollToSection(item.id)}>
              {item.label}
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

const styles = {
  navbar: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    padding: '15px 0',
    zIndex: 1000,
    transition: 'all 0.4s cubic-bezier(0.2, 0.9, 0.4, 1.1)'
  },
  container: {
    maxWidth: '1280px',
    margin: '0 auto',
    padding: '0 24px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    zIndex: 10
  },
  logoImage: {
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    objectFit: 'cover',
    border: '2px solid #2EC4B6',
    transition: 'all 0.3s cubic-bezier(0.2, 0.9, 0.4, 1.1)',
    boxShadow: '0 0 10px rgba(46, 196, 182, 0.3)'
  },
  magicContainer: {
    position: 'relative',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: '50px',
    padding: '5px',
    backdropFilter: 'blur(5px)'
  },
  desktopMenu: {
    display: 'flex',
    gap: '8px',
    listStyle: 'none',
    position: 'relative',
    margin: 0,
    padding: '0 5px'
  },
  menuItem: {
    color: '#F5F5F5',
    cursor: 'pointer',
    fontSize: '0.9rem',
    fontFamily: 'Poppins, sans-serif',
    transition: 'all 0.3s ease',
    fontWeight: 500,
    letterSpacing: '0.5px',
    padding: '12px 24px',
    borderRadius: '40px',
    position: 'relative',
    zIndex: 2,
    listStyle: 'none',
    whiteSpace: 'nowrap'
  },
  indicator: {
    position: 'absolute',
    bottom: '5px',
    height: 'calc(100% - 10px)',
    backgroundColor: '#2EC4B6',
    borderRadius: '40px',
    transition: 'all 0.3s cubic-bezier(0.2, 0.9, 0.4, 1.1)',
    zIndex: 1,
    boxShadow: '0 0 15px rgba(46, 196, 182, 0.4)'
  },
  mobileIcon: {
    display: 'none',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    zIndex: 10
  },
  mobileMenu: {
    position: 'fixed',
    top: 0,
    right: '-100%',
    width: '70%',
    maxWidth: '320px',
    height: '100vh',
    backgroundColor: '#0F0F10',
    zIndex: 999,
    transition: 'right 0.4s cubic-bezier(0.2, 0.9, 0.4, 1.1)',
    borderLeft: '2px solid #2EC4B6',
    boxShadow: '-5px 0 30px rgba(0, 0, 0, 0.5)'
  },
  mobileMenuOpen: {
    right: 0
  },
  mobileMenuItems: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    gap: '35px',
    listStyle: 'none',
    padding: '0',
    margin: '0'
  },
  mobileMenuItem: {
    color: '#F5F5F5',
    fontSize: '1.3rem',
    fontFamily: 'Playfair Display, serif',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    letterSpacing: '1px',
    padding: '12px 24px',
    borderRadius: '40px',
    width: '100%',
    textAlign: 'center'
  }
}

// Estilos globales
const globalStyles = document.createElement('style')
globalStyles.textContent = `
  @media (min-width: 993px) {
    .magic-menu-desktop { display: block !important; }
    .mobile-menu-icon { display: none !important; }
  }
  
  @media (max-width: 992px) {
    .magic-menu-desktop { display: none !important; }
    .mobile-menu-icon { display: block !important; }
  }
  
  .navbar-glass {
    background: rgba(15, 15, 16, 0.8);
    backdrop-filter: blur(12px);
    border-bottom: 1px solid rgba(46, 196, 182, 0.2);
  }
  
  .scrolled-nav {
    padding: 10px 0 !important;
    background: rgba(15, 15, 16, 0.95) !important;
    border-bottom: 1px solid rgba(46, 196, 182, 0.3) !important;
  }
  
  /* Efecto hover en el logo circular */
  .logo-container:hover .logo-image {
    transform: scale(1.08);
    border-color: #C9A96E;
    box-shadow: 0 0 20px rgba(201, 169, 110, 0.5);
  }
  
  .magic-menu-desktop li:hover { color: #F5F5F5 !important; }
  .mobile-menu-overlay li:hover { color: #2EC4B6 !important; background: rgba(46, 196, 182, 0.1); }
  
  @media (max-width: 768px) {
    .logo-image { width: 40px !important; height: 40px !important; }
    .container { padding: 0 16px !important; }
  }
  
  @media (max-width: 480px) {
    .logo-image { width: 35px !important; height: 35px !important; }
    .mobile-menu-icon svg { width: 24px !important; height: 24px !important; }
  }
`
document.head.appendChild(globalStyles)

export default Navbar 
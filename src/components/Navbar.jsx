import { useState, useEffect } from 'react'
import { FaBars, FaTimes } from 'react-icons/fa'
import { GiLipstick } from 'react-icons/gi'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [clickCount, setClickCount] = useState(0)
  const [scrolled, setScrolled] = useState(false)

  const toggleMenu = () => setIsOpen(!isOpen)

  // Detectar scroll para cambiar estilo
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // 3 clics en el logo para acceder al admin
  const handleLogoClick = () => {
    const newCount = clickCount + 1
    setClickCount(newCount)
    
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
          {/* Logo */}
          <div style={styles.logo} onClick={handleLogoClick}>
            <GiLipstick size={40} color="#2EC4B6" />
            <span style={styles.logoText}>KARINA'S</span>
          </div>

          {/* Desktop Menu */}
          <ul style={styles.desktopMenu}>
            <li style={styles.menuItem} onClick={() => scrollToSection('hero')}>Inicio</li>
            <li style={styles.menuItem} onClick={() => scrollToSection('services')}>Servicios</li>
            <li style={styles.menuItem} onClick={() => scrollToSection('about')}>Nosotras</li>
            <li style={styles.menuItem} onClick={() => scrollToSection('opinions')}>Opiniones</li>
            <li style={styles.menuItem} onClick={() => scrollToSection('gallery')}>Galería</li>
            <li style={styles.menuItem} onClick={() => scrollToSection('contact')}>Contacto</li>
          </ul>

          {/* Mobile Menu Icon */}
          <div style={styles.mobileIcon} onClick={toggleMenu}>
            {isOpen ? <FaTimes size={28} color="#2EC4B6" /> : <FaBars size={28} color="#2EC4B6" />}
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div style={{ ...styles.mobileMenu, ...(isOpen ? styles.mobileMenuOpen : {}) }}>
        <ul style={styles.mobileMenuItems}>
          <li style={styles.mobileMenuItem} onClick={() => scrollToSection('hero')}>Inicio</li>
          <li style={styles.mobileMenuItem} onClick={() => scrollToSection('services')}>Servicios</li>
          <li style={styles.mobileMenuItem} onClick={() => scrollToSection('about')}>Nosotras</li>
          <li style={styles.mobileMenuItem} onClick={() => scrollToSection('opinions')}>Opiniones</li>
          <li style={styles.mobileMenuItem} onClick={() => scrollToSection('gallery')}>Galería</li>
          <li style={styles.mobileMenuItem} onClick={() => scrollToSection('contact')}>Contacto</li>
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
    padding: '20px 0',
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
    gap: '10px',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  },
  logoText: {
    fontSize: '1.5rem',
    fontFamily: 'Playfair Display, serif',
    color: '#F5F5F5',
    letterSpacing: '2px',
    fontWeight: 600
  },
  desktopMenu: {
    display: 'flex',
    gap: '40px',
    listStyle: 'none'
  },
  menuItem: {
    color: '#F5F5F5',
    cursor: 'pointer',
    fontSize: '0.9rem',
    fontFamily: 'Poppins, sans-serif',
    transition: 'all 0.3s ease',
    fontWeight: 500,
    letterSpacing: '0.5px',
    position: 'relative'
  },
  mobileIcon: {
    display: 'none',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
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
    listStyle: 'none'
  },
  mobileMenuItem: {
    color: '#F5F5F5',
    fontSize: '1.3rem',
    fontFamily: 'Playfair Display, serif',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    letterSpacing: '1px'
  }
}

// Media queries y estilos adicionales
const mediaStyles = document.createElement('style')
mediaStyles.textContent = `
  @media (max-width: 768px) {
    ul[style*="desktopMenu"] {
      display: none !important;
    }
    div[style*="mobileIcon"] {
      display: block !important;
    }
  }
  
  /* Efecto vidrio para navbar */
  .navbar-glass {
    background: rgba(15, 15, 16, 0.8);
    backdrop-filter: blur(12px);
    border-bottom: 1px solid rgba(46, 196, 182, 0.2);
  }
  
  /* Navbar cuando hace scroll */
  .scrolled-nav {
    padding: 12px 0 !important;
    background: rgba(15, 15, 16, 0.95) !important;
    border-bottom: 1px solid rgba(46, 196, 182, 0.3) !important;
  }
  
  /* Hover efectos en menú */
  li:hover {
    color: #2EC4B6 !important;
  }
  
  li::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 0;
    height: 2px;
    background: linear-gradient(90deg, #2EC4B6, #C9A96E);
    transition: width 0.3s ease;
  }
  
  li:hover::after {
    width: 100%;
  }
  
  /* Logo hover */
  .logo:hover {
    transform: scale(1.02);
  }
  
  .logo:hover svg {
    color: #C9A96E !important;
  }
`
document.head.appendChild(mediaStyles)

export default Navbar
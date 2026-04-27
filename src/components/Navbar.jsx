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
      <nav style={{ ...styles.navbar, ...(scrolled ? styles.scrolled : {}) }}>
        <div style={styles.container}>
          {/* Logo */}
          <div style={styles.logo} onClick={handleLogoClick}>
            <GiLipstick size={40} color="#14B8A6" />
            <span style={styles.logoText}>KARINA'S</span>
          </div>

          {/* Desktop Menu */}
          <ul style={styles.desktopMenu}>
            <li style={styles.menuItem} onClick={() => scrollToSection('hero')}>Inicio</li>
            <li style={styles.menuItem} onClick={() => scrollToSection('services')}>Servicios</li>
            <li style={styles.menuItem} onClick={() => scrollToSection('about')}>Nosotras</li>
            <li style={styles.menuItem} onClick={() => scrollToSection('gallery')}>Galería</li>
            <li style={styles.menuItem} onClick={() => scrollToSection('contact')}>Contacto</li>
            <li style={styles.menuItem} onClick={() => scrollToSection('opinions')}>Opiniones</li>
            <li style={styles.menuItem} onClick={() => scrollToSection('gallery')}>Galería</li>
            <li style={styles.menuItem} onClick={() => scrollToSection('contact')}>Contacto</li>
          </ul>

          {/* Mobile Menu Icon */}
          <div style={styles.mobileIcon} onClick={toggleMenu}>
            {isOpen ? <FaTimes size={28} color="#14B8A6" /> : <FaBars size={28} color="#14B8A6" />}
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div style={{ ...styles.mobileMenu, ...(isOpen ? styles.mobileMenuOpen : {}) }}>
        <ul style={styles.mobileMenuItems}>
          <li style={styles.mobileMenuItem} onClick={() => scrollToSection('hero')}>Inicio</li>
          <li style={styles.mobileMenuItem} onClick={() => scrollToSection('services')}>Servicios</li>
          <li style={styles.mobileMenuItem} onClick={() => scrollToSection('about')}>Nosotras</li>
          <li style={styles.mobileMenuItem} onClick={() => scrollToSection('gallery')}>Galería</li>
          <li style={styles.mobileMenuItem} onClick={() => scrollToSection('contact')}>Contacto</li>
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
    backgroundColor: 'transparent',
    padding: '20px 0',
    zIndex: 1000,
    transition: 'all 0.3s ease'
  },
  scrolled: {
    backgroundColor: '#000000',
    padding: '10px 0',
    borderBottom: '1px solid #14B8A6'
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    cursor: 'pointer'
  },
  logoText: {
    fontSize: '1.5rem',
    fontFamily: 'Playfair Display, serif',
    color: 'white',
    letterSpacing: '2px'
  },
  desktopMenu: {
    display: 'flex',
    gap: '40px',
    listStyle: 'none'
  },
  menuItem: {
    color: 'white',
    cursor: 'pointer',
    fontSize: '1rem',
    fontFamily: 'Poppins, sans-serif',
    transition: 'color 0.3s ease'
  },
  mobileIcon: {
    display: 'none',
    cursor: 'pointer'
  },
  mobileMenu: {
    position: 'fixed',
    top: 0,
    right: '-100%',
    width: '70%',
    height: '100vh',
    backgroundColor: '#000000',
    zIndex: 999,
    transition: 'right 0.3s ease',
    borderLeft: '2px solid #14B8A6'
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
    gap: '30px',
    listStyle: 'none'
  },
  mobileMenuItem: {
    color: 'white',
    fontSize: '1.5rem',
    fontFamily: 'Playfair Display, serif',
    cursor: 'pointer'
  }
}

// Media queries para responsive
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
`
document.head.appendChild(mediaStyles)

export default Navbar
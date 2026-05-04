import { useState, useEffect, useRef } from 'react'
import { FaBars, FaTimes } from 'react-icons/fa'
import logo from '../assets/logo.webp'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [indicatorStyle, setIndicatorStyle] = useState({
    left: 0,
    width: 0,
    transform: 'scaleX(0.7)'
  })

  const menuRef = useRef(null)

  const menuItems = [
    { id: 'hero', label: 'Inicio' },
    { id: 'services', label: 'Servicios' },
    { id: 'about', label: 'Nosotras' },
    { id: 'results', label: 'Resultados' },
    { id: 'gallery', label: 'Galería' },
    { id: 'contact', label: 'Contacto' },
    { id: 'opinions', label: 'Opiniones' }
  ]

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // 🔥 EFECTO LÍQUIDO
  const handleMouseEnter = (e) => {
    const target = e.currentTarget

    setIndicatorStyle({
      left: target.offsetLeft,
      width: target.offsetWidth,
      transform: 'scaleX(1.08)' // se estira como gel
    })
  }

  const handleMouseLeave = () => {
    setIndicatorStyle({
      left: 0,
      width: 0,
      transform: 'scaleX(0.7)' // se encoge suave
    })
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
      <nav className={`navbar-glass ${scrolled ? 'scrolled-nav' : ''}`}>
        <div className="navbar-container">

          {/* Logo */}
          <div
            className="logo-container"
            onClick={() => scrollToSection('hero')}
          >
            <img src={logo} alt="logo" className="logo-img" />
          </div>

          {/* Desktop menu */}
          <div
            className="magic-menu-desktop"
            onMouseLeave={handleMouseLeave}
          >
            <ul className="nav-menu" ref={menuRef}>
              {menuItems.map((item) => (
                <li
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  onMouseEnter={handleMouseEnter}
                >
                  {item.label}
                </li>
              ))}
            </ul>

            {/* 🔥 INDICADOR PRO */}
            <div
              className="magic-indicator"
              style={{
                left: indicatorStyle.left,
                width: indicatorStyle.width,
                transform: indicatorStyle.transform,
                opacity: indicatorStyle.width ? 1 : 0
              }}
            />
          </div>

          {/* Mobile icon */}
          <div className="menu-icon" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <FaTimes size={26} /> : <FaBars size={26} />}
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <div className={`mobile-menu ${isOpen ? 'open' : ''}`}>
        {menuItems.map((item) => (
          <li key={item.id} onClick={() => scrollToSection(item.id)}>
            {item.label}
          </li>
        ))}
      </div>
    </>
  )
}

export default Navbar
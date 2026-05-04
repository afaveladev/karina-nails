import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { FaWhatsapp, FaInstagram, FaFacebook, FaMapMarkerAlt, FaPhone, FaClock, FaArrowUp, FaHeart } from 'react-icons/fa'
import logo from '../assets/logo.webp'

gsap.registerPlugin(ScrollTrigger)

const Footer = () => {
  const currentYear = new Date().getFullYear()
  const footerRef = useRef(null)
  const sectionRefs = useRef([])
  const socialRefs = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(footerRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 90%",
            toggleActions: "play none none reverse"
          }
        }
      )

      sectionRefs.current.forEach((section, index) => {
        gsap.fromTo(section,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            delay: index * 0.1,
            scrollTrigger: {
              trigger: footerRef.current,
              start: "top 90%",
              toggleActions: "play none none reverse"
            }
          }
        )
      })

      socialRefs.current.forEach((icon, index) => {
        gsap.fromTo(icon,
          { scale: 0, rotation: -180 },
          {
            scale: 1,
            rotation: 0,
            duration: 0.5,
            delay: index * 0.1 + 0.5,
            scrollTrigger: {
              trigger: footerRef.current,
              start: "top 90%",
              toggleActions: "play none none reverse"
            }
          }
        )
      })
    })

    return () => ctx.revert()
  }, [])

  const scrollToSection = (id) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const scrollToHero = () => {
    const heroSection = document.getElementById('hero')
    if (heroSection) {
      heroSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <footer className="footer-premium" ref={footerRef}>
      <div className="footer-top-decoration"></div>
      
      <div className="container">
        <div className="footer-grid-premium">
          
          {/* Logo y descripción */}
          <div className="footer-section" ref={el => sectionRefs.current[0] = el}>
            <div className="footer-logo-premium" onClick={scrollToHero}>
              <img src={logo} alt="Kary Glow & Lashes" />
              <span className="logo-text">Kary Glow & Lashes</span>
            </div>
            <p className="footer-description-premium">
              Belleza que eleva tu estilo. Especialistas en uñas, pestañas y cejas con más de 5 años de experiencia.
            </p>
            <div className="footer-social-premium">
              <a 
                href="https://instagram.com/karinaglows" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="social-icon-premium instagram"
                ref={el => socialRefs.current[0] = el}
              >
                <FaInstagram size={20} />
              </a>
              <a 
                href="https://facebook.com/karinaglows" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="social-icon-premium facebook"
                ref={el => socialRefs.current[1] = el}
              >
                <FaFacebook size={20} />
              </a>
              <a 
                href="https://wa.me/528715353066" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="social-icon-premium whatsapp"
                ref={el => socialRefs.current[2] = el}
              >
                <FaWhatsapp size={20} />
              </a>
            </div>
          </div>

          {/* Navegación */}
          <div className="footer-section" ref={el => sectionRefs.current[1] = el}>
            <h3 className="footer-title-premium">Navegación</h3>
            <ul className="footer-links-premium">
              <li onClick={() => scrollToSection('hero')}>Inicio</li>
              <li onClick={() => scrollToSection('services')}>Servicios</li>
              <li onClick={() => scrollToSection('about')}>Nosotras</li>
              <li onClick={() => scrollToSection('results')}>Resultados</li>
              <li onClick={() => scrollToSection('gallery')}>Galería</li>
              <li onClick={() => scrollToSection('opinions')}>Opiniones</li>
              <li onClick={() => scrollToSection('contact')}>Contacto</li>
            </ul>
          </div>

          {/* Contacto */}
          <div className="footer-section" ref={el => sectionRefs.current[2] = el}>
            <h3 className="footer-title-premium">Contacto</h3>
            <ul className="footer-contact-premium">
              <li>
                <FaMapMarkerAlt className="contact-icon location" />
                <span>Calle Tolosa 320, Col. Santa Sofía, Gómez Palacio, Durango</span>
              </li>
              <li>
                <FaPhone className="contact-icon phone" />
                <span>871 535 3066</span>
              </li>
              <li>
                <FaClock className="contact-icon clock" />
                <span>Desde las 11:00 a.m.</span>
              </li>
            </ul>
          </div>

          {/* Horario */}
          <div className="footer-section" ref={el => sectionRefs.current[3] = el}>
            <h3 className="footer-title-premium">Horario de Atención</h3>
            <ul className="footer-schedule-premium">
              <li><span>Lunes a Viernes:</span><span className="hour-value">11:00 - 20:00</span></li>
              <li><span>Sábado:</span><span className="hour-value">11:00 - 18:00</span></li>
              <li><span>Domingo:</span><span className="hour-value closed">Cerrado</span></li>
            </ul>
            <div className="footer-badge">
              <span>✨ Reserva online 24/7 ✨</span>
            </div>
          </div>
        </div>

        <div className="footer-bottom-premium">
          <p>&copy; {currentYear} Kary Glow & Lashes - Todos los derechos reservados</p>
          <p className="footer-credit-premium">
            Hecho con <FaHeart className="footer-heart" /> para mujeres que aman la belleza
          </p>
        </div>
      </div>

      {/* WhatsApp flotante */}
      <a 
        href="https://wa.me/528715353066?text=Hola%20Karina,%20quisiera%20agendar%20una%20cita" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="whatsapp-float-premium"
      >
        <FaWhatsapp size={28} />
      </a>

      {/* Botón volver arriba */}
      <button className="scroll-top-btn" onClick={scrollToTop}>
        <FaArrowUp size={18} />
      </button>
    </footer>
  )
}

// Mostrar/ocultar botón scroll top
if (typeof window !== 'undefined') {
  window.addEventListener('scroll', () => {
    const scrollBtn = document.querySelector('.scroll-top-btn')
    if (scrollBtn) {
      if (window.scrollY > 300) {
        scrollBtn.classList.add('visible')
      } else {
        scrollBtn.classList.remove('visible')
      }
    }
  })
}

export default Footer
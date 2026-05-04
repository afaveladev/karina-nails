import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { FaQuoteLeft, FaStar, FaChevronLeft, FaChevronRight, FaSpa, FaPause, FaPlay } from "react-icons/fa"

gsap.registerPlugin(ScrollTrigger)

const testimonials = [
  {
    id: 1,
    name: "María Fernández",
    role: "Cliente frecuente",
    avatar: "https://randomuser.me/api/portraits/women/1.jpg",
    text: "El mejor salón de uñas al que he ido. Karina es una artista, mis uñas siempre quedan perfectas.",
    rating: 5,
    date: "Hace 2 semanas"
  },
  {
    id: 2,
    name: "Laura Gutiérrez",
    role: "Amante de las pestañas",
    avatar: "https://randomuser.me/api/portraits/women/2.jpg",
    text: "Las extensiones de pestañas son INCREÍBLES. Me duran más de 3 semanas.",
    rating: 5,
    date: "Hace 1 mes"
  },
  {
    id: 3,
    name: "Camila Russo",
    role: "Clienta premium",
    avatar: "https://randomuser.me/api/portraits/women/3.jpg",
    text: "La calidad, la higiene y la atención son insuperables. Mis cejas nunca estuvieron tan perfectas.",
    rating: 5,
    date: "Hace 3 semanas"
  },
  {
    id: 4,
    name: "Valentina Morales",
    role: "Nueva cliente",
    avatar: "https://randomuser.me/api/portraits/women/4.jpg",
    text: "Mi experiencia fue espectacular. Karina me asesoró perfectamente y el resultado superó mis expectativas.",
    rating: 5,
    date: "Hace 5 días"
  },
  {
    id: 5,
    name: "Sofía Ramírez",
    role: "Cliente VIP",
    avatar: "https://randomuser.me/api/portraits/women/5.jpg",
    text: "Siempre salgo feliz y renovada. La atención es impecable y los precios son justos.",
    rating: 5,
    date: "Hace 1 semana"
  },
  {
    id: 6,
    name: "Daniela López",
    role: "Cliente recurrente",
    avatar: "https://randomuser.me/api/portraits/women/6.jpg",
    text: "Llevo más de un año viniendo y nunca me ha decepcionado. ¡Son los mejores!",
    rating: 5,
    date: "Hace 4 días"
  },
  {
    id: 7,
    name: "Carolina Méndez",
    role: "Amante del nail art",
    avatar: "https://randomuser.me/api/portraits/women/7.jpg",
    text: "Los diseños de uñas son espectaculares. Siempre tengo ideas nuevas para lucir.",
    rating: 5,
    date: "Hace 2 semanas"
  },
  {
    id: 8,
    name: "Andrea Paz",
    role: "Clienta fiel",
    avatar: "https://randomuser.me/api/portraits/women/8.jpg",
    text: "El ambiente es súper relajante y las chicas son muy profesionales. 100% recomendado.",
    rating: 5,
    date: "Hace 3 días"
  }
]

const Opinions = () => {
  const [currentPage, setCurrentPage] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const autoplayRef = useRef(null)
  
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const subtitleRef = useRef(null)
  const iconRef = useRef(null)

  const cardsPerPage = 4
  const totalPages = Math.ceil(testimonials.length / cardsPerPage)
  
  const visibleCards = testimonials.slice(
    currentPage * cardsPerPage,
    (currentPage + 1) * cardsPerPage
  )

  // ==================== AUTOPLAY ====================
  const startAutoplay = () => {
    if (autoplayRef.current) clearInterval(autoplayRef.current)
    autoplayRef.current = setInterval(() => {
      setCurrentPage((prev) => (prev + 1) % totalPages)
    }, 5000)
  }

  const stopAutoplay = () => {
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current)
      autoplayRef.current = null
    }
  }

  useEffect(() => {
    if (isPlaying) {
      startAutoplay()
    }
    return () => stopAutoplay()
  }, [isPlaying, totalPages])

  const nextPage = () => {
    stopAutoplay()
    setIsPlaying(false)
    setCurrentPage((prev) => (prev + 1) % totalPages)
    gsap.fromTo(".testimonial-card-grid",
      { opacity: 0, y: 30, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.1, ease: "back.out(1)" }
    )
  }

  const prevPage = () => {
    stopAutoplay()
    setIsPlaying(false)
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages)
    gsap.fromTo(".testimonial-card-grid",
      { opacity: 0, y: 30, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.1, ease: "back.out(1)" }
    )
  }

  const toggleAutoplay = () => {
    if (isPlaying) {
      stopAutoplay()
      setIsPlaying(false)
    } else {
      startAutoplay()
      setIsPlaying(true)
    }
  }

  // ==================== GSAP ANIMATIONS ====================
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(iconRef.current,
        { scale: 0, rotation: -180, opacity: 0 },
        {
          scale: 1,
          rotation: 0,
          opacity: 1,
          duration: 0.8,
          ease: "back.out(1.2)",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      )

      gsap.fromTo(titleRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      )

      gsap.fromTo(subtitleRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          delay: 0.2,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      )

      gsap.fromTo(".testimonial-card-grid",
        { opacity: 0, y: 30, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.5,
          stagger: 0.1,
          scrollTrigger: {
            trigger: ".testimonials-grid",
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      )
    })

    return () => ctx.revert()
  }, [])

  return (
    <section id="opinions" className="opinions-section" ref={sectionRef}>
      <div className="container">
        <div className="opinions-header">
          <div ref={iconRef} className="opinions-icon">
            <FaSpa size={54} color="#2EC4B6" />
          </div>
          
          <div className="divider-line"></div>
          
          <h2 ref={titleRef} className="opinions-title">
            Lo que dicen nuestras <span className="highlight">clientas</span>
          </h2>
          
          <p ref={subtitleRef} className="opinions-subtitle">
            Opiniones reales de quienes confían en nosotros
          </p>
          
          <div className="divider-line bottom"></div>
        </div>

        <div className="testimonials-grid">
          <div className="testimonials-cards-grid">
            {visibleCards.map((testimonial, idx) => (
              <div key={testimonial.id} className="testimonial-card-grid">
                <div className="card-badge">
                  <FaStar className="badge-star" />
                  {testimonial.rating}.0
                </div>
                <FaQuoteLeft className="quote-icon-grid" />
                <img src={testimonial.avatar} alt={testimonial.name} className="avatar-grid" />
                <div className="stars-grid">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <FaStar key={i} className="star-filled-grid" />
                  ))}
                </div>
                <p className="testimonial-text-grid">"{testimonial.text}"</p>
                <h4 className="customer-name-grid">{testimonial.name}</h4>
                <p className="customer-role-grid">{testimonial.role}</p>
                <span className="testimonial-date-grid">{testimonial.date}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="carousel-controls">
          <button className="nav-btn prev-btn" onClick={prevPage}>
            <FaChevronLeft />
          </button>
          
          <div className="pagination-indicators">
            {[...Array(totalPages)].map((_, idx) => (
              <div 
                key={idx}
                className={`page-indicator ${idx === currentPage ? 'active' : ''}`}
                onClick={() => {
                  stopAutoplay()
                  setIsPlaying(false)
                  setCurrentPage(idx)
                }}
              />
            ))}
          </div>

          <button className="nav-btn next-btn" onClick={nextPage}>
            <FaChevronRight />
          </button>

          <button className="autoplay-btn" onClick={toggleAutoplay}>
            {isPlaying ? <FaPause size={14} /> : <FaPlay size={14} />}
          </button>
        </div>
      </div>
    </section>
  )
}

export default Opinions
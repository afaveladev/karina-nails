import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { GiNails, GiEyelashes, GiLipstick, GiSparkles } from 'react-icons/gi'
import { FaRegEye, FaClock, FaStar } from 'react-icons/fa'
import { FaSpa } from 'react-icons/fa'

gsap.registerPlugin(ScrollTrigger)

const Services = () => {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const subtitleRef = useRef(null)
  const iconRef = useRef(null)
  const cardsRef = useRef([])

  const services = [
    { 
      id: 1, 
      name: 'Uñas Acrílicas', 
      price: '$350', 
      duration: '1.5 hrs', 
      icon: <GiNails size={50} />, 
      description: 'Durabilidad y elegancia para tus manos',
      popular: true
    },
    { 
      id: 2, 
      name: 'Uñas de Gel', 
      price: '$300', 
      duration: '1 hr', 
      icon: <GiSparkles size={50} />, 
      description: 'Brillo natural y resistente',
      popular: false
    },
    { 
      id: 3, 
      name: 'Pestañas Clásicas', 
      price: '$400', 
      duration: '1.5 hrs', 
      icon: <GiEyelashes size={50} />, 
      description: 'Mirada espectacular y natural',
      popular: false
    },
    { 
      id: 4, 
      name: 'Pestañas Volumen', 
      price: '$500', 
      duration: '2 hrs', 
      icon: <FaStar size={50} />, 
      description: 'Volumen impactante para tus ojos',
      popular: true
    },
    { 
      id: 5, 
      name: 'Perfilado de Cejas', 
      price: '$150', 
      duration: '30 min', 
      icon: <FaRegEye size={50} />, 
      description: 'Cejas perfectas y definidas',
      popular: false
    },
    { 
      id: 6, 
      name: 'Combo Uñas + Pestañas', 
      price: '$700', 
      duration: '3 hrs', 
      icon: <GiLipstick size={50} />, 
      description: 'Precio especial en paquete completo',
      popular: true
    }
  ]

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

      cardsRef.current.forEach((card, index) => {
        gsap.fromTo(card,
          { opacity: 0, y: 50, scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            delay: index * 0.1,
            ease: "back.out(1)",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none reverse"
            }
          }
        )

        card.addEventListener('mouseenter', () => {
          gsap.to(card, {
            y: -10,
            scale: 1.02,
            duration: 0.3,
            ease: "power2.out",
            boxShadow: "0 20px 40px rgba(0,0,0,0.3), 0 0 20px rgba(46,196,182,0.2)"
          })
          
          const iconDiv = card.querySelector('.service-icon-animated')
          if (iconDiv) {
            gsap.to(iconDiv, {
              scale: 1.1,
              background: "linear-gradient(135deg, #2EC4B6, #D8A7B9)",
              duration: 0.3,
              ease: "power2.out"
            })
          }
        })
        
        card.addEventListener('mouseleave', () => {
          gsap.to(card, {
            y: 0,
            scale: 1,
            duration: 0.3,
            ease: "power2.out",
            boxShadow: "0 10px 30px rgba(0,0,0,0.2)"
          })
          
          const iconDiv = card.querySelector('.service-icon-animated')
          if (iconDiv) {
            gsap.to(iconDiv, {
              scale: 1,
              background: "rgba(46,196,182,0.1)",
              duration: 0.3,
              ease: "power2.out"
            })
          }
        })
      })
    })

    return () => ctx.revert()
  }, [])

  // ✅ HANDLE SERVICE CLICK: Guarda servicio y redirige a Contacto
  const handleServiceClick = (service) => {
    localStorage.setItem('selectedService', JSON.stringify({
      id: service.id,
      name: service.name,
      price: service.price,
      duration: service.duration
    }))

    console.log("✅ Servicio guardado en localStorage:", service.name)

    // 🔥 FIX IMPORTANTE
    window.dispatchEvent(new Event('serviceSelected'))

    gsap.to(".service-card-premium", {
      scale: 0.98,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
      onComplete: () => {
        const contactSection = document.getElementById('contact')
        if (contactSection) {
          contactSection.scrollIntoView({ behavior: 'smooth' })
        }
      }
    })
  }

  return (
    <section id="services" className="services-premium" ref={sectionRef}>
      <div className="container">
        {/* Header con ícono estilo Hero */}
        <div className="services-header">
          <div ref={iconRef} className="services-icon">
            <FaSpa size={54} color="#2EC4B6" />
          </div>
          
          <div className="divider-line"></div>
          
          <h2 ref={titleRef} className="services-title">
            Nuestros <span className="highlight">Servicios</span>
          </h2>
          
          <p ref={subtitleRef} className="services-subtitle">
            Elige el servicio que más te guste
          </p>
          
          <div className="divider-line bottom"></div>
        </div>

        {/* Grid de servicios */}
        <div className="services-grid-premium">
          {services.map((service, index) => (
            <div
              key={service.id}
              className="service-card-premium"
              ref={el => cardsRef.current[index] = el}
              onClick={() => handleServiceClick(service)}  // ✅ Click en toda la card
              style={{ cursor: 'pointer' }}
            >
              {service.popular && (
                <div className="popular-badge">
                  <FaStar size={12} />
                  <span>Más Popular</span>
                </div>
              )}
              
              <div className="service-icon-animated">
                {service.icon}
              </div>
              
              <h3 className="service-name">{service.name}</h3>
              <p className="service-description">{service.description}</p>
              
              <div className="service-divider"></div>
              
              <div className="service-footer">
                <span className="service-price">{service.price}</span>
                <span className="service-duration">
                  <FaClock size={12} />
                  {service.duration}
                </span>
              </div>
              
              {/* 👇 Botón pequeño opcional (opcional, puedes quitarlo si no quieres) */}
              <button className="select-service-btn">
                Seleccionar <span className="arrow">→</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .services-premium {
          padding: 100px 0;
          background: linear-gradient(135deg, #0A0A0F, #0F0F10);
          position: relative;
          min-height: 100vh;
        }
        
        .services-header {
          text-align: center;
          margin-bottom: 60px;
          position: relative;
        }
        
        .services-icon {
          margin-bottom: 20px;
          display: inline-block;
          filter: drop-shadow(0 0 15px rgba(46,196,182,0.4));
          animation: bounceSoft 2s infinite;
        }
        
        @keyframes bounceSoft {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
        
        .divider-line {
          width: 70px;
          height: 2px;
          background: linear-gradient(90deg, #2EC4B6, #C9A96E, #D8A7B9);
          margin: 0 auto 20px;
          border-radius: 2px;
        }
        
        .divider-line.bottom {
          margin-top: 20px;
          margin-bottom: 0;
        }
        
        .services-title {
          font-size: clamp(2rem, 5vw, 3.2rem);
          font-family: 'Playfair Display', serif;
          font-weight: 600;
          margin-bottom: 16px;
          background: linear-gradient(135deg, #F5F5F5 0%, #f0d3dc 50%, #e2c28b 100%);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }
        
        .services-title .highlight {
          background: linear-gradient(135deg, #2EC4B6, #C9A96E, #D8A7B9);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }
        
        .services-subtitle {
          font-size: clamp(0.9rem, 3vw, 1rem);
          color: #C9A96E;
          letter-spacing: 2px;
          text-transform: uppercase;
          margin-top: 10px;
        }
        
        .services-grid-premium {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 30px;
        }
        
        .service-card-premium {
          background: rgba(26, 26, 30, 0.75);
          backdrop-filter: blur(12px);
          border-radius: 28px;
          padding: 30px 25px;
          text-align: center;
          border: 1px solid rgba(46,196,182,0.15);
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }
        
        .service-card-premium::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(46,196,182,0.05), transparent);
          transition: left 0.5s ease;
        }
        
        .service-card-premium:hover::before {
          left: 100%;
        }
        
        .popular-badge {
          position: absolute;
          top: 15px;
          right: 15px;
          background: linear-gradient(135deg, #C9A96E, #D8A7B9);
          padding: 5px 12px;
          border-radius: 20px;
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.7rem;
          font-weight: 600;
          color: #0F0F10;
        }
        
        .service-icon-animated {
          width: 80px;
          height: 80px;
          background: rgba(46,196,182,0.1);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 25px;
          transition: all 0.3s ease;
          color: #2EC4B6;
        }
        
        .service-name {
          font-size: 1.4rem;
          font-family: 'Playfair Display', serif;
          margin-bottom: 12px;
          color: #F5F5F5;
        }
        
        .service-description {
          color: #A0A0A0;
          font-size: 0.85rem;
          line-height: 1.6;
          margin-bottom: 20px;
        }
        
        .service-divider {
          width: 50px;
          height: 1px;
          background: linear-gradient(90deg, transparent, #2EC4B6, #C9A96E, transparent);
          margin: 15px auto;
        }
        
        .service-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin: 20px 0;
          padding: 0 10px;
        }
        
        .service-price {
          font-size: 1.6rem;
          font-weight: bold;
          background: linear-gradient(135deg, #2EC4B6, #C9A96E);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          font-family: 'Playfair Display', serif;
        }
        
        .service-duration {
          display: flex;
          align-items: center;
          gap: 6px;
          color: #C9A96E;
          font-size: 0.85rem;
          background: rgba(201,169,110,0.1);
          padding: 5px 12px;
          border-radius: 20px;
        }
        
        .select-service-btn {
          width: 100%;
          padding: 10px;
          margin-top: 10px;
          background: transparent;
          border: 1px solid rgba(46,196,182,0.3);
          border-radius: 30px;
          color: #2EC4B6;
          font-size: 0.8rem;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }
        
        .select-service-btn:hover {
          background: rgba(46,196,182,0.2);
          border-color: #2EC4B6;
        }
        
        .select-service-btn .arrow {
          transition: transform 0.3s ease;
        }
        
        .select-service-btn:hover .arrow {
          transform: translateX(5px);
        }
        
        @media (max-width: 768px) {
          .services-premium {
            padding: 70px 0;
          }
          
          .services-grid-premium {
            grid-template-columns: 1fr;
            gap: 25px;
          }
          
          .service-card-premium {
            padding: 25px 20px;
          }
          
          .service-icon-animated {
            width: 65px;
            height: 65px;
          }
          
          .service-name {
            font-size: 1.2rem;
          }
          
          .service-price {
            font-size: 1.3rem;
          }
        }
      `}</style>
    </section>
  )
}

export default Services
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { GiLipstick } from 'react-icons/gi'
import { FaStar, FaGem } from 'react-icons/fa'

const Hero = () => {
  const titleRef = useRef(null)
  const subtitleRef = useRef(null)
  const iconRef = useRef(null)
  const badgeRef = useRef(null)
  const descriptionRef = useRef(null)
  const buttonRef = useRef(null)
  const containerRef = useRef(null)
  const glowOrb1Ref = useRef(null)
  const glowOrb2Ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Orbes flotantes
      gsap.to(glowOrb1Ref.current, {
        x: 40, y: -30, duration: 8, repeat: -1, yoyo: true, ease: "sine.inOut"
      })
      gsap.to(glowOrb2Ref.current, {
        x: -35, y: 40, duration: 10, repeat: -1, yoyo: true, ease: "sine.inOut"
      })

      // Badge
      gsap.from(badgeRef.current, {
        y: -50, opacity: 0, duration: 1, delay: 0.2, ease: "back.out(1.2)"
      })

      // Ícono
      gsap.from(iconRef.current, {
        scale: 0, rotation: -180, duration: 1, ease: "back.out(1.5)"
      })
      gsap.to(iconRef.current, {
        rotation: 360, duration: 12, repeat: -1, ease: "none", delay: 1
      })
      gsap.to(iconRef.current, {
        scale: 1.08, duration: 1.5, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 1.5
      })

      // Título letra por letra
      const title = titleRef.current
      const titleText = title.innerText
      title.innerHTML = ''
      titleText.split('').forEach((char, i) => {
        const span = document.createElement('span')
        span.innerText = char === ' ' ? '\u00A0' : char
        span.style.opacity = '0'
        span.style.display = 'inline-block'
        span.style.transform = 'translateY(30px)'
        title.appendChild(span)
        gsap.to(span, {
          opacity: 1, y: 0, duration: 0.3, delay: i * 0.03 + 0.5, ease: "back.out(1)"
        })
      })

      // Subtítulo
      const subtitle = subtitleRef.current
      const subtitleText = subtitle.innerText
      subtitle.innerHTML = ''
      subtitleText.split('').forEach((char, i) => {
        const span = document.createElement('span')
        span.innerText = char === ' ' ? '\u00A0' : char
        span.style.opacity = '0'
        span.style.display = 'inline-block'
        span.style.transform = 'scale(0) rotateY(90deg)'
        subtitle.appendChild(span)
        gsap.to(span, {
          opacity: 1, scale: 1, rotateY: 0, duration: 0.25, delay: i * 0.025 + 1.2, ease: "elastic.out(1, 0.5)"
        })
      })

      // Descripción
      gsap.from(descriptionRef.current, {
        opacity: 0, y: 20, duration: 0.8, delay: 1.9, ease: "power2.out"
      })

      // Botón
      gsap.from(buttonRef.current, {
        scale: 0, opacity: 0, duration: 0.8, delay: 2.1, ease: "back.out(1.5)"
      })

      // Efecto 3D mouse
      if (containerRef.current) {
        containerRef.current.addEventListener('mousemove', (e) => {
          const rect = containerRef.current.getBoundingClientRect()
          const x = (e.clientX - rect.left) / rect.width - 0.5
          const y = (e.clientY - rect.top) / rect.height - 0.5
          gsap.to(containerRef.current, {
            rotationY: x * 5, rotationX: y * 5, duration: 0.5, ease: "power2.out"
          })
        })
        containerRef.current.addEventListener('mouseleave', () => {
          gsap.to(containerRef.current, {
            rotationY: 0, rotationX: 0, duration: 0.8, ease: "elastic.out(1, 0.5)"
          })
        })
      }
    })

    return () => ctx.revert()
  }, [])

  const handleBookAppointment = () => {
    const contactSection = document.getElementById('contact')
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="hero">
      <div className="hero-bg-decoration">
        <div ref={glowOrb1Ref} className="hero-glow-orb-1"></div>
        <div ref={glowOrb2Ref} className="hero-glow-orb-2"></div>
      </div>

      <div ref={containerRef} style={{ position: 'relative', zIndex: 2, maxWidth: '900px', margin: '0 auto', padding: '20px', transformStyle: 'preserve-3d' }}>
        <div ref={iconRef} style={{ marginBottom: '25px', display: 'inline-block' }}>
          <GiLipstick size={90} color="#2EC4B6" />
        </div>

        <div ref={badgeRef} className="hero-studio-badge">
          <FaStar style={{ fontSize: '12px', marginRight: '5px' }} />
          ✦ STUDIO PREMIUM DE BELLEZA
          <FaGem style={{ fontSize: '10px', marginLeft: '5px' }} />
        </div>

        <h1 ref={titleRef} className="hero-title">Karina Nails</h1>
        <h2 ref={subtitleRef} className="hero-subtitle">& Lashes</h2>
        <div className="section-divider"></div>
        <p ref={descriptionRef} className="hero-description">Belleza que eleva tu estilo</p>

        <button ref={buttonRef} className="btn-primary" onClick={handleBookAppointment}>
          ✨ Agendar Cita ✨
        </button>

        <div className="hero-scroll-indicator">
          <div className="scroll-wheel">
            <div className="scroll-dot"></div>
          </div>
          <p>Scroll</p>
        </div>
      </div>
    </section>
  )
}

export default Hero
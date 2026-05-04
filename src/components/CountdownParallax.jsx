import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import CountdownTimer from "./CountdownTimer"
import logo from "../assets/Logo.webp"

gsap.registerPlugin(ScrollTrigger)

export default function CountdownParallax({ targetDate }) {
  const sectionRef = useRef(null)
  const logoRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {

      gsap.to(logoRef.current, {
        y: "12%", // más sutil
        scale: 1.05, // efecto premium
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current, // ✅ FIX
          start: "top bottom",
          end: "bottom top",
          scrub: 0.8, // más suave que true
        }
      })

    }, sectionRef) // ✅ scope React-safe

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="countdown-parallax">

      {/* LOGO PARALLAX */}
      <div ref={logoRef} className="parallax-logo">
        <img src={logo} alt="Kary Glow & Lashes" />
      </div>

      {/* CONTENIDO */}
      <div className="countdown-wrapper">
        <CountdownTimer 
          targetDate={targetDate}
          title="🔥 Promoción de lanzamiento"
          promoText="✨ 15% OFF en todos los combos ✨"
        />
      </div>

    </section>
  )
}
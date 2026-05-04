import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { FaSpa, FaArrowRight, FaInstagram, FaWhatsapp } from "react-icons/fa";
import LugarImg from "../assets/Lugar.webp";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Hero() {
  const heroRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.from(".hero-badge-wrapper", { y: 20, opacity: 0, duration: 0.6 })
      .from(".hero-title", { y: 40, opacity: 0, duration: 0.8 }, "-=0.3")
      .from(".hero-subtitle", { y: 30, opacity: 0, duration: 0.7 }, "-=0.4")
      .from(".hero-description", { y: 20, opacity: 0, duration: 0.6 }, "-=0.4")
      .from(".hero-actions", { y: 20, opacity: 0, duration: 0.6 }, "-=0.3")
      .from(".hero-social", { opacity: 0, y: 10, duration: 0.5 }, "-=0.2");

    gsap.to(".hero-container", {
      y: -20,
      scrollTrigger: {
        trigger: "#hero",
        start: "top top",
        end: "bottom top",
        scrub: 0.8,
      },
    });
  }, { scope: heroRef });

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Número de WhatsApp correctamente formateado
  const whatsappNumber = "5218713328236"; // Formato internacional sin +
  const whatsappMessage = "Hola%20Karina%2C%20quisiera%20agendar%20una%20cita";
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  return (
    <section id="hero" ref={heroRef}>
      {/* Imagen de fondo */}
      <img src={LugarImg} alt="Background" className="hero-bg" />

      {/* Overlay */}
      <div className="hero-overlay"></div>

      {/* Contenido */}
      <div className="hero-container">
        {/* Badge + icono */}
        <div className="hero-badge-wrapper">
          <div className="hero-icon-badge">
            <FaSpa size={34} color="#2EC4B6" />
          </div>

          <div className="hero-studio-badge">
            VIVE BRILLANDO POR TI
          </div>
        </div>

        {/* Títulos */}
        <h1 className="hero-title">Kary</h1>
        <h2 className="hero-subtitle">Glow & Lashes</h2>

        {/* Descripción */}
        <p className="hero-description">
          Una experiencia de belleza premium, con acabados impecables
          y un ambiente diseñado para consentirte.
        </p>

        {/* Botón */}
        <div className="hero-actions">
          <button className="btn-primary" onClick={scrollToContact}>
            Reservar ahora <FaArrowRight />
          </button>
        </div>

        {/* Redes Sociales */}
        <div className="hero-social">
          <a 
            href="https://instagram.com/karinaglows" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="hero-social-icon instagram"
            aria-label="Instagram"
          >
            <FaInstagram size={22} />
          </a>

          <a 
            href={whatsappLink}
            target="_blank" 
            rel="noopener noreferrer" 
            className="hero-social-icon whatsapp"
            aria-label="WhatsApp"
          >
            <FaWhatsapp size={22} />
          </a>
        </div>
      </div>
    </section>
  );
}
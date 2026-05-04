import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { FaPlay, FaPause } from "react-icons/fa"
import { FaSpa } from "react-icons/fa"

gsap.registerPlugin(ScrollTrigger)

const videos = [
  { id: 1, src: "./video1.mp4", title: "Manicura Premium" },
  { id: 2, src: "./video2.mp4", title: "Diseño de uñas" },
  { id: 3, src: "./video3.mp4", title: "Pestañas Volume" },
  { id: 4, src: "./video4.mp4", title: "Cejas Perfectas" },
  { id: 5, src: "./video5.mp4", title: "Nail Art" },
  { id: 6, src: "./video6.mp4", title: "Transformación" },
]

const Results = () => {
  const [playingVideo, setPlayingVideo] = useState(null)
  const [progress, setProgress] = useState({})
  
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const subtitleRef = useRef(null)
  const iconRef = useRef(null)
  const containerRef = useRef(null)
  const videoRefs = useRef([])
  const progressInterval = useRef({})

  // ==================== GSAP ANIMATIONS ====================
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animación del ícono
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

      // Animación del título
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

      // Animación del subtítulo
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

      // Animación de los reels
      gsap.fromTo(".reel-card",
        { opacity: 0, scale: 0.9, y: 30 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      )
    })

    return () => ctx.revert()
  }, [])

  // ==================== VIDEO OBSERVER ====================
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target
          const index = videoRefs.current.findIndex(ref => ref === video)

          if (entry.isIntersecting) {
            video.play().catch(() => {})
            setPlayingVideo(index)
            
            if (progressInterval.current[index]) {
              clearInterval(progressInterval.current[index])
            }
            
            progressInterval.current[index] = setInterval(() => {
              if (video && !video.paused && video.duration) {
                const currentProgress = (video.currentTime / video.duration) * 100
                setProgress(prev => ({ ...prev, [index]: currentProgress }))
                
                if (currentProgress >= 100) {
                  clearInterval(progressInterval.current[index])
                  setProgress(prev => ({ ...prev, [index]: 0 }))
                }
              }
            }, 100)
          } else {
            video.pause()
            if (progressInterval.current[index]) {
              clearInterval(progressInterval.current[index])
            }
          }
        })
      },
      { threshold: 0.6 }
    )

    videoRefs.current.forEach((video) => {
      if (video) observer.observe(video)
    })

    return () => {
      observer.disconnect()
      Object.values(progressInterval.current).forEach(clearInterval)
    }
  }, [])

  // ==================== TOGGLE PLAY/PAUSE ====================
  const handleTogglePlay = (video, index) => {
    if (video.paused) {
      video.play()
      setPlayingVideo(index)
      
      progressInterval.current[index] = setInterval(() => {
        if (video && !video.paused && video.duration) {
          const currentProgress = (video.currentTime / video.duration) * 100
          setProgress(prev => ({ ...prev, [index]: currentProgress }))
        }
      }, 100)
    } else {
      video.pause()
      setPlayingVideo(null)
      if (progressInterval.current[index]) {
        clearInterval(progressInterval.current[index])
      }
    }
  }

  return (
    <section id="results" className="results-section" ref={sectionRef}>
      <div className="container">
        {/* HEADER CON ÍCONO ESTILO HERO */}
        <div className="results-header">
          <div ref={iconRef} className="results-icon">
            <FaSpa size={54} color="#2EC4B6" />
          </div>
          
          <div className="divider-line"></div>
          
          <h2 ref={titleRef} className="results-title">
            Mira nuestros <span className="highlight">resultados</span>
          </h2>
          
          <p ref={subtitleRef} className="results-subtitle">
            Trabajos reales de nuestras clientas
          </p>
          
          <div className="divider-line bottom"></div>
        </div>

        <div className="reels-container" ref={containerRef}>
          {videos.map((video, index) => (
            <div className="reel-card" key={video.id}>
              <video
                ref={(el) => (videoRefs.current[index] = el)}
                src={video.src}
                className="reel-video"
                loop={false}
                muted
                playsInline
                onClick={(e) => handleTogglePlay(e.target, index)}
              />
              
              {/* Progress Bar */}
              <div className="reel-progress-bar">
                <div 
                  className="reel-progress-fill" 
                  style={{ width: `${progress[index] || 0}%` }}
                />
              </div>

              <div className="reel-overlay">
                <button 
                  className="play-btn"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleTogglePlay(videoRefs.current[index], index)
                  }}
                >
                  {playingVideo === index ? <FaPause /> : <FaPlay />}
                </button>
                <span className="reel-title">{video.title}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Results
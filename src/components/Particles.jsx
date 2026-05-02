import { useEffect, useRef } from 'react'

const Particles = () => {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animationId
    let particles = []

    // Colores de tu paleta
    const COLORS = [
      'rgba(46,196,182,',   // turquesa
      'rgba(201,169,110,',  // dorado
      'rgba(216,167,185,',  // rosa
      'rgba(245,245,245,'   // blanco cálido
    ]
    const PARTICLE_COUNT = 80 // Más partículas = más efecto

    class StarParticle {
      constructor() {
        this.x = Math.random() * window.innerWidth
        this.y = Math.random() * window.innerHeight
        this.size = Math.random() * 3.5 + 1
        this.speedX = (Math.random() - 0.5) * 0.25
        this.speedY = (Math.random() - 0.5) * 0.25
        this.color = COLORS[Math.floor(Math.random() * COLORS.length)]
        this.opacity = Math.random() * 0.5 + 0.2
        this.baseOpacity = this.opacity
        this.rotation = Math.random() * Math.PI * 2
        this.rotationSpeed = (Math.random() - 0.5) * 0.02
        this.pulseDir = Math.random() > 0.5 ? 1 : -1
        this.pulseSpeed = Math.random() * 0.01 + 0.003
      }

      draw() {
        ctx.save()
        ctx.translate(this.x, this.y)
        ctx.rotate(this.rotation)
        ctx.globalAlpha = this.opacity
        ctx.fillStyle = this.color + this.opacity.toFixed(2) + ')'
        
        // Estrella de 5 puntas
        const spikes = 5
        const outerRadius = this.size
        const innerRadius = this.size * 0.4
        ctx.beginPath()
        for (let i = 0; i < spikes * 2; i++) {
          const radius = i % 2 === 0 ? outerRadius : innerRadius
          const angle = (Math.PI * 2 * i) / (spikes * 2) - Math.PI / 2
          const x = Math.cos(angle) * radius
          const y = Math.sin(angle) * radius
          if (i === 0) ctx.moveTo(x, y)
          else ctx.lineTo(x, y)
        }
        ctx.closePath()
        ctx.fill()
        ctx.restore()
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY
        this.rotation += this.rotationSpeed
        
        // Efecto de pulso suave
        this.opacity += this.pulseSpeed * this.pulseDir
        if (this.opacity > this.baseOpacity + 0.2) this.pulseDir = -1
        if (this.opacity < this.baseOpacity - 0.1) this.pulseDir = 1
        
        // Rebote en bordes
        if (this.x < 0 || this.x > window.innerWidth) this.speedX *= -1
        if (this.y < 0 || this.y > window.innerHeight) this.speedY *= -1
        this.x = Math.max(0, Math.min(window.innerWidth, this.x))
        this.y = Math.max(0, Math.min(window.innerHeight, this.y))
      }
    }

    function init() {
      particles = []
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push(new StarParticle())
      }
    }

    function animate() {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
      particles.forEach(particle => {
        particle.update()
        particle.draw()
      })
      animationId = requestAnimationFrame(animate)
    }

    function resizeCanvas() {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      init()
    }

    resizeCanvas()
    animate()
    window.addEventListener('resize', resizeCanvas)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resizeCanvas)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0
      }}
    />
  )
}

export default Particles
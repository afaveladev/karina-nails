import { useState, useEffect } from 'react'
import { FaClock } from 'react-icons/fa'

const CountdownTimer = ({ targetDate, title = "Promoción especial termina en", promoText = "✨ 15% OFF en combos ✨" }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })
  const [isExpired, setIsExpired] = useState(false)

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime()
      const target = new Date(targetDate).getTime()
      const difference = target - now

      if (difference <= 0) {
        setIsExpired(true)
        return
      }

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000)
      })
    }

    calculateTimeLeft()
    const interval = setInterval(calculateTimeLeft, 1000)
    return () => clearInterval(interval)
  }, [targetDate])

  if (isExpired) return null

  return (
    <div className="countdown-container" style={styles.container}>
      <div style={styles.promoBadge}>
        <FaClock color="#C9A96E" size={18} />
        <span style={styles.promoText}>{promoText}</span>
      </div>
      <p style={styles.title}>{title}</p>
      <div className="countdown-timer" style={styles.timer}>
        <div style={styles.timeBlock}>
          <span style={styles.timeNumber}>{timeLeft.days}</span>
          <span style={styles.timeLabel}>Días</span>
        </div>
        <span style={styles.separator}>:</span>
        <div style={styles.timeBlock}>
          <span style={styles.timeNumber}>{String(timeLeft.hours).padStart(2, '0')}</span>
          <span style={styles.timeLabel}>Horas</span>
        </div>
        <span style={styles.separator}>:</span>
        <div style={styles.timeBlock}>
          <span style={styles.timeNumber}>{String(timeLeft.minutes).padStart(2, '0')}</span>
          <span style={styles.timeLabel}>Min</span>
        </div>
        <span style={styles.separator}>:</span>
        <div style={styles.timeBlock}>
          <span style={styles.timeNumber}>{String(timeLeft.seconds).padStart(2, '0')}</span>
          <span style={styles.timeLabel}>Seg</span>
        </div>
      </div>
    </div>
  )
}

const styles = {
  container: {
    background: 'linear-gradient(135deg, rgba(46,196,182,0.1), rgba(216,167,185,0.1))',
    backdropFilter: 'blur(10px)',
    borderRadius: '20px',
    padding: '20px',
    textAlign: 'center',
    border: '1px solid rgba(46,196,182,0.2)',
    margin: '20px 0'
  },
  promoBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    background: 'rgba(201,169,110,0.15)',
    padding: '6px 15px',
    borderRadius: '30px',
    marginBottom: '15px'
  },
  promoText: { color: '#C9A96E', fontSize: 'clamp(12px, 3vw, 14px)', fontWeight: '600' },
  title: { color: '#fff', fontSize: 'clamp(12px, 3vw, 14px)', marginBottom: '15px', opacity: 0.8 },
  timer: { display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 'clamp(5px, 2vw, 10px)', flexWrap: 'wrap' },
  timeBlock: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    background: 'rgba(0,0,0,0.5)',
    padding: 'clamp(8px, 2vw, 10px) clamp(12px, 3vw, 15px)',
    borderRadius: '12px',
    minWidth: 'clamp(55px, 12vw, 60px)'
  },
  timeNumber: { fontSize: 'clamp(20px, 5vw, 28px)', fontWeight: 'bold', color: '#2EC4B6', fontFamily: 'Playfair Display, serif' },
  timeLabel: { fontSize: 'clamp(8px, 2vw, 10px)', color: '#A0A0A0', textTransform: 'uppercase' },
  separator: { fontSize: 'clamp(18px, 5vw, 24px)', color: '#C9A96E', fontWeight: 'bold' }
}

const responsiveStyles = document.createElement('style')
responsiveStyles.textContent = `
  @media (max-width: 768px) {
    .countdown-container { padding: 15px !important; margin: 15px 0 !important; }
    .countdown-timer { gap: 5px !important; }
  }
  @media (max-width: 480px) {
    .countdown-container { padding: 12px !important; }
    .countdown-timer { flex-wrap: wrap !important; justify-content: center !important; gap: 8px !important; }
    .time-block { min-width: 50px !important; padding: 6px 10px !important; }
  }
`
document.head.appendChild(responsiveStyles)

export default CountdownTimer
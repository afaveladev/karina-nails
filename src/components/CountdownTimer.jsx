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
    <div style={styles.container}>
      <div style={styles.promoBadge}>
        <FaClock color="#C9A96E" size={18} />
        <span style={styles.promoText}>{promoText}</span>
      </div>
      <p style={styles.title}>{title}</p>
      <div style={styles.timer}>
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
  promoText: { color: '#C9A96E', fontSize: '14px', fontWeight: '600' },
  title: { color: '#fff', fontSize: '14px', marginBottom: '15px', opacity: 0.8 },
  timer: { display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' },
  timeBlock: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    background: 'rgba(0,0,0,0.5)',
    padding: '10px 15px',
    borderRadius: '12px',
    minWidth: '60px'
  },
  timeNumber: { fontSize: '28px', fontWeight: 'bold', color: '#2EC4B6', fontFamily: 'Playfair Display, serif' },
  timeLabel: { fontSize: '10px', color: '#A0A0A0', textTransform: 'uppercase' },
  separator: { fontSize: '24px', color: '#C9A96E', fontWeight: 'bold' }
}

export default CountdownTimer
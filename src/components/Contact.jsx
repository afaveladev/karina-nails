import { useState, useEffect } from 'react'
import { database, ref, push, get, query, orderByChild, equalTo } from '../firebase/firebase'

const Contact = () => {
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState('')
  const [availableTimes, setAvailableTimes] = useState([])
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: ''
  })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  // Servicios disponibles
  const servicesList = [
    'Uñas Acrílicas',
    'Uñas de Gel',
    'Pestañas Clásicas',
    'Pestañas Volumen',
    'Perfilado de Cejas',
    'Combo Uñas + Pestañas'
  ]

  // Horarios disponibles (desde 11:00 AM hasta 8:00 PM)
  const allTimes = [
    '11:00', '12:00', '13:00', '14:00', '15:00',
    '16:00', '17:00', '18:00', '19:00', '20:00'
  ]

  // Cargar servicio preseleccionado desde localStorage
  useEffect(() => {
    const savedService = localStorage.getItem('selectedService')
    if (savedService) {
      const service = JSON.parse(savedService)
      setFormData(prev => ({ ...prev, service: service.name }))
      localStorage.removeItem('selectedService')
    }
  }, [])

  // Verificar horarios disponibles cuando cambia la fecha
  useEffect(() => {
    if (selectedDate) {
      checkAvailableTimes()
    }
  }, [selectedDate])

  const checkAvailableTimes = async () => {
    try {
      const appointmentsRef = ref(database, 'appointments')
      const dateQuery = query(appointmentsRef, orderByChild('date'), equalTo(selectedDate))
      const snapshot = await get(dateQuery)
      
      const bookedTimes = []
      snapshot.forEach((child) => {
        bookedTimes.push(child.val().time)
      })
      
      const available = allTimes.filter(time => !bookedTimes.includes(time))
      setAvailableTimes(available)
    } catch (error) {
      console.error('Error checking times:', error)
      setAvailableTimes(allTimes)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!selectedDate || !selectedTime) {
      setMessage('❌ Selecciona una fecha y hora')
      return
    }
    
    if (!formData.name || !formData.phone || !formData.service) {
      setMessage('❌ Completa todos los campos')
      return
    }

    setLoading(true)
    
    try {
      const appointment = {
        name: formData.name,
        phone: formData.phone,
        service: formData.service,
        date: selectedDate,
        time: selectedTime,
        createdAt: new Date().toISOString()
      }
      
      await push(ref(database, 'appointments'), appointment)
      
      setMessage('✅ ¡Cita agendada con éxito! Te esperamos.')
      setFormData({ name: '', phone: '', service: '' })
      setSelectedDate('')
      setSelectedTime('')
      
      setTimeout(() => setMessage(''), 3000)
    } catch (error) {
      console.error('Error saving appointment:', error)
      setMessage('❌ Error al agendar. Intenta de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  // Generar fechas disponibles (próximos 30 días)
  const getAvailableDates = () => {
    const dates = []
    const today = new Date()
    
    for (let i = 1; i <= 30; i++) {
      const date = new Date(today)
      date.setDate(today.getDate() + i)
      const dateString = date.toISOString().split('T')[0]
      const dayName = date.toLocaleDateString('es-ES', { weekday: 'long' })
      const dayNum = date.getDate()
      const month = date.toLocaleDateString('es-ES', { month: 'long' })
      
      dates.push({
        value: dateString,
        label: `${dayName.charAt(0).toUpperCase() + dayName.slice(1)} ${dayNum} de ${month}`
      })
    }
    return dates
  }

  return (
    <section id="contact" style={styles.contact}>
      <div className="container" style={styles.container}>
        <h2 style={styles.title}>Agenda tu <span style={styles.accent}>Cita</span></h2>
        <div className="section-divider"></div>
        <p style={styles.subtitle}>Elige fecha y hora, nosotros te esperamos</p>

        <div style={styles.grid}>
          {/* Mapa */}
          <div className="contact-card" style={styles.mapContainer}>
            <h3 style={styles.sectionTitle}>📍 ¿Dónde estamos?</h3>
            <div style={styles.map}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3602.0!2d-103.5!3d25.5!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjXCsDMwJzAwLjAiTiAxMDPCsDMwJzAwLjAiVw!5e0!3m2!1ses!2smx!4v1234567890"
                width="100%"
                height="280"
                style={{ border: 0, borderRadius: '16px' }}
                allowFullScreen=""
                loading="lazy"
                title="Ubicación Karina Nails"
              ></iframe>
            </div>
            <div className="gold-divider" style={{ margin: '20px 0' }}></div>
            <div style={styles.info}>
              <p><span style={{ color: '#C9A96E' }}>📞</span> <strong>Teléfono:</strong> 871 535 3066</p>
              <p><span style={{ color: '#2EC4B6' }}>📍</span> <strong>Dirección:</strong> Calle Tolosa 320, Col. Santa Sofía, Gómez Palacio, Durango</p>
              <p><span style={{ color: '#C9A96E' }}>⏰</span> <strong>Horario:</strong> Desde las 11:00 a.m.</p>
            </div>
          </div>

          {/* Formulario */}
          <div className="contact-card" style={styles.formContainer}>
            <h3 style={styles.sectionTitle}>📝 Reserva tu lugar</h3>
            <form onSubmit={handleSubmit} style={styles.form}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Fecha</label>
                <select
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  style={styles.select}
                  required
                >
                  <option value="">Selecciona una fecha</option>
                  {getAvailableDates().map((date) => (
                    <option key={date.value} value={date.value}>
                      {date.label}
                    </option>
                  ))}
                </select>
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Hora</label>
                <select
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                  style={styles.select}
                  required
                  disabled={!selectedDate}
                >
                  <option value="">Selecciona una hora</option>
                  {availableTimes.map((time) => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
                {selectedDate && availableTimes.length === 0 && (
                  <p style={styles.warning}>⚠️ No hay horarios disponibles para esta fecha</p>
                )}
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Nombre</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  style={styles.input}
                  placeholder="Tu nombre completo"
                  required
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Teléfono</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  style={styles.input}
                  placeholder="871 535 3066"
                  required
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Servicio</label>
                <select
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  style={styles.select}
                  required
                >
                  <option value="">Selecciona un servicio</option>
                  {servicesList.map((service) => (
                    <option key={service} value={service}>
                      {service}
                    </option>
                  ))}
                </select>
              </div>

              <button type="submit" className="btn-primary glow-effect" disabled={loading} style={styles.submitBtn}>
                {loading ? 'Agendando...' : 'Agendar Cita'}
              </button>
              
              {message && <p style={message.includes('✅') ? styles.success : styles.error}>{message}</p>}
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

const styles = {
  contact: {
    padding: '100px 0',
    backgroundColor: '#0F0F10'
  },
  container: {
    maxWidth: '1280px',
    margin: '0 auto',
    padding: '0 24px'
  },
  title: {
    textAlign: 'center',
    fontSize: 'clamp(2rem, 5vw, 3.2rem)',
    fontFamily: 'Playfair Display, serif',
    marginBottom: '10px',
    color: '#F5F5F5'
  },
  accent: {
    background: 'linear-gradient(135deg, #2EC4B6 0%, #C9A96E 100%)',
    WebkitBackgroundClip: 'text',
    backgroundClip: 'text',
    color: 'transparent'
  },
  subtitle: {
    textAlign: 'center',
    color: '#A0A0A0',
    marginBottom: '60px',
    fontSize: '1rem',
    fontWeight: 300,
    letterSpacing: '0.5px'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '50px'
  },
  mapContainer: {
    background: 'rgba(26, 26, 30, 0.6)',
    backdropFilter: 'blur(10px)',
    borderRadius: '24px',
    padding: '30px',
    border: '1px solid rgba(46, 196, 182, 0.1)',
    transition: 'all 0.3s cubic-bezier(0.2, 0.9, 0.4, 1.1)'
  },
  formContainer: {
    background: 'rgba(26, 26, 30, 0.6)',
    backdropFilter: 'blur(10px)',
    borderRadius: '24px',
    padding: '30px',
    border: '1px solid rgba(46, 196, 182, 0.1)',
    transition: 'all 0.3s cubic-bezier(0.2, 0.9, 0.4, 1.1)'
  },
  sectionTitle: {
    fontSize: '1.4rem',
    fontFamily: 'Playfair Display, serif',
    marginBottom: '20px',
    color: '#F5F5F5'
  },
  map: {
    marginBottom: '20px',
    borderRadius: '16px',
    overflow: 'hidden'
  },
  info: {
    color: '#A0A0A0',
    lineHeight: '1.8',
    fontSize: '0.9rem'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  label: {
    color: '#C9A96E',
    fontWeight: '500',
    fontSize: '0.85rem',
    letterSpacing: '0.5px'
  },
  input: {
    backgroundColor: '#1A1A1E',
    border: '1px solid #2a2a2e',
    borderRadius: '12px',
    padding: '14px 18px',
    color: '#F5F5F5',
    fontSize: '0.95rem',
    transition: 'all 0.3s ease',
    fontFamily: 'Poppins, sans-serif'
  },
  select: {
    backgroundColor: '#1A1A1E',
    border: '1px solid #2a2a2e',
    borderRadius: '12px',
    padding: '14px 18px',
    color: '#F5F5F5',
    fontSize: '0.95rem',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    fontFamily: 'Poppins, sans-serif'
  },
  warning: {
    color: '#C9A96E',
    fontSize: '0.8rem',
    marginTop: '5px'
  },
  success: {
    color: '#2EC4B6',
    textAlign: 'center',
    marginTop: '15px',
    fontSize: '0.9rem'
  },
  error: {
    color: '#EF4444',
    textAlign: 'center',
    marginTop: '15px',
    fontSize: '0.9rem'
  },
  submitBtn: {
    marginTop: '10px',
    width: '100%'
  }
}

// Hover effects
const hoverStyles = document.createElement('style')
hoverStyles.textContent = `
  .contact-card:hover {
    transform: translateY(-5px);
    border-color: rgba(46, 196, 182, 0.3);
    box-shadow: 0 15px 35px rgba(46, 196, 182, 0.1);
  }
  
  input:hover, select:hover {
    border-color: #2EC4B6;
  }
  
  input:focus, select:focus {
    outline: none;
    border-color: #2EC4B6;
    box-shadow: 0 0 0 3px rgba(46, 196, 182, 0.1);
  }
  
  @media (max-width: 992px) {
    #contact .grid {
      gap: 30px;
    }
  }
  
  @media (max-width: 768px) {
    #contact .grid {
      grid-template-columns: 1fr !important;
      gap: 30px;
    }
    
    .contact-card {
      padding: 25px !important;
    }
  }
`
document.head.appendChild(hoverStyles)

export default Contact
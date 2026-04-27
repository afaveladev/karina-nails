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
      
      // Limpiar mensaje después de 3 segundos
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
        <p style={styles.subtitle}>Elige fecha y hora, nosotros te esperamos</p>

        <div style={styles.grid}>
          {/* Mapa */}
          <div style={styles.mapContainer}>
            <h3 style={styles.sectionTitle}>📍 ¿Dónde estamos?</h3>
            <div style={styles.map}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3602.0!2d-103.5!3d25.5!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjXCsDMwJzAwLjAiTiAxMDPCsDMwJzAwLjAiVw!5e0!3m2!1ses!2smx!4v1234567890"
                width="100%"
                height="300"
                style={{ border: 0, borderRadius: '10px' }}
                allowFullScreen=""
                loading="lazy"
                title="Ubicación Karina Nails"
              ></iframe>
            </div>
            <div style={styles.info}>
              <p><strong>📞 Teléfono:</strong> 871 535 3066</p>
              <p><strong>📍 Dirección:</strong> Calle Tolosa 320, Col. Santa Sofía, Gómez Palacio, Durango</p>
              <p><strong>⏰ Horario:</strong> Desde las 11:00 a.m.</p>
            </div>
          </div>

          {/* Formulario */}
          <div style={styles.formContainer}>
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

              <button type="submit" className="btn-primary" disabled={loading}>
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
    padding: '80px 0',
    backgroundColor: '#000000'
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 20px'
  },
  title: {
    textAlign: 'center',
    fontSize: 'clamp(2rem, 5vw, 3rem)',
    fontFamily: 'Playfair Display, serif',
    marginBottom: '10px',
    color: 'white'
  },
  accent: {
    color: '#14B8A6'
  },
  subtitle: {
    textAlign: 'center',
    color: '#9CA3AF',
    marginBottom: '50px',
    fontSize: '1.1rem'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '50px'
  },
  mapContainer: {
    backgroundColor: '#111',
    borderRadius: '15px',
    padding: '20px'
  },
  formContainer: {
    backgroundColor: '#111',
    borderRadius: '15px',
    padding: '20px'
  },
  sectionTitle: {
    fontSize: '1.5rem',
    fontFamily: 'Playfair Display, serif',
    marginBottom: '20px',
    color: 'white'
  },
  map: {
    marginBottom: '20px',
    borderRadius: '10px',
    overflow: 'hidden'
  },
  info: {
    color: '#9CA3AF',
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
    color: '#14B8A6',
    fontWeight: '500'
  },
  input: {
    backgroundColor: '#222',
    border: '1px solid #333',
    borderRadius: '8px',
    padding: '12px',
    color: 'white',
    fontSize: '1rem'
  },
  select: {
    backgroundColor: '#222',
    border: '1px solid #333',
    borderRadius: '8px',
    padding: '12px',
    color: 'white',
    fontSize: '1rem',
    cursor: 'pointer'
  },
  warning: {
    color: '#F59E0B',
    fontSize: '0.8rem',
    marginTop: '5px'
  },
  success: {
    color: '#14B8A6',
    textAlign: 'center',
    marginTop: '10px'
  },
  error: {
    color: '#EF4444',
    textAlign: 'center',
    marginTop: '10px'
  }
}

// Media query
const mediaStyles = document.createElement('style')
mediaStyles.textContent = `
  @media (max-width: 768px) {
    #contact .grid {
      grid-template-columns: 1fr !important;
    }
  }
`
document.head.appendChild(mediaStyles)

export default Contact
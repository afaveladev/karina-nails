/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/immutability */
import { useState, useEffect } from 'react'
import { database, ref, push, get, query, orderByChild, equalTo } from '../firebase/firebase'
import { FaChevronLeft, FaChevronRight, FaCalendarAlt, FaClock, FaUser, FaPhone, FaCut, FaCommentDots, FaCheckCircle } from 'react-icons/fa'

const Contact = () => {
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState('')
  const [availableTimes, setAvailableTimes] = useState([])
  const [citasDelDia, setCitasDelDia] = useState(0)
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: '',
    message: ''
  })
  
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  let isSubmitting = false

  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [calendarDays, setCalendarDays] = useState([])
  const [selectedDateObj, setSelectedDateObj] = useState(null)

  const servicesList = [
    'Uñas Acrílicas',
    'Uñas de Gel',
    'Pestañas Clásicas',
    'Pestañas Volumen',
    'Perfilado de Cejas',
    'Combo Uñas + Pestañas'
  ]

  const allTimes = [
    '11:00', '11:30', '12:00', '12:30', '13:00', '13:30',
    '14:00', '14:30', '15:00', '15:30', '16:00', '16:30',
    '17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00'
  ]

  const weekDays = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb']

  // Cargar servicio preseleccionado
  useEffect(() => {
    const savedService = localStorage.getItem('selectedService')
    if (savedService) {
      const service = JSON.parse(savedService)
      setFormData(prev => ({ ...prev, service: service.name }))
      localStorage.removeItem('selectedService')
    }
  }, [])

  useEffect(() => {
    generateCalendar()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentMonth])

  useEffect(() => {
    if (selectedDate) {
      checkAvailableTimes()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDate])

  const getTodayDate = () => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return today
  }

  const generateCalendar = () => {
    const year = currentMonth.getFullYear()
    const month = currentMonth.getMonth()
    const today = getTodayDate()
    
    const firstDayOfMonth = new Date(year, month, 1)
    const startDayOfWeek = firstDayOfMonth.getDay()
    const daysInMonth = new Date(year, month + 1, 0).getDate()
    
    const days = []
    
    const prevMonthDays = new Date(year, month, 0).getDate()
    for (let i = startDayOfWeek - 1; i >= 0; i--) {
      const date = new Date(year, month - 1, prevMonthDays - i)
      days.push({
        date,
        isCurrentMonth: false,
        isPast: date < today,
        dayNumber: prevMonthDays - i,
        dateString: date.toISOString().split('T')[0]
      })
    }
    
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(year, month, i)
      days.push({
        date,
        isCurrentMonth: true,
        isPast: date < today,
        dayNumber: i,
        dateString: date.toISOString().split('T')[0]
      })
    }
    
    const remainingDays = 42 - days.length
    for (let i = 1; i <= remainingDays; i++) {
      const date = new Date(year, month + 1, i)
      days.push({
        date,
        isCurrentMonth: false,
        isPast: date < today,
        dayNumber: i,
        dateString: date.toISOString().split('T')[0]
      })
    }
    
    setCalendarDays(days)
  }

  const changeMonth = (direction) => {
    setCurrentMonth(prev => {
      const newDate = new Date(prev)
      newDate.setMonth(prev.getMonth() + direction)
      return newDate
    })
    setSelectedDate('')
    setSelectedDateObj(null)
    setSelectedTime('')
  }

  const handleDateSelect = (day) => {
    if (!day.isCurrentMonth || day.isPast) return
    
    const dateString = day.dateString
    
    if (selectedDate === dateString) {
      setSelectedDate('')
      setSelectedDateObj(null)
      setSelectedTime('')
    } else {
      setSelectedDate(dateString)
      setSelectedDateObj(day)
      setSelectedTime('')
    }
  }

  const checkAvailableTimes = async () => {
    try {
      const appointmentsRef = ref(database, 'appointments')
      const dateQuery = query(appointmentsRef, orderByChild('date'), equalTo(selectedDate))
      const snapshot = await get(dateQuery)
      
      const bookedTimes = []
      snapshot.forEach((child) => {
        bookedTimes.push(child.val().time)
      })
      
      setCitasDelDia(bookedTimes.length)
      const available = allTimes.filter(time => !bookedTimes.includes(time))
      setAvailableTimes(available)
    } catch (error) {
      setAvailableTimes(allTimes)
    }
  }

  const handleTimeSelect = (time) => {
    setSelectedTime(time)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (isSubmitting) return
    
    if (!selectedDate) { setMessage('❌ Selecciona una fecha en el calendario'); return }
    if (!selectedTime) { setMessage('❌ Selecciona una hora'); return }
    if (!formData.name.trim()) { setMessage('❌ Ingresa tu nombre'); return }
    if (!formData.phone.trim()) { setMessage('❌ Ingresa tu teléfono'); return }
    if (!formData.service) { setMessage('❌ Selecciona un servicio'); return }

    isSubmitting = true
    setLoading(true)

    try {
      const appointment = {
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        service: formData.service,
        message: formData.message?.trim() || '',
        date: selectedDate,
        time: selectedTime,
        createdAt: new Date().toISOString()
      }
      await push(ref(database, 'appointments'), appointment)

      const whatsappMessage = `✨ *KARINA NAILS & LASHES* ✨%0a%0aHola *${formData.name}*, tu cita ha sido agendada con éxito!%0a%0a📅 *Fecha:* ${selectedDate}%0a⏰ *Hora:* ${selectedTime}%0a💅 *Servicio:* ${formData.service}%0a%0a¡Te esperamos! 🎀✨`
      const whatsappUrl = `https://wa.me/52${formData.phone.replace(/\D/g, '')}?text=${whatsappMessage}`
      window.open(whatsappUrl, '_blank')

      setMessage('✅ ¡Cita agendada con éxito! Te enviamos un recordatorio por WhatsApp.')
      
      setFormData({ name: '', phone: '', service: '', message: '' })
      setSelectedDate('')
      setSelectedDateObj(null)
      setSelectedTime('')
      
      setTimeout(() => setMessage(''), 4000)
    } catch (error) {
      setMessage('❌ Error al agendar. Intenta de nuevo.')
    } finally {
      setLoading(false)
      setTimeout(() => { isSubmitting = false }, 1000)
    }
  }

  const formatMonthYear = () => {
    return currentMonth.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' })
      .replace(/^\w/, c => c.toUpperCase())
  }

  const formatSelectedDate = () => {
    if (!selectedDateObj) return ''
    return selectedDateObj.date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric'
    })
  }

  const isDateFull = citasDelDia >= 8

  const getInputStyle = (value) => {
    if (value && value.toString().trim() !== '') {
      return styles.inputFilled
    }
    return styles.inputEmpty
  }

  return (
    <section id="contact" style={styles.contact}>
      <div className="container" style={styles.container}>
        <div style={styles.header}>
          <h2 style={styles.title}>Agenda tu <span style={styles.accent}>Cita</span></h2>
          <div className="section-divider"></div>
          <p style={styles.subtitle}>Selecciona día y horario, luego completa tus datos</p>
        </div>

        <div className="contact-grid" style={styles.grid}>
          {/* Columna Izquierda */}
          <div style={styles.leftColumn}>
            {/* Calendario */}
            <div style={styles.card}>
              <div style={styles.cardHeader}>
                <FaCalendarAlt style={styles.cardIcon} />
                <h3 style={styles.cardTitle}>Selecciona un día</h3>
              </div>
              
              <div style={styles.calendarHeader}>
                <button onClick={() => changeMonth(-1)} style={styles.navBtn}><FaChevronLeft /></button>
                <span style={styles.monthTitle}>{formatMonthYear()}</span>
                <button onClick={() => changeMonth(1)} style={styles.navBtn}><FaChevronRight /></button>
              </div>
              
              <div style={styles.weekDaysRow}>
                {weekDays.map(day => <div key={day} style={styles.weekDayCell}>{day}</div>)}
              </div>
              
              <div style={styles.calendarGrid}>
                {calendarDays.map((day, idx) => {
                  const isDisabled = !day.isCurrentMonth || day.isPast
                  const isSelected = selectedDate === day.dateString
                  return (
                    <button
                      key={idx}
                      onClick={() => handleDateSelect(day)}
                      style={{
                        ...styles.calendarDay,
                        ...(!day.isCurrentMonth && styles.calendarDayOther),
                        ...(day.isPast && styles.calendarDayPast),
                        ...(isSelected && styles.calendarDaySelected)
                      }}
                      disabled={isDisabled}
                    >
                      {day.dayNumber}
                    </button>
                  )
                })}
              </div>
              
              <div style={styles.legend}>
                <div style={styles.legendItem}><div style={{...styles.legendDot, backgroundColor: '#2EC4B6'}}></div><span>Disponible</span></div>
                <div style={styles.legendItem}><div style={{...styles.legendDot, backgroundColor: '#ff4d4d'}}></div><span>Ocupado</span></div>
              </div>
            </div>

            {/* Horarios */}
            {selectedDate && (
              <div style={styles.card}>
                <div style={styles.cardHeader}>
                  <FaClock style={styles.cardIcon} />
                  <h3 style={styles.cardTitle}>Selecciona un horario</h3>
                </div>
                
                {isDateFull && (
                  <div style={styles.fullDayMsg}>⚠️ Este día está completo (8/8 citas)</div>
                )}
                
                <div className="hours-grid" style={styles.hoursGrid}>
                  {availableTimes.map((time) => (
                    <button
                      key={time}
                      onClick={() => handleTimeSelect(time)}
                      style={{
                        ...styles.hourBtn,
                        ...(selectedTime === time && styles.hourBtnSelected)
                      }}
                    >
                      {time}
                    </button>
                  ))}
                </div>
                
                {availableTimes.length === 0 && !isDateFull && (
                  <div style={styles.noHoursMsg}>⏰ No hay horarios disponibles para esta fecha</div>
                )}
              </div>
            )}

            {/* Mapa */}
            <div style={styles.mapCard}>
              <div style={styles.map}>
                <iframe
                  title="Ubicación Karina Nails"
                  src="https://maps.google.com/maps?q=Calle+Tolosa+320+Gómez+Palacio+Durango&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="250"
                  style={{ border: 0, borderRadius: '16px' }}
                  allowFullScreen
                  loading="lazy"
                />
              </div>
            </div>
          </div>

          {/* Columna Derecha: Formulario */}
          <div style={styles.rightColumn}>
            <div style={styles.formCard}>
              <h3 style={styles.formTitle}>Completa tus datos</h3>

              <form onSubmit={handleSubmit} style={styles.form}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Nombre completo <span style={styles.required}>*</span></label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    style={getInputStyle(formData.name)}
                    placeholder="Tu nombre completo"
                    required
                  />
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>Teléfono <span style={styles.required}>*</span></label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    style={getInputStyle(formData.phone)}
                    placeholder="10 dígitos"
                    required
                  />
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>Servicio <span style={styles.required}>*</span></label>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleInputChange}
                    style={getInputStyle(formData.service)}
                    required
                  >
                    <option value="">Selecciona un servicio</option>
                    {servicesList.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>Fecha seleccionada</label>
                  <input
                    type="text"
                    value={formatSelectedDate()}
                    style={getInputStyle(formatSelectedDate())}
                    readOnly
                    placeholder="Selecciona un día en el calendario"
                  />
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>Hora seleccionada</label>
                  <input
                    type="text"
                    value={selectedTime}
                    style={getInputStyle(selectedTime)}
                    readOnly
                    placeholder="Ninguna"
                  />
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>Mensaje (opcional)</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    style={getInputStyle(formData.message)}
                    placeholder="¿Alguna indicación especial?"
                    rows={3}
                  />
                </div>

                <button type="submit" className="btn-primary" disabled={loading} style={styles.submitBtn}>
                  {loading ? 'Agendando...' : 'Confirmar Cita'}
                  <FaCheckCircle style={{ marginLeft: '8px' }} />
                </button>
                
                {message && <p style={message.includes('✅') ? styles.success : styles.error}>{message}</p>}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

const styles = {
  contact: { padding: '100px 0', backgroundColor: '#0F0F10' },
  container: { maxWidth: '1280px', margin: '0 auto', padding: '0 24px' },
  header: { textAlign: 'center', marginBottom: '50px' },
  title: { fontSize: 'clamp(2rem, 5vw, 3.2rem)', fontFamily: 'Playfair Display, serif', marginBottom: '10px', color: '#F5F5F5' },
  accent: { background: 'linear-gradient(135deg, #2EC4B6 0%, #C9A96E 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' },
  subtitle: { textAlign: 'center', color: '#A0A0A0', fontSize: '1rem', marginTop: '15px' },
  grid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' },
  leftColumn: { display: 'flex', flexDirection: 'column', gap: '30px' },
  rightColumn: {},
  card: { background: 'rgba(26,26,30,0.6)', backdropFilter: 'blur(10px)', borderRadius: '20px', padding: '25px', border: '1px solid rgba(46,196,182,0.1)' },
  mapCard: { background: 'rgba(26,26,30,0.6)', backdropFilter: 'blur(10px)', borderRadius: '20px', padding: '0', overflow: 'hidden', border: '1px solid rgba(46,196,182,0.1)' },
  cardHeader: { display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px', paddingBottom: '15px', borderBottom: '1px solid rgba(46,196,182,0.2)' },
  cardIcon: { fontSize: '22px', color: '#2EC4B6' },
  cardTitle: { fontSize: '1.1rem', color: '#F5F5F5', fontFamily: 'Playfair Display, serif' },
  calendarHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' },
  navBtn: { background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '8px', padding: '8px 12px', color: '#fff', cursor: 'pointer', transition: 'all 0.3s ease' },
  monthTitle: { fontSize: '1.1rem', color: '#C9A96E', fontFamily: 'Playfair Display, serif' },
  weekDaysRow: { display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', marginBottom: '10px' },
  weekDayCell: { textAlign: 'center', fontSize: '12px', color: '#C9A96E', padding: '8px', fontWeight: '600' },
  calendarGrid: { display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '5px' },
  calendarDay: { background: '#1A1A1E', border: '1px solid #2a2a2e', borderRadius: '8px', padding: '10px', textAlign: 'center', cursor: 'pointer', transition: 'all 0.3s ease', color: '#F5F5F5', fontSize: '14px' },
  calendarDayOther: { opacity: 0.3, background: '#111' },
  calendarDayPast: { opacity: 0.4, background: '#0a0a0a', cursor: 'not-allowed', textDecoration: 'line-through' },
  calendarDaySelected: { background: 'linear-gradient(135deg, #2EC4B6, #D8A7B9)', color: '#000', borderColor: 'transparent' },
  legend: { display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '15px', paddingTop: '15px', borderTop: '1px solid rgba(255,255,255,0.05)' },
  legendItem: { display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#A0A0A0' },
  legendDot: { width: '12px', height: '12px', borderRadius: '50%' },
  hoursGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))', gap: '10px', marginTop: '15px' },
  hourBtn: { background: '#1A1A1E', border: '1px solid #2a2a2e', borderRadius: '10px', padding: '10px', color: '#F5F5F5', cursor: 'pointer', textAlign: 'center', transition: 'all 0.3s ease', fontSize: '13px' },
  hourBtnSelected: { background: 'linear-gradient(135deg, #2EC4B6, #D8A7B9)', color: '#000', borderColor: 'transparent' },
  fullDayMsg: { background: 'rgba(255,77,77,0.1)', color: '#ff6b6b', padding: '10px', borderRadius: '10px', textAlign: 'center', fontSize: '13px', marginBottom: '15px' },
  noHoursMsg: { textAlign: 'center', color: '#C9A96E', padding: '20px', fontSize: '13px' },
  formCard: { background: 'rgba(26,26,30,0.6)', backdropFilter: 'blur(10px)', borderRadius: '20px', padding: '30px', border: '1px solid rgba(46,196,182,0.1)' },
  formTitle: { fontSize: '1.3rem', color: '#F5F5F5', fontFamily: 'Playfair Display, serif', marginBottom: '25px', textAlign: 'center' },
  form: { display: 'flex', flexDirection: 'column', gap: '18px' },
  formGroup: { display: 'flex', flexDirection: 'column', gap: '6px' },
  label: { color: '#C9A96E', fontSize: '12px', fontWeight: '600', letterSpacing: '0.5px' },
  required: { color: '#ff6b6b' },
  inputEmpty: {
    backgroundColor: '#1A1A1E',
    border: '1px solid #2a2a2e',
    borderRadius: '12px',
    padding: '12px 15px',
    color: '#F5F5F5',
    fontSize: '14px',
    fontFamily: 'Poppins, sans-serif',
    width: '100%',
    transition: 'all 0.3s ease',
    outline: 'none'
  },
  inputFilled: {
    backgroundColor: '#E8E8E8',
    border: '1px solid #2a2a2e',
    borderRadius: '12px',
    padding: '12px 15px',
    color: '#000000',
    fontSize: '14px',
    fontFamily: 'Poppins, sans-serif',
    width: '100%',
    transition: 'all 0.3s ease',
    outline: 'none'
  },
  submitBtn: { width: '100%', padding: '14px', fontSize: '16px', fontWeight: '600', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginTop: '10px', background: 'linear-gradient(135deg, #2EC4B6, #D8A7B9)', border: 'none', borderRadius: '40px', color: '#000', cursor: 'pointer', transition: 'all 0.3s ease' },
  success: { color: '#2EC4B6', textAlign: 'center', marginTop: '15px', fontSize: '14px' },
  error: { color: '#EF4444', textAlign: 'center', marginTop: '15px', fontSize: '14px' }
}

const responsiveStyles = document.createElement('style')
responsiveStyles.textContent = `
  @media (max-width: 992px) {
    .contact-grid { gap: 30px !important; }
    .hours-grid { grid-template-columns: repeat(auto-fill, minmax(75px, 1fr)) !important; gap: 10px !important; }
  }
  @media (max-width: 768px) {
    .contact-grid { grid-template-columns: 1fr !important; gap: 30px !important; }
    .contact-card { padding: 20px !important; }
    .hours-grid { grid-template-columns: repeat(auto-fill, minmax(70px, 1fr)) !important; }
    .hour-btn { padding: 8px 6px !important; font-size: 0.8rem !important; }
    .contact-map iframe { height: 200px !important; }
    .form-card { padding: 20px !important; }
  }
  @media (max-width: 480px) {
    .contact-card { padding: 16px !important; }
    .form-title { font-size: 1.1rem !important; }
    input, select { padding: 10px 12px !important; font-size: 0.85rem !important; }
    label { font-size: 0.75rem !important; }
    iframe { height: 180px !important; }
    .info { font-size: 0.75rem !important; }
    .hours-grid { grid-template-columns: repeat(2, 1fr) !important; }
  }
`
document.head.appendChild(responsiveStyles)

export default Contact
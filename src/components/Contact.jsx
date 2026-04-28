import { useState, useEffect } from 'react'
import { database, ref, push, get, query, orderByChild, equalTo } from '../firebase/firebase'

const Contact = () => {
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState('')
  const [availableTimes, setAvailableTimes] = useState([])
  const [formData, setFormData] = useState({ name: '', phone: '', service: '' })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  let isSubmitting = false

  const servicesList = ['Uñas Acrílicas', 'Uñas de Gel', 'Pestañas Clásicas', 'Pestañas Volumen', 'Perfilado de Cejas', 'Combo Uñas + Pestañas']
  const allTimes = ['11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00']

  useEffect(() => {
    const savedService = localStorage.getItem('selectedService')
    if (savedService) {
      const service = JSON.parse(savedService)
      setFormData(prev => ({ ...prev, service: service.name }))
      localStorage.removeItem('selectedService')
    }
  }, [])

  useEffect(() => {
    if (selectedDate) checkAvailableTimes()
  }, [selectedDate])

  const checkAvailableTimes = async () => {
    try {
      const appointmentsRef = ref(database, 'appointments')
      const dateQuery = query(appointmentsRef, orderByChild('date'), equalTo(selectedDate))
      const snapshot = await get(dateQuery)
      const bookedTimes = []
      snapshot.forEach((child) => bookedTimes.push(child.val().time))
      setAvailableTimes(allTimes.filter(time => !bookedTimes.includes(time)))
    } catch (error) {
      setAvailableTimes(allTimes)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (isSubmitting) return
    if (!selectedDate || !selectedTime) { setMessage('❌ Selecciona fecha y hora'); return }
    if (!formData.name || !formData.phone || !formData.service) { setMessage('❌ Completa todos los campos'); return }

    isSubmitting = true
    setLoading(true)

    try {
      const appointment = {
        name: formData.name, phone: formData.phone, service: formData.service,
        date: selectedDate, time: selectedTime, createdAt: new Date().toISOString()
      }
      await push(ref(database, 'appointments'), appointment)

      // Enviar recordatorio por WhatsApp
      const whatsappMessage = `Hola ${formData.name}, tu cita en Karina Nails & Lashes ha sido agendada para el ${selectedDate} a las ${selectedTime} para el servicio de ${formData.service}. ¡Te esperamos! ✨`
      const whatsappUrl = `https://wa.me/52${formData.phone.replace(/\D/g, '')}?text=${encodeURIComponent(whatsappMessage)}`
      window.open(whatsappUrl, '_blank')

      setMessage('✅ ¡Cita agendada con éxito! Te enviamos un recordatorio por WhatsApp.')
      setFormData({ name: '', phone: '', service: '' })
      setSelectedDate(''); setSelectedTime('')
      setTimeout(() => setMessage(''), 4000)
    } catch (error) {
      setMessage('❌ Error al agendar. Intenta de nuevo.')
    } finally {
      setLoading(false)
      setTimeout(() => { isSubmitting = false }, 1000)
    }
  }

  const getAvailableDates = () => {
    const dates = []
    const today = new Date()
    for (let i = 1; i <= 30; i++) {
      const date = new Date(today); date.setDate(today.getDate() + i)
      const dateString = date.toISOString().split('T')[0]
      const dayName = date.toLocaleDateString('es-ES', { weekday: 'long' })
      dates.push({ value: dateString, label: `${dayName.charAt(0).toUpperCase() + dayName.slice(1)} ${date.getDate()} de ${date.toLocaleDateString('es-ES', { month: 'long' })}` })
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
          <div className="contact-card" style={styles.mapContainer}>
            <h3 style={styles.sectionTitle}>📍 ¿Dónde estamos?</h3>
            <div style={styles.map}>
              <iframe title="Ubicación" src="https://maps.google.com/maps?q=Calle+Tolosa+320+Gómez+Palacio+Durango&t=&z=15&ie=UTF8&iwloc=&output=embed" width="100%" height="280" style={{ border: 0, borderRadius: '16px' }} allowFullScreen loading="lazy"></iframe>
            </div>
            <div className="gold-divider" style={{ margin: '20px 0' }}></div>
            <div style={styles.info}>
              <p><span style={{ color: '#C9A96E' }}>📞</span> <strong>Teléfono:</strong> 871 535 3066</p>
              <p><span style={{ color: '#2EC4B6' }}>📍</span> <strong>Dirección:</strong> Calle Tolosa 320, Col. Santa Sofía, Gómez Palacio, Durango</p>
              <p><span style={{ color: '#D8A7B9' }}>⏰</span> <strong>Horario:</strong> Desde las 11:00 a.m.</p>
            </div>
          </div>
          <div className="contact-card" style={styles.formContainer}>
            <h3 style={styles.sectionTitle}>📝 Reserva tu lugar</h3>
            <form onSubmit={handleSubmit} style={styles.form}>
              <div style={styles.formGroup}><label style={styles.label}>Fecha</label><select value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} style={styles.select} required><option value="">Selecciona una fecha</option>{getAvailableDates().map((date) => (<option key={date.value} value={date.value}>{date.label}</option>))}</select></div>
              <div style={styles.formGroup}><label style={styles.label}>Hora</label><select value={selectedTime} onChange={(e) => setSelectedTime(e.target.value)} style={styles.select} required disabled={!selectedDate}><option value="">Selecciona una hora</option>{availableTimes.map((time) => (<option key={time} value={time}>{time}</option>))}</select>{selectedDate && availableTimes.length === 0 && <p style={styles.warning}>⚠️ No hay horarios disponibles</p>}</div>
              <div style={styles.formGroup}><label style={styles.label}>Nombre</label><input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} style={styles.input} placeholder="Tu nombre completo" required /></div>
              <div style={styles.formGroup}><label style={styles.label}>Teléfono</label><input type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} style={styles.input} placeholder="871 535 3066" required /></div>
              <div style={styles.formGroup}><label style={styles.label}>Servicio</label><select value={formData.service} onChange={(e) => setFormData({ ...formData, service: e.target.value })} style={styles.select} required><option value="">Selecciona un servicio</option>{servicesList.map((service) => (<option key={service} value={service}>{service}</option>))}</select></div>
              <button type="submit" className="btn-primary glow-effect" disabled={loading} style={styles.submitBtn}>{loading ? 'Agendando...' : 'Agendar Cita'}</button>
              {message && <p style={message.includes('✅') ? styles.success : styles.error}>{message}</p>}
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

const styles = {
  contact: { padding: '100px 0', backgroundColor: '#0F0F10' },
  container: { maxWidth: '1280px', margin: '0 auto', padding: '0 24px' },
  title: { textAlign: 'center', fontSize: 'clamp(2rem, 5vw, 3.2rem)', fontFamily: 'Playfair Display, serif', marginBottom: '10px', color: '#F5F5F5' },
  accent: { background: 'linear-gradient(135deg, #2EC4B6 0%, #C9A96E 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' },
  subtitle: { textAlign: 'center', color: '#A0A0A0', marginBottom: '60px', fontSize: '1rem' },
  grid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '50px' },
  mapContainer: { background: 'rgba(26,26,30,0.6)', backdropFilter: 'blur(10px)', borderRadius: '24px', padding: '30px' },
  formContainer: { background: 'rgba(26,26,30,0.6)', backdropFilter: 'blur(10px)', borderRadius: '24px', padding: '30px' },
  sectionTitle: { fontSize: '1.4rem', fontFamily: 'Playfair Display, serif', marginBottom: '20px', color: '#F5F5F5' },
  map: { marginBottom: '20px', borderRadius: '16px', overflow: 'hidden' },
  info: { color: '#A0A0A0', lineHeight: '1.8', fontSize: '0.9rem' },
  form: { display: 'flex', flexDirection: 'column', gap: '20px' },
  formGroup: { display: 'flex', flexDirection: 'column', gap: '8px' },
  label: { color: '#C9A96E', fontWeight: '500', fontSize: '0.85rem' },
  input: { backgroundColor: '#1A1A1E', border: '1px solid #2a2a2e', borderRadius: '12px', padding: '14px 18px', color: '#F5F5F5', fontSize: '0.95rem' },
  select: { backgroundColor: '#1A1A1E', border: '1px solid #2a2a2e', borderRadius: '12px', padding: '14px 18px', color: '#F5F5F5', fontSize: '0.95rem', cursor: 'pointer' },
  warning: { color: '#C9A96E', fontSize: '0.8rem', marginTop: '5px' },
  success: { color: '#2EC4B6', textAlign: 'center', marginTop: '15px' },
  error: { color: '#EF4444', textAlign: 'center', marginTop: '15px' },
  submitBtn: { marginTop: '10px', width: '100%' }
}

export default Contact
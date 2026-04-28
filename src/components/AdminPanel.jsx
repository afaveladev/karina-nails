import { useState, useEffect } from 'react'
import { database, ref, get, remove, push, set } from '../firebase/firebase'
import { FaUsers, FaCalendarCheck, FaChartLine, FaCrown, FaTrash, FaEdit, FaPlus, FaDownload, FaReply, FaStar } from 'react-icons/fa'
import * as XLSX from 'xlsx'

const AdminPanel = () => {
  const [appointments, setAppointments] = useState([])
  const [filteredAppointments, setFilteredAppointments] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')
  const [stats, setStats] = useState({ today: 0, week: 0, month: 0, total: 0 })
  const [services, setServices] = useState([])
  const [editingService, setEditingService] = useState(null)
  const [showServiceModal, setShowServiceModal] = useState(false)
  const [reviews, setReviews] = useState([])
  const [showReviewModal, setShowReviewModal] = useState(false)
  const [replyText, setReplyText] = useState('')
  const [vipClients, setVipClients] = useState([])

  const defaultServices = [
    { id: 1, name: 'Uñas Acrílicas', price: 350, duration: '1.5 hrs', description: 'Durabilidad y elegancia' },
    { id: 2, name: 'Uñas de Gel', price: 300, duration: '1 hr', description: 'Brillo natural' },
    { id: 3, name: 'Pestañas Clásicas', price: 400, duration: '1.5 hrs', description: 'Mirada espectacular' },
    { id: 4, name: 'Pestañas Volumen', price: 500, duration: '2 hrs', description: 'Volumen impactante' },
    { id: 5, name: 'Perfilado de Cejas', price: 150, duration: '30 min', description: 'Cejas perfectas' },
    { id: 6, name: 'Combo Uñas + Pestañas', price: 700, duration: '3 hrs', description: 'Precio especial' }
  ]

  useEffect(() => { loadAppointments(); loadServices(); loadReviews(); loadVipClients() }, [])
  useEffect(() => { filterAppointments() }, [filter, appointments])

  const loadAppointments = async () => {
    try {
      const snapshot = await get(ref(database, 'appointments'))
      const data = []
      snapshot.forEach((child) => data.push({ id: child.key, ...child.val() }))
      data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      setAppointments(data)
      calculateStats(data)
      setLoading(false)
    } catch (error) { setLoading(false) }
  }

  const calculateStats = (data) => {
    const today = new Date().toISOString().split('T')[0]
    const weekAgo = new Date(); weekAgo.setDate(weekAgo.getDate() - 7)
    const monthAgo = new Date(); monthAgo.setMonth(monthAgo.getMonth() - 1)
    setStats({
      today: data.filter(a => a.date === today).length,
      week: data.filter(a => new Date(a.date) >= weekAgo).length,
      month: data.filter(a => new Date(a.date) >= monthAgo).length,
      total: data.length
    })
  }

  const filterAppointments = () => {
    const today = new Date().toISOString().split('T')[0]
    const weekAgo = new Date(); weekAgo.setDate(weekAgo.getDate() - 7)
    const monthAgo = new Date(); monthAgo.setMonth(monthAgo.getMonth() - 1)
    let filtered = [...appointments]
    if (filter === 'today') filtered = appointments.filter(a => a.date === today)
    if (filter === 'week') filtered = appointments.filter(a => new Date(a.date) >= weekAgo)
    if (filter === 'month') filtered = appointments.filter(a => new Date(a.date) >= monthAgo)
    setFilteredAppointments(filtered)
  }

  const deleteAppointment = async (id, clientName) => {
    if (confirm(`¿Eliminar cita de ${clientName}?`)) {
      await remove(ref(database, `appointments/${id}`))
      loadAppointments()
    }
  }

  const loadServices = () => {
    const saved = localStorage.getItem('karinaServices')
    setServices(saved ? JSON.parse(saved) : defaultServices)
  }

  const saveServices = (newServices) => {
    setServices(newServices)
    localStorage.setItem('karinaServices', JSON.stringify(newServices))
    alert('✅ Servicios actualizados')
  }

  const addService = (service) => {
    const newId = Math.max(...services.map(s => s.id), 0) + 1
    saveServices([...services, { ...service, id: newId }])
    setShowServiceModal(false)
  }

  const updateService = (service) => {
    saveServices(services.map(s => s.id === service.id ? service : s))
    setEditingService(null)
    setShowServiceModal(false)
  }

  const deleteService = (id) => {
    if (confirm('¿Eliminar este servicio?')) saveServices(services.filter(s => s.id !== id))
  }

  const loadReviews = () => {
    const saved = localStorage.getItem('karinaReviews')
    const sampleReviews = [
      { id: 1, name: 'María González', rating: 5, text: 'Excelente servicio', date: '2024-03-15', replied: false, reply: '' },
      { id: 2, name: 'Laura Martínez', rating: 5, text: 'Las pestañas me duraron mucho', date: '2024-03-10', replied: false, reply: '' }
    ]
    setReviews(saved ? JSON.parse(saved) : sampleReviews)
  }

  const replyToReview = (reviewId, reply) => {
    const updated = reviews.map(r => r.id === reviewId ? { ...r, replied: true, reply, replyDate: new Date().toISOString() } : r)
    setReviews(updated)
    localStorage.setItem('karinaReviews', JSON.stringify(updated))
    alert('✅ Respuesta guardada')
    setShowReviewModal(false)
    setReplyText('')
  }

  const loadVipClients = () => {
    const saved = localStorage.getItem('karinaVIPs')
    setVipClients(saved ? JSON.parse(saved) : [])
  }

  const toggleVipClient = (client) => {
    let updated
    if (vipClients.find(v => v.phone === client.phone)) {
      updated = vipClients.filter(v => v.phone !== client.phone)
    } else {
      updated = [...vipClients, { name: client.name, phone: client.phone, since: new Date().toISOString() }]
    }
    setVipClients(updated)
    localStorage.setItem('karinaVIPs', JSON.stringify(updated))
  }

  const exportToExcel = () => {
    const exportData = filteredAppointments.map(a => ({
      'Cliente': a.name, 'Teléfono': a.phone, 'Servicio': a.service, 'Fecha': a.date, 'Hora': a.time
    }))
    const ws = XLSX.utils.json_to_sheet(exportData)
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, 'Citas')
    XLSX.writeFile(wb, `citas_${new Date().toISOString().split('T')[0]}.xlsx`)
    alert('📎 Citas exportadas a Excel')
  }

  if (loading) return <div style={styles.loading}>Cargando panel...</div>

  return (
    <div style={styles.adminPanel}>
      <div style={styles.header}>
        <div><h1 style={styles.title}>Panel de Administración</h1><p style={styles.subtitle}>Gestiona citas, servicios y clientes</p></div>
        <button onClick={exportToExcel} style={styles.exportBtn}><FaDownload /> Exportar a Excel</button>
      </div>
      <div style={styles.statsGrid}>
        <div style={styles.statCard}><div style={styles.statIcon}><FaCalendarCheck /></div><div><h3>Citas Hoy</h3><p style={styles.statNumber}>{stats.today}</p></div></div>
        <div style={styles.statCard}><div style={styles.statIcon}><FaChartLine /></div><div><h3>Esta Semana</h3><p style={styles.statNumber}>{stats.week}</p></div></div>
        <div style={styles.statCard}><div style={styles.statIcon}><FaChartLine /></div><div><h3>Este Mes</h3><p style={styles.statNumber}>{stats.month}</p></div></div>
        <div style={styles.statCard}><div style={styles.statIcon}><FaUsers /></div><div><h3>Total Clientes</h3><p style={styles.statNumber}>{stats.total}</p></div></div>
      </div>
      <div style={styles.filters}>
        {['all', 'today', 'week', 'month'].map(f => (<button key={f} onClick={() => setFilter(f)} style={{ ...styles.filterBtn, ...(filter === f && styles.filterBtnActive) }}>{f === 'all' ? 'Todas' : f === 'today' ? 'Hoy' : f === 'week' ? 'Esta semana' : 'Este mes'}</button>))}
      </div>
      <div style={styles.tableContainer}>
        <h3>Citas ({filteredAppointments.length})</h3>
        <div style={styles.tableWrapper}><table style={styles.table}><thead><tr><th>Cliente</th><th>Teléfono</th><th>Servicio</th><th>Fecha</th><th>Hora</th><th>VIP</th><th>Acciones</th></tr></thead><tbody>{filteredAppointments.map(a => (<tr key={a.id}><td><strong>{a.name}</strong></td><td>{a.phone}</td><td>{a.service}</td><td>{a.date}</td><td>{a.time}</td><td><button onClick={() => toggleVipClient(a)} style={vipClients.find(v => v.phone === a.phone) ? styles.vipBtnActive : styles.vipBtn}><FaCrown /> {vipClients.find(v => v.phone === a.phone) ? 'VIP' : 'Marcar'}</button></td><td><button onClick={() => deleteAppointment(a.id, a.name)} style={styles.deleteBtn}><FaTrash /></button></td></tr>))}</tbody></table></div>
      </div>
      <div style={styles.servicesSection}>
        <div style={styles.sectionHeader}><h3>Gestión de Servicios</h3><button onClick={() => { setEditingService(null); setShowServiceModal(true) }} style={styles.addBtn}><FaPlus /> Agregar</button></div>
        <div style={styles.servicesGrid}>{services.map(s => (<div key={s.id} style={styles.serviceCard}><h4>{s.name}</h4><p>Precio: ${s.price}</p><p>Duración: {s.duration}</p><div style={styles.serviceActions}><button onClick={() => { setEditingService(s); setShowServiceModal(true) }} style={styles.editBtn}><FaEdit /></button><button onClick={() => deleteService(s.id)} style={styles.deleteBtn}><FaTrash /></button></div></div>))}</div>
      </div>
      <div style={styles.reviewsSection}><h3>Reseñas</h3><div style={styles.reviewsGrid}>{reviews.map(r => (<div key={r.id} style={styles.reviewCard}><div style={styles.reviewHeader}><div><strong>{r.name}</strong><div style={styles.reviewStars}>{[...Array(5)].map((_, i) => (<FaStar key={i} color={i < r.rating ? '#C9A96E' : '#333'} size={14} />))}</div></div><small>{r.date}</small></div><p>"{r.text}"</p>{r.replied ? <div style={styles.replyBox}><strong>Respuesta:</strong><p>{r.reply}</p></div> : <button onClick={() => setShowReviewModal(r)} style={styles.replyBtn}><FaReply /> Responder</button>}</div>))}</div></div>
    </div>
  )
}

const styles = {
  adminPanel: { padding: '30px', maxWidth: '1400px', margin: '0 auto' },
  loading: { display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', flexWrap: 'wrap', gap: '20px' },
  title: { fontSize: '28px', fontFamily: 'Playfair Display, serif', color: '#2EC4B6' },
  subtitle: { color: '#A0A0A0', fontSize: '14px' },
  exportBtn: { display: 'flex', alignItems: 'center', gap: '8px', background: '#2EC4B6', border: 'none', padding: '10px 20px', borderRadius: '10px', color: '#fff', cursor: 'pointer' },
  statsGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '30px' },
  statCard: { display: 'flex', alignItems: 'center', gap: '15px', background: '#111', padding: '20px', borderRadius: '15px', border: '1px solid #222' },
  statIcon: { fontSize: '30px', color: '#2EC4B6' },
  statNumber: { fontSize: '28px', fontWeight: 'bold', color: '#C9A96E', fontFamily: 'Playfair Display, serif' },
  filters: { display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' },
  filterBtn: { background: '#1A1A1E', border: '1px solid #333', padding: '8px 20px', borderRadius: '20px', color: '#fff', cursor: 'pointer' },
  filterBtnActive: { background: '#2EC4B6', color: '#000' },
  tableContainer: { background: '#111', borderRadius: '15px', padding: '20px', marginBottom: '30px' },
  tableWrapper: { overflowX: 'auto' },
  table: { width: '100%', borderCollapse: 'collapse' },
  servicesSection: { marginBottom: '30px' },
  sectionHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' },
  addBtn: { display: 'flex', alignItems: 'center', gap: '8px', background: '#2EC4B6', border: 'none', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer' },
  servicesGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' },
  serviceCard: { background: '#111', padding: '20px', borderRadius: '15px', border: '1px solid #222' },
  serviceActions: { display: 'flex', gap: '10px', marginTop: '15px' },
  editBtn: { background: '#C9A96E', border: 'none', padding: '8px', borderRadius: '8px', cursor: 'pointer' },
  deleteBtn: { background: '#ff4d4d', border: 'none', padding: '8px', borderRadius: '8px', cursor: 'pointer', color: '#fff' },
  vipBtn: { background: 'transparent', border: '1px solid #C9A96E', padding: '5px 10px', borderRadius: '20px', cursor: 'pointer', color: '#C9A96E', fontSize: '12px' },
  vipBtnActive: { background: '#C9A96E', border: 'none', padding: '5px 10px', borderRadius: '20px', cursor: 'pointer', color: '#000', fontSize: '12px' },
  reviewsSection: { marginBottom: '30px' },
  reviewsGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '20px' },
  reviewCard: { background: '#111', padding: '20px', borderRadius: '15px', border: '1px solid #222' },
  reviewHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' },
  reviewStars: { display: 'flex', gap: '3px', marginTop: '5px' },
  replyBox: { background: '#1A1A1E', padding: '15px', borderRadius: '10px', marginTop: '10px' },
  replyBtn: { display: 'flex', alignItems: 'center', gap: '8px', background: '#C9A96E', border: 'none', padding: '6px 12px', borderRadius: '8px', cursor: 'pointer' }
}

export default AdminPanel
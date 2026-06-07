import { useEffect, useState } from 'react'
import { supabase } from './lib/supabase'

// ── Styles ──────────────────────────────────────────────────
const styles = {
  app: {
    minHeight: '100vh',
    background: '#0f172a',
    fontFamily: 'sans-serif',
    color: 'white',
    padding: '2rem',
  },
  header: {
    textAlign: 'center',
    marginBottom: '2rem',
  },
  title: {
    fontSize: '2.5rem',
    color: '#22d3ee',
    margin: 0,
  },
  subtitle: {
    color: '#94a3b8',
    marginTop: '0.5rem',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '2rem',
    maxWidth: '1100px',
    margin: '0 auto',
  },
  section: {
    background: '#1e293b',
    borderRadius: '12px',
    padding: '1.5rem',
  },
  sectionTitle: {
    fontSize: '1.1rem',
    fontWeight: 'bold',
    color: '#22d3ee',
    marginBottom: '1rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  card: {
    background: '#0f172a',
    borderRadius: '8px',
    padding: '1rem',
    marginBottom: '0.75rem',
    borderLeft: '3px solid #22d3ee',
  },
  cardName: {
    fontWeight: 'bold',
    marginBottom: '0.25rem',
  },
  cardDetail: {
    fontSize: '0.85rem',
    color: '#94a3b8',
  },
  badge: (available) => ({
    display: 'inline-block',
    padding: '0.15rem 0.5rem',
    borderRadius: '999px',
    fontSize: '0.75rem',
    fontWeight: 'bold',
    background: available ? '#14532d' : '#450a0a',
    color: available ? '#86efac' : '#fca5a5',
    marginTop: '0.25rem',
  }),
  loading: {
    textAlign: 'center',
    color: '#94a3b8',
    padding: '2rem',
  },
  error: {
    textAlign: 'center',
    color: '#fca5a5',
    padding: '2rem',
  },
  footer: {
    textAlign: 'center',
    marginTop: '2rem',
    color: '#475569',
    fontSize: '0.8rem',
  },
}

// ── Components ───────────────────────────────────────────────
function DriverCard({ driver }) {
  return (
    <div style={styles.card}>
      <div style={styles.cardName}>{driver.name}</div>
      <div style={styles.cardDetail}>{driver.vehicle_model} — {driver.vehicle_plate}</div>
      <div style={styles.cardDetail}>Rating: {driver.rating} ⭐</div>
      <span style={styles.badge(driver.is_available)}>
        {driver.is_available ? 'Available' : 'Unavailable'}
      </span>
    </div>
  )
}

function RiderCard({ rider }) {
  return (
    <div style={styles.card}>
      <div style={styles.cardName}>{rider.name}</div>
      <div style={styles.cardDetail}>{rider.email}</div>
      <div style={styles.cardDetail}>{rider.phone}</div>
      <div style={styles.cardDetail}>Rating: {rider.rating} ⭐</div>
    </div>
  )
}

// ── Main App ─────────────────────────────────────────────────
function App() {
  const [drivers, setDrivers] = useState([])
  const [riders, setRiders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch drivers and riders in parallel
        const [driversRes, ridersRes] = await Promise.all([
          supabase.from('drivers').select('*').order('rating', { ascending: false }),
          supabase.from('riders').select('*').order('rating', { ascending: false }),
        ])

        if (driversRes.error) throw driversRes.error
        if (ridersRes.error)  throw ridersRes.error

        setDrivers(driversRes.data)
        setRiders(ridersRes.data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) return <div style={styles.app}><p style={styles.loading}>Loading GoRide data...</p></div>
  if (error)   return <div style={styles.app}><p style={styles.error}>Error: {error}</p></div>

  return (
    <div style={styles.app}>
      <div style={styles.header}>
        <h1 style={styles.title}>🚗 GoRide</h1>
        <p style={styles.subtitle}>Live Dashboard — Powered by Supabase</p>
      </div>

      <div style={styles.grid}>
        <div style={styles.section}>
          <div style={styles.sectionTitle}>🚙 Drivers ({drivers.length})</div>
          {drivers.map(d => <DriverCard key={d.id} driver={d} />)}
        </div>

        <div style={styles.section}>
          <div style={styles.sectionTitle}>👤 Riders ({riders.length})</div>
          {riders.map(r => <RiderCard key={r.id} rider={r} />)}
        </div>
      </div>

      <div style={styles.footer}>
        Deployed via GitHub Actions → Vercel | Backend: Supabase (Singapore)
      </div>
    </div>
  )
}

export default App

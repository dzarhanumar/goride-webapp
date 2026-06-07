function App() {
  return (
    <div style={{
      minHeight: '100vh',
      background: '#0f172a',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'sans-serif'
    }}>
      <div style={{ textAlign: 'center', color: 'white' }}>
        <h1 style={{ fontSize: '3rem', color: '#22d3ee' }}>GoRide</h1>
        <p style={{ fontSize: '1.2rem', color: '#94a3b8' }}>
          Your ride, your way. Anytime, anywhere.
        </p>
        <p style={{
          marginTop: '2rem',
          padding: '0.5rem 1.5rem',
          background: '#22d3ee',
          color: '#0f172a',
          borderRadius: '8px',
          display: 'inline-block',
          fontWeight: 'bold'
        }}>
          Book a Ride
        </p>
        <p style={{ marginTop: '3rem', fontSize: '0.8rem', color: '#475569' }}>
          Deployed via GitHub Actions and Vercel
        </p>
      </div>
    </div>
  )
}

export default App

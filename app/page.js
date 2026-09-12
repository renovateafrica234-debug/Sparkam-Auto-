export default function HomePage() {
  return (
    <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
      <h1 style={{ fontSize: '1.75rem', fontWeight: 'bold', marginBottom: '1.5rem', textAlign: 'center' }}>
        Sparkam Auto Live - App ID 1408305487572055
      </h1>
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
        <a
          href="/api/auth/signin"
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: '#00FF85',
            color: '#000000',
            fontWeight: '600',
            borderRadius: '6px',
            textDecoration: 'none'
          }}
        >
          Sign In (/api/auth/signin)
        </a>
        <a
          href="/api/post"
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: '#222222',
            color: '#FFFFFF',
            fontWeight: '600',
            borderRadius: '6px',
            textDecoration: 'none',
            border: '1px solid #444444'
          }}
        >
          Check Status (/api/post)
        </a>
      </div>
    </main>
  );
}

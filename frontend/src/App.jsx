function App() {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'var(--space-lg)',
        textAlign: 'center',
      }}
    >
      <h1 style={{ color: 'var(--color-primary)', marginBottom: 'var(--space-sm)' }}>
        HealthMate AI
      </h1>
      <p style={{ color: 'var(--color-text-secondary)', maxWidth: '480px' }}>
        Design system ready. Pages and routing will be built next.
      </p>
    </div>
  );
}

export default App;
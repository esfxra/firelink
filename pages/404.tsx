import Link from 'next/link';

export default function Custom404() {
  return (
    <div
      style={{
        display: 'flex',
        height: '100vh',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          width: '40%',
          margin: '0 auto',
          borderRadius: 10,
          padding: 15,
          backgroundColor: 'var(--elevation-background)',
          boxShadow: 'var(--elevation-shadow)',
        }}
      >
        <h1 style={{ margin: 0, color: 'var(--accent)' }}>Not found.</h1>
        <p>
          Go back to{' '}
          <Link href="/">
            <a style={{ color: 'var(--accent)' }}> campfire's homepage</a>
          </Link>
          .
        </p>

        <p style={{ marginBottom: 0 }}>
          Or{' '}
          <Link href="/access">
            <a style={{ color: 'var(--accent)' }}>create an account</a>
          </Link>
          .
        </p>
      </div>
    </div>
  );
}

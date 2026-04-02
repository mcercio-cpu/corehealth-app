import { useEffect } from 'react';
import logoCrimson from '../../assets/logo-crimson.png';

export default function SplashScreen({ onFinish }) {
  useEffect(() => {
    const timer = setTimeout(onFinish, 2800);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div style={{
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(160deg, #590212 0%, #A63F52 60%, #D96C80 100%)',
      gap: 28,
      padding: 40,
    }}>
      {/* Logo */}
      <div style={{ animation: 'fadeIn 0.8s ease forwards' }}>
        <img
          src={logoCrimson}
          alt="CoreHealth"
          style={{
            width: 100,
            height: 100,
            borderRadius: 24,
            background: '#fff',
            padding: 6,
            animation: 'pulse 2s ease-in-out infinite',
            boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
          }}
        />
      </div>

      {/* Brand name */}
      <div style={{ animation: 'fadeIn 0.8s ease 0.3s both', textAlign: 'center' }}>
        <div style={{
          fontSize: 36,
          fontWeight: 800,
          color: '#FFFFFF',
          letterSpacing: '-0.5px',
          lineHeight: 1,
        }}>
          CoreHealth
        </div>
        <div style={{
          fontSize: 14,
          color: 'rgba(255,255,255,0.7)',
          marginTop: 8,
          fontWeight: 400,
          letterSpacing: '0.3px',
        }}>
          Saúde para todos.
        </div>
      </div>

      {/* Loading indicator */}
      <div style={{
        marginTop: 40,
        animation: 'fadeIn 0.8s ease 0.8s both',
        display: 'flex',
        gap: 8,
      }}>
        {[0, 1, 2].map(i => (
          <span key={i} style={{
            width: 8,
            height: 8,
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.5)',
            animation: `wave 1s ease ${i * 0.2}s infinite`,
            display: 'block',
          }} />
        ))}
      </div>
    </div>
  );
}

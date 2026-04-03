import { useEffect, useState } from 'react';
import logoCrimson from '../../assets/logo-crimson.png';

export default function SplashScreen({ onFinish, lang, setLang }) {
  const [selected, setSelected] = useState(lang || 'pt');
  const [showLang, setShowLang] = useState(false);

  useEffect(() => {
    const revealTimer = setTimeout(() => setShowLang(true), 1200);
    return () => clearTimeout(revealTimer);
  }, []);

  const handleSelect = (l) => {
    setSelected(l);
    setLang(l);
    setTimeout(() => onFinish(l), 400);
  };

  return (
    <div style={{
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(160deg, #590212 0%, #A63F52 60%, #D96C80 100%)',
      padding: 40,
      position: 'relative',
      gap: 0,
    }}>
      {/* Logo */}
      <div style={{ animation: 'fadeIn 0.8s ease forwards', marginBottom: 24 }}>
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
      <div style={{ animation: 'fadeIn 0.8s ease 0.3s both', textAlign: 'center', marginBottom: 48 }}>
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
          {selected === 'en' ? 'Health for everyone.' : 'Saúde para todos.'}
        </div>
      </div>

      {/* Language toggle — inline, prominent */}
      <div style={{
        opacity: showLang ? 1 : 0,
        transform: showLang ? 'translateY(0)' : 'translateY(12px)',
        transition: 'opacity 0.5s ease, transform 0.5s ease',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 14,
      }}>
        <div style={{
          fontSize: 13,
          color: 'rgba(255,255,255,0.7)',
          fontWeight: 500,
          letterSpacing: '0.3px',
        }}>
          {selected === 'en' ? 'Choose your language' : 'Escolhe o idioma'}
        </div>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          background: 'rgba(255,255,255,0.15)',
          backdropFilter: 'blur(8px)',
          borderRadius: 50,
          padding: '4px',
          gap: 2,
          border: '1px solid rgba(255,255,255,0.3)',
        }}>
          {['pt', 'en'].map(l => (
            <button
              key={l}
              onClick={() => handleSelect(l)}
              style={{
                background: selected === l ? '#fff' : 'transparent',
                color: selected === l ? '#590212' : 'rgba(255,255,255,0.75)',
                border: 'none',
                borderRadius: 50,
                padding: '10px 28px',
                fontSize: 15,
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.25s',
                letterSpacing: '0.5px',
                minWidth: 72,
              }}
            >
              {l.toUpperCase()}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

import { useEffect, useState } from 'react';
import logoCrimson from '../../assets/logo-crimson.png';

export default function SplashScreen({ onFinish, lang, setLang }) {
  const [selected, setSelected] = useState(lang || 'pt');
  const [showLang, setShowLang] = useState(false);

  useEffect(() => {
    // Reveal language toggle after 1s
    const revealTimer = setTimeout(() => setShowLang(true), 1000);
    // Auto-advance after 2.8s
    const autoTimer = setTimeout(() => onFinish(selected), 2800);
    return () => { clearTimeout(revealTimer); clearTimeout(autoTimer); };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSelect = (l) => {
    setSelected(l);
    setLang(l);
    // Small delay so user sees the highlight before advancing
    setTimeout(() => onFinish(l), 420);
  };

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
      position: 'relative',
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
          {selected === 'en' ? 'Health for everyone.' : 'Saúde para todos.'}
        </div>
      </div>

      {/* Loading dots */}
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

      {/* Language toggle pill */}
      <div style={{
        position: 'absolute',
        bottom: 48,
        left: '50%',
        transform: 'translateX(-50%)',
        opacity: showLang ? 1 : 0,
        transition: 'opacity 0.5s ease',
        display: 'flex',
        alignItems: 'center',
        background: 'rgba(255,255,255,0.15)',
        backdropFilter: 'blur(8px)',
        borderRadius: 50,
        padding: '4px',
        gap: 2,
        border: '1px solid rgba(255,255,255,0.25)',
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
              padding: '7px 18px',
              fontSize: 13,
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'all 0.25s',
              letterSpacing: '0.5px',
              minWidth: 52,
            }}
          >
            {l.toUpperCase()}
          </button>
        ))}
      </div>
    </div>
  );
}

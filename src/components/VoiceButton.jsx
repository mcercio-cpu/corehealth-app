import { useState, useEffect, useRef } from 'react';

export default function VoiceButton({ size = 'lg', onPress, isListening = false, label = 'Falar Comigo' }) {
  const [active, setActive] = useState(isListening);
  const intervalRef = useRef(null);

  useEffect(() => {
    setActive(isListening);
  }, [isListening]);

  const sizeMap = {
    sm: { outer: 80, inner: 60, icon: '24px', font: '11px' },
    md: { outer: 110, inner: 84, icon: '32px', font: '12px' },
    lg: { outer: 140, inner: 108, icon: '42px', font: '14px' },
    xl: { outer: 180, inner: 140, icon: '54px', font: '16px' },
  };
  const s = sizeMap[size];

  const handlePress = () => {
    setActive(prev => !prev);
    if (onPress) onPress(!active);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
      <button
        onClick={handlePress}
        style={{
          position: 'relative',
          width: s.outer,
          height: s.outer,
          borderRadius: '50%',
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 0,
        }}
      >
        {/* Pulse ring 1 */}
        {active && (
          <span style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '50%',
            background: active ? 'rgba(166,63,82,0.15)' : 'rgba(166,63,82,0.08)',
            animation: 'pulseRing 1.8s ease-out infinite',
            animationDelay: '0s',
          }} />
        )}
        {/* Pulse ring 2 */}
        {active && (
          <span style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '50%',
            background: 'rgba(166,63,82,0.12)',
            animation: 'pulseRing 1.8s ease-out infinite',
            animationDelay: '0.6s',
          }} />
        )}

        {/* Outer circle (subtle) */}
        <span style={{
          position: 'absolute',
          width: s.outer,
          height: s.outer,
          borderRadius: '50%',
          border: `2px solid ${active ? 'rgba(166,63,82,0.3)' : 'rgba(166,63,82,0.15)'}`,
          transition: 'border-color 0.3s',
        }} />

        {/* Main button */}
        <span style={{
          width: s.inner,
          height: s.inner,
          borderRadius: '50%',
          background: active
            ? 'linear-gradient(145deg, #A63F52, #590212)'
            : 'linear-gradient(145deg, #D96C80, #A63F52)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: active
            ? '0 8px 32px rgba(89,2,18,0.5), 0 0 0 3px rgba(166,63,82,0.3)'
            : '0 6px 24px rgba(89,2,18,0.3)',
          animation: active ? 'pulse 1.4s ease-in-out infinite' : 'none',
          transition: 'all 0.3s ease',
          flexDirection: 'column',
          gap: 2,
        }}>
          <span style={{ fontSize: s.icon, lineHeight: 1 }}>🎤</span>
        </span>
      </button>

      {/* Wave bars when listening */}
      {active && (
        <div style={{ display: 'flex', gap: 4, alignItems: 'flex-end', height: 28 }}>
          {[0, 1, 2, 3, 4].map(i => (
            <span key={i} style={{
              width: 4,
              height: `${12 + Math.random() * 16}px`,
              background: 'var(--wine-md)',
              borderRadius: 3,
              animation: `wave 0.8s ease-in-out ${i * 0.12}s infinite`,
              display: 'block',
            }} />
          ))}
        </div>
      )}

      {/* Label */}
      <span style={{
        fontSize: s.font,
        fontWeight: 600,
        color: active ? 'var(--wine-md)' : 'var(--muted)',
        letterSpacing: '0.3px',
        transition: 'color 0.3s',
      }}>
        {active ? 'A ouvir...' : label}
      </span>
    </div>
  );
}

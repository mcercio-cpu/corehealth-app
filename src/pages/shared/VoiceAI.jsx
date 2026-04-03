import { useState, useEffect, useRef } from 'react';
import StatusBar from '../../components/StatusBar';

const dialogues = {
  senior: {
    pt: [
      { from: 'user', text: 'Já tomei a minha medicação esta manhã.', delay: 2000 },
      { from: 'core', text: 'Óptimo, Dona Rosa! Registei a sua medicação de manhã. ✅', delay: 3800 },
      { from: 'user', text: 'A minha tensão estava a 140 e o açúcar a 156 hoje.', delay: 6000 },
      { from: 'core', text: 'Obrigada. A tensão está ligeiramente elevada. Quer que avise o Ricardo?', delay: 8200 },
      { from: 'user', text: 'Sim, por favor.', delay: 10200 },
      { from: 'core', text: 'Feito! O Ricardo foi notificado. Beba água e descanse um pouco. 💙', delay: 11800 },
    ],
    en: [
      { from: 'user', text: 'I already took my medication this morning.', delay: 2000 },
      { from: 'core', text: "Great, Dona Rosa! I've logged your morning medication. ✅", delay: 3800 },
      { from: 'user', text: 'My blood pressure was 140 and glucose was 156 today.', delay: 6000 },
      { from: 'core', text: 'Thank you. Your BP is slightly elevated. Should I notify Ricardo?', delay: 8200 },
      { from: 'user', text: 'Yes, please.', delay: 10200 },
      { from: 'core', text: 'Done! Ricardo has been notified. Please drink water and rest. 💙', delay: 11800 },
    ],
  },
  adult: {
    pt: [
      { from: 'user', text: 'Como está a minha mãe hoje?', delay: 2000 },
      { from: 'core', text: 'A Dona Rosa está com a glicose ligeiramente alta — 156 mg/dL. Já tomou a medicação.', delay: 3800 },
      { from: 'user', text: 'E as minhas métricas de hoje?', delay: 6000 },
      { from: 'core', text: 'Glicose 95 ✅ · Tensão 125/80 ✅ · Sono 7h32m ✅ — tudo dentro do normal!', delay: 7800 },
      { from: 'user', text: 'Vou tentar caminhar mais esta tarde.', delay: 9800 },
      { from: 'core', text: 'Ótimo! Faltam 1.653 passos para a meta diária. Força, Ricardo! 💪', delay: 11400 },
    ],
    en: [
      { from: 'user', text: 'How is my mum doing today?', delay: 2000 },
      { from: 'core', text: "Dona Rosa's glucose is slightly high — 156 mg/dL. She already took her medication.", delay: 3800 },
      { from: 'user', text: 'What about my own metrics today?', delay: 6000 },
      { from: 'core', text: 'Glucose 95 ✅ · BP 125/80 ✅ · Sleep 7h32m ✅ — all within normal range!', delay: 7800 },
      { from: 'user', text: "I'll try to walk more this afternoon.", delay: 9800 },
      { from: 'core', text: 'Great! You need 1,653 more steps to your daily goal. Keep it up, Ricardo! 💪', delay: 11400 },
    ],
  },
};

export default function VoiceAI({ navigate, lang = 'pt', persona = 'senior' }) {
  const [messages, setMessages] = useState([]);
  const [done, setDone] = useState(false);
  const scrollRef = useRef(null);

  const script = dialogues[persona]?.[lang] || dialogues.senior.pt;
  const isSenior = persona === 'senior';

  useEffect(() => {
    const timers = script.map((line, i) =>
      setTimeout(() => {
        setMessages(prev => [...prev, line]);
        if (i === script.length - 1) setTimeout(() => setDone(true), 1800);
      }, line.delay)
    );
    return () => timers.forEach(clearTimeout);
  }, [persona, lang]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const title       = lang === 'en' ? 'Talk to Core' : 'Fala com a Core';
  const hint        = lang === 'en' ? 'Speak naturally. Core is listening.' : 'Fale naturalmente. A Core está a ouvir.';
  const savedLabel  = lang === 'en' ? '✓ Saved to your record' : '✓ Guardado no registo';
  const endLabel    = lang === 'en' ? 'End conversation' : 'Terminar conversa';
  const backLabel   = lang === 'en' ? '← Back' : '← Voltar';

  return (
    <div className="screen" style={{ background: '#faf8f5', display: 'flex', flexDirection: 'column' }}>
      <style>{`
        @keyframes voiceRing {
          0%   { transform: scale(1);   opacity: 0.55; }
          100% { transform: scale(2.4); opacity: 0; }
        }
        @keyframes voiceBlink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.35; }
        }
        @keyframes msgIn {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <StatusBar />

      {/* Header */}
      <div style={{ padding: '8px 20px 10px', display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
        <button onClick={() => navigate('home')}
          style={{ background: 'transparent', border: 'none', fontSize: 22, cursor: 'pointer', color: '#1a7a5a' }}>←</button>
        <div style={{ flex: 1, fontSize: 18, fontWeight: 800, color: 'var(--ink)' }}>{title}</div>
        {done && (
          <span style={{ fontSize: 11, fontWeight: 700, padding: '4px 10px', borderRadius: 20, background: '#e8f8f0', color: '#1a7a5a' }}>
            {savedLabel}
          </span>
        )}
      </div>

      {/* Pulsing orb */}
      <div style={{ flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 16, paddingBottom: 8 }}>
        <div style={{ position: 'relative', width: 170, height: 170, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {!done && [1, 2, 3].map(i => (
            <div key={i} style={{
              position: 'absolute',
              width: 100, height: 100,
              borderRadius: '50%',
              background: 'rgba(40,168,120,0.18)',
              animation: `voiceRing ${1.1 + i * 0.45}s ease-out infinite`,
              animationDelay: `${(i - 1) * 0.38}s`,
            }} />
          ))}
          <div style={{
            width: 100, height: 100, borderRadius: '50%', zIndex: 1,
            background: done ? '#e8f8f0' : 'linear-gradient(135deg, #1a7a5a, #28a878)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 40,
            boxShadow: done ? 'none' : '0 8px 28px rgba(40,168,120,0.45)',
            transition: 'background 0.6s, box-shadow 0.6s',
          }}>
            {done ? '✅' : '🎙️'}
          </div>
        </div>

        {/* Status label */}
        <div style={{
          marginTop: 10, fontSize: 14, fontWeight: 600,
          color: done ? '#1a7a5a' : 'var(--muted)',
          animation: done ? 'none' : 'voiceBlink 2s ease-in-out infinite',
        }}>
          {done ? savedLabel : (lang === 'en' ? 'Listening...' : 'A ouvir...')}
        </div>
      </div>

      {/* Transcript */}
      <div ref={scrollRef} style={{ flex: 1, overflowY: 'auto', padding: '4px 20px 8px' }}>
        {messages.length === 0 ? (
          <div style={{ textAlign: 'center', fontSize: 13, color: 'var(--muted)', lineHeight: 1.65, paddingTop: 12 }}>
            {hint}
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, paddingBottom: 8 }}>
            {messages.map((msg, i) => {
              const isUser = msg.from === 'user';
              return (
                <div key={i} style={{
                  display: 'flex', alignItems: 'flex-end', gap: 8,
                  flexDirection: isUser ? 'row' : 'row-reverse',
                  animation: 'msgIn 0.4s ease',
                }}>
                  {/* Avatar */}
                  <div style={{
                    width: 30, height: 30, borderRadius: '50%', flexShrink: 0,
                    background: isUser ? 'var(--cream)' : 'linear-gradient(135deg, #1a7a5a, #28a878)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14,
                  }}>
                    {isUser ? (isSenior ? '👵' : '🧑') : '🤖'}
                  </div>
                  {/* Bubble */}
                  <div style={{
                    maxWidth: '74%',
                    background: isUser ? '#fff' : 'linear-gradient(135deg, #1a7a5a, #28a878)',
                    color: isUser ? 'var(--ink)' : '#fff',
                    borderRadius: isUser ? '16px 16px 16px 4px' : '16px 16px 4px 16px',
                    padding: '10px 14px',
                    fontSize: 14, lineHeight: 1.48,
                    border: isUser ? '1px solid var(--border)' : 'none',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.07)',
                  }}>
                    {msg.text}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Bottom button */}
      <div style={{ padding: '10px 20px 28px', flexShrink: 0 }}>
        <button onClick={() => navigate('home')} style={{
          width: '100%',
          background: done ? 'linear-gradient(135deg, #1a7a5a, #28a878)' : '#fff',
          color: done ? '#fff' : '#dc2626',
          border: done ? 'none' : '1.5px solid #fca5a5',
          borderRadius: 18, padding: '16px',
          fontSize: 16, fontWeight: 700, cursor: 'pointer',
          boxShadow: done ? '0 4px 16px rgba(40,168,120,0.4)' : 'none',
          transition: 'all 0.4s',
        }}>
          {done ? backLabel : endLabel}
        </button>
      </div>
    </div>
  );
}

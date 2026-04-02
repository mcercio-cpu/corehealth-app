import { useState, useEffect, useRef } from 'react';
import VoiceButton from '../../components/VoiceButton';
import { translations } from '../../data/translations';

export default function SeniorVoiceFlow({ navigate, lang = 'pt' }) {
  const T = translations[lang];

  const FLOW_STEPS = T.flow.map((f, i) => ({
    id: `step-${i}`,
    appText: f.appText,
    rosaText: f.rosaText,
    state: i === 4 ? 'processing' : i === 6 ? 'success' : i === 5 ? 'speaking' : 'listening',
    icon: i === 6 ? '✅' : i === 4 ? '⚙️' : '💬',
    record: i === 4 ? T.flowRecord : null,
    alert: i === 6 ? T.flowAlert : null,
  }));

  const [step, setStep] = useState(0);
  const [isListening, setIsListening] = useState(false);
  const [showRosa, setShowRosa] = useState(false);
  const [autoPlay] = useState(true);
  const timerRef = useRef(null);

  const current = FLOW_STEPS[step];
  const isLast = step === FLOW_STEPS.length - 1;

  useEffect(() => {
    if (!autoPlay) return;
    if (step === 0) {
      timerRef.current = setTimeout(() => {
        setIsListening(true);
        setShowRosa(false);
      }, 2000);
    }
    return () => clearTimeout(timerRef.current);
  }, [step, autoPlay]);

  const handleNext = () => {
    if (step < FLOW_STEPS.length - 1) {
      setShowRosa(true);
      setTimeout(() => {
        setStep(s => s + 1);
        setShowRosa(false);
        setIsListening(false);
        if (step + 1 < FLOW_STEPS.length - 1) {
          setTimeout(() => setIsListening(true), 1500);
        }
      }, 1200);
    }
  };

  const handleVoicePress = () => {
    setIsListening(prev => !prev);
    if (!isListening && step < FLOW_STEPS.length - 2) {
      setTimeout(() => { handleNext(); }, 2000);
    }
  };

  return (
    <div className="screen" style={{ background: 'var(--cream-lt)' }}>
      {/* Header */}
      <div style={{
        background: `linear-gradient(160deg, #590212, #A63F52)`,
        padding: '44px 20px 20px',
        display: 'flex',
        alignItems: 'center',
        gap: 12,
      }}>
        <button
          onClick={() => navigate('home')}
          style={{ background: 'rgba(255,255,255,0.15)', border: 'none', borderRadius: 10, width: 36, height: 36, cursor: 'pointer', fontSize: 18, color: '#fff' }}
        >
          ←
        </button>
        <div style={{ flex: 1, textAlign: 'center' }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: '#fff' }}>{T.seniorVoiceTitle}</div>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)' }}>
            {T.seniorVoiceStep} {step + 1} {T.seniorVoiceOf} {FLOW_STEPS.length}
          </div>
        </div>
        <div style={{ display: 'flex', gap: 4 }}>
          {FLOW_STEPS.map((_, i) => (
            <div key={i} style={{
              width: 6, height: 6, borderRadius: '50%',
              background: i <= step ? '#fff' : 'rgba(255,255,255,0.3)',
              transition: 'background 0.3s',
            }} />
          ))}
        </div>
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '20px 16px 24px', gap: 16, overflowY: 'auto' }}>

        {/* App message bubble */}
        <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start', animation: 'slideUp 0.4s ease' }}>
          <div style={{
            width: 36, height: 36, borderRadius: '50%',
            background: 'linear-gradient(135deg, #590212, #A63F52)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 18, flexShrink: 0,
          }}>
            {current.state === 'success' ? '✅' : current.state === 'processing' ? '⚙️' : '🤖'}
          </div>
          <div style={{
            background: '#fff',
            border: '1px solid var(--border)',
            borderRadius: '4px 18px 18px 18px',
            padding: '14px 16px',
            maxWidth: '80%',
            boxShadow: 'var(--shadow-sm)',
          }}>
            <div style={{ fontSize: 15, color: 'var(--ink)', lineHeight: 1.55, fontWeight: 500 }}>
              {current.appText}
            </div>
          </div>
        </div>

        {/* Rosa's previous reply */}
        {current.rosaText && (
          <div style={{ display: 'flex', justifyContent: 'flex-end', animation: 'slideUp 0.4s ease 0.1s both' }}>
            <div style={{
              background: 'var(--wine-md)',
              borderRadius: '18px 4px 18px 18px',
              padding: '12px 16px',
              maxWidth: '78%',
              color: '#fff',
            }}>
              <div style={{ fontSize: 14, lineHeight: 1.5 }}>"{current.rosaText}"</div>
              <div style={{ fontSize: 10, opacity: 0.7, marginTop: 4 }}>{T.seniorVoiceRosaLabel}</div>
            </div>
          </div>
        )}

        {/* Processing record card */}
        {current.record && (
          <div style={{
            background: '#fff',
            borderRadius: 18,
            padding: '16px',
            border: '1.5px solid var(--warning-bg)',
            animation: 'fadeIn 0.5s ease',
          }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#F5A623', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 6 }}>
              {T.seniorVoiceRecordLabel}
            </div>
            {Object.entries(current.record).map(([key, val]) => (
              <div key={key} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid var(--border-lt)', fontSize: 13 }}>
                <span style={{ color: 'var(--muted)', textTransform: 'capitalize' }}>{key.replace(/([A-Z])/g, ' $1')}</span>
                <span style={{ color: 'var(--ink)', fontWeight: 600 }}>{val}</span>
              </div>
            ))}
          </div>
        )}

        {/* Alert sent card */}
        {current.alert && (
          <div style={{
            background: '#e8f8f0',
            border: '1.5px solid #a7ddc4',
            borderRadius: 18,
            padding: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: 14,
            animation: 'fadeIn 0.5s ease 0.3s both',
          }}>
            <span style={{ fontSize: 32 }}>📱</span>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#1a7a5a' }}>{current.alert.titulo}</div>
              <div style={{ fontSize: 12, color: '#1a7a5a', marginTop: 3 }}>{current.alert.mensagem}</div>
            </div>
          </div>
        )}

        <div style={{ flex: 1 }} />

        {/* Voice button / State display */}
        {current.state !== 'processing' && current.state !== 'success' && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
            {current.state === 'listening' && (
              <>
                <div style={{ fontSize: 13, color: 'var(--muted)', fontWeight: 500 }}>
                  {isListening ? T.seniorVoiceListening : T.seniorVoiceTap}
                </div>
                <VoiceButton size="lg" isListening={isListening} onPress={handleVoicePress} label={lang === 'en' ? 'Speak' : 'Falar'} />
              </>
            )}
            {current.state === 'speaking' && (
              <div style={{ textAlign: 'center', padding: '10px' }}>
                <div style={{ fontSize: 40, marginBottom: 12 }}>💬</div>
                <div style={{ fontSize: 14, color: 'var(--muted)' }}>{T.seniorVoiceSpeaking}</div>
              </div>
            )}
          </div>
        )}

        {current.state === 'processing' && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
            <div style={{
              width: 60, height: 60,
              border: '4px solid var(--cream)',
              borderTop: '4px solid #F5A623',
              borderRadius: '50%',
              animation: 'spin 0.8s linear infinite',
            }} />
            <div style={{ fontSize: 14, color: 'var(--muted)' }}>{T.seniorVoiceProcessing}</div>
          </div>
        )}

        {current.state === 'success' && (
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 64, marginBottom: 10 }}>✅</div>
            <div style={{ fontSize: 16, fontWeight: 700, color: '#1a7a5a' }}>{T.seniorVoiceAllDone}</div>
          </div>
        )}

        {/* Action buttons */}
        <div style={{ display: 'flex', gap: 10, marginTop: 8 }}>
          {!isLast ? (
            <button
              onClick={handleNext}
              style={{
                flex: 1, background: 'var(--wine-md)', color: '#fff',
                border: 'none', borderRadius: 16, padding: '16px', fontSize: 15,
                fontWeight: 700, cursor: 'pointer', boxShadow: '0 4px 16px rgba(166,63,82,0.35)',
              }}
            >
              {T.seniorVoiceNext}
            </button>
          ) : (
            <button
              onClick={() => navigate('home')}
              style={{
                flex: 1, background: '#28a878', color: '#fff',
                border: 'none', borderRadius: 16, padding: '16px', fontSize: 15,
                fontWeight: 700, cursor: 'pointer', boxShadow: '0 4px 16px rgba(40,168,120,0.35)',
              }}
            >
              {T.seniorVoiceDone}
            </button>
          )}
        </div>

        {isLast && (
          <button
            onClick={() => navigate('historico')}
            style={{
              width: '100%', background: 'transparent',
              border: '1.5px solid var(--border)', borderRadius: 16,
              padding: '13px', fontSize: 14, fontWeight: 600, color: 'var(--wine-md)', cursor: 'pointer',
            }}
          >
            {T.seniorVoiceHistory}
          </button>
        )}
      </div>
    </div>
  );
}

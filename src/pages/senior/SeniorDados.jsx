import { useState } from 'react';
import StatusBar from '../../components/StatusBar';
import BottomNavSenior from '../../components/BottomNavSenior';
import MiniLogo from '../../components/MiniLogo';
import { translations } from '../../data/translations';

export default function SeniorDados({ navigate, lang = 'pt' }) {
  const T = translations[lang];
  const [systolic, setSystolic] = useState(140);
  const [diastolic, setDiastolic] = useState(90);
  const [glucose, setGlucose] = useState(156);
  const [saved, setSaved] = useState(false);
  const [medTaken, setMedTaken] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const NumInput = ({ label, value, setValue, unit, min = 50, max = 300, step = 1 }) => (
    <div style={{ flex: 1 }}>
      <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--muted)', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
        {label}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <button
          onClick={() => setValue(v => Math.max(min, v - step))}
          style={{
            width: 44, height: 44, borderRadius: 12,
            background: 'var(--cream)', border: '1px solid var(--border)',
            fontSize: 22, fontWeight: 700, color: 'var(--wine-md)',
            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >−</button>
        <div style={{ flex: 1, textAlign: 'center' }}>
          <div style={{ fontSize: 32, fontWeight: 800, color: 'var(--ink)', lineHeight: 1 }}>{value}</div>
          <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 2 }}>{unit}</div>
        </div>
        <button
          onClick={() => setValue(v => Math.min(max, v + step))}
          style={{
            width: 44, height: 44, borderRadius: 12,
            background: 'var(--cream)', border: '1px solid var(--border)',
            fontSize: 22, fontWeight: 700, color: 'var(--wine-md)',
            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >+</button>
      </div>
    </div>
  );

  const bpOk = systolic <= 140 && diastolic <= 90;
  const glOk = glucose <= 140;

  return (
    <div className="screen">
      <StatusBar />

      <div style={{ padding: '8px 20px 16px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <button onClick={() => navigate('home')} style={{ background: 'transparent', border: 'none', fontSize: 22, cursor: 'pointer', color: 'var(--wine-md)' }}>←</button>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 20, fontWeight: 800, color: 'var(--ink)' }}>{T.seniorRegisterData}</div>
          <div style={{ fontSize: 12, color: 'var(--muted)' }}>{T.seniorDate}</div>
        </div>
        <MiniLogo navigate={navigate} />
      </div>

      <div className="scroll-area" style={{ padding: '0 16px' }}>

        {/* Success message */}
        {saved && (
          <div style={{
            background: '#e8f8f0', border: '1px solid #a7ddc4', borderRadius: 14,
            padding: '14px 16px', marginBottom: 16,
            display: 'flex', alignItems: 'center', gap: 10,
            animation: 'fadeIn 0.3s ease',
          }}>
            <span style={{ fontSize: 22 }}>✅</span>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#1a7a5a' }}>{T.seniorSavedOk}</div>
              <div style={{ fontSize: 12, color: '#1a7a5a' }}>{T.seniorSavedText} {bpOk && glOk ? T.seniorSavedAllNormal : T.seniorSavedAttention}</div>
            </div>
          </div>
        )}

        {/* Blood pressure */}
        <div style={{ background: '#fff', borderRadius: 20, padding: '20px', border: '1px solid var(--border)', marginBottom: 14 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
            <span style={{ fontSize: 24 }}>❤️</span>
            <div>
              <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--ink)' }}>{T.seniorBPTitle}</div>
              <div style={{ fontSize: 12, color: 'var(--muted)' }}>{T.seniorBPNormal}</div>
            </div>
            <span style={{
              marginLeft: 'auto', fontSize: 11, fontWeight: 700, padding: '4px 10px', borderRadius: 20,
              background: bpOk ? '#e8f8f0' : '#fff3e0', color: bpOk ? '#1a7a5a' : '#b06000',
            }}>
              {bpOk ? T.seniorNormal : T.seniorAttention}
            </span>
          </div>

          <div style={{ display: 'flex', gap: 16 }}>
            <NumInput label={T.seniorBPMax} value={systolic} setValue={setSystolic} unit="mmHg" min={60} max={220} />
            <div style={{ width: 1, background: 'var(--border)', alignSelf: 'stretch', margin: '0 0' }} />
            <NumInput label={T.seniorBPMin} value={diastolic} setValue={setDiastolic} unit="mmHg" min={40} max={150} />
          </div>
        </div>

        {/* Blood glucose */}
        <div style={{ background: '#fff', borderRadius: 20, padding: '20px', border: '1px solid var(--border)', marginBottom: 14 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
            <span style={{ fontSize: 24 }}>🩸</span>
            <div>
              <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--ink)' }}>{T.seniorGlucoseTitle}</div>
              <div style={{ fontSize: 12, color: 'var(--muted)' }}>{T.seniorGlucoseNormal}</div>
            </div>
            <span style={{
              marginLeft: 'auto', fontSize: 11, fontWeight: 700, padding: '4px 10px', borderRadius: 20,
              background: glOk ? '#e8f8f0' : '#fff3e0', color: glOk ? '#1a7a5a' : '#b06000',
            }}>
              {glOk ? T.seniorNormal : T.seniorAttention}
            </span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <NumInput label={T.seniorGlucose} value={glucose} setValue={setGlucose} unit="mg/dL" min={40} max={400} step={5} />
          </div>
        </div>

        {/* Medication checkbox */}
        <div style={{ background: '#fff', borderRadius: 20, padding: '18px 20px', border: '1px solid var(--border)', marginBottom: 20 }}>
          <button
            onClick={() => setMedTaken(v => !v)}
            style={{
              width: '100%', background: 'transparent', border: 'none', cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: 14,
            }}
          >
            <div style={{
              width: 32, height: 32, borderRadius: 10,
              background: medTaken ? 'var(--wine-md)' : 'transparent',
              border: `2px solid ${medTaken ? 'var(--wine-md)' : 'var(--border)'}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'all 0.2s', flexShrink: 0,
            }}>
              {medTaken && <span style={{ color: '#fff', fontSize: 16, fontWeight: 700 }}>✓</span>}
            </div>
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--ink)' }}>{T.seniorMedTakenLabel}</div>
              <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 2 }}>{T.seniorMedTakenMeds}</div>
            </div>
          </button>
        </div>

        {/* Save button */}
        <button
          onClick={handleSave}
          style={{
            width: '100%',
            background: 'linear-gradient(135deg, #590212, #A63F52)',
            color: '#fff',
            border: 'none',
            borderRadius: 18,
            padding: '18px',
            fontSize: 17,
            fontWeight: 700,
            cursor: 'pointer',
            boxShadow: '0 6px 20px rgba(89,2,18,0.35)',
            marginBottom: 12,
          }}
        >
          {T.seniorSaveBtn}
        </button>

        {/* Voice shortcut */}
        <button
          onClick={() => navigate('voz')}
          style={{
            width: '100%',
            background: 'transparent',
            border: '1.5px solid var(--border)',
            borderRadius: 18,
            padding: '14px',
            fontSize: 14,
            fontWeight: 600,
            color: 'var(--wine-md)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            marginBottom: 16,
          }}
        >
          {T.seniorVoiceRegister}
        </button>
      </div>

      <BottomNavSenior active="dados" navigate={navigate} lang={lang} />
    </div>
  );
}

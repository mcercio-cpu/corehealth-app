import logoCrimson from '../../assets/logo-crimson.png';
import StatusBar from '../../components/StatusBar';
import VoiceButton from '../../components/VoiceButton';
import BottomNavSenior from '../../components/BottomNavSenior';
import MiniLogo from '../../components/MiniLogo';
import { rosaBiometrics } from '../../data/mockBiometrics';
import { translations } from '../../data/translations';

const latest = rosaBiometrics[0];

export default function SeniorHome({ navigate, lang = 'pt' }) {
  const T = translations[lang];

  return (
    <div className="screen">
      <StatusBar />
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 20px 16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <img src={logoCrimson} alt="CoreHealth" style={{ width: 32, height: 32, borderRadius: 8 }} />
          <div>
            <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--wine)', lineHeight: 1.2 }}>CoreHealth</div>
            <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 1 }}>{T.seniorGreeting}</div>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <button onClick={() => navigate('definicoes')} style={{ background: 'transparent', border: 'none', fontSize: 22, cursor: 'pointer', padding: 4 }}>⚙️</button>
          <MiniLogo navigate={navigate} />
        </div>
      </div>

      <div className="scroll-area">
        {/* Daily greeting card */}
        <div style={{ margin: '0 16px 20px', padding: '18px 20px', borderRadius: 20, background: 'linear-gradient(135deg, #590212 0%, #A63F52 100%)', color: '#fff' }}>
          <div style={{ fontSize: 13, opacity: 0.8, marginBottom: 4 }}>{T.seniorDateCard}</div>
          <div style={{ fontSize: 18, fontWeight: 700, lineHeight: 1.3 }}>
            {T.seniorMorning}
          </div>
          <div style={{ fontSize: 13, opacity: 0.85, marginTop: 6 }}>
            {T.seniorMorningText}
          </div>
        </div>

        {/* CENTRAL VOICE BUTTON */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          margin: '8px 0 24px',
          padding: '20px 0',
        }}>
          <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--muted)', marginBottom: 20 }}>
            {T.seniorVoicePrompt}
          </div>
          <VoiceButton size="xl" label={lang === 'en' ? 'Talk to Me' : 'Falar Comigo'} onPress={() => navigate('voz')} />
          <button
            onClick={() => navigate('voz')}
            style={{
              marginTop: 20,
              background: 'var(--wine-md)',
              color: '#fff',
              border: 'none',
              borderRadius: 50,
              padding: '14px 32px',
              fontSize: 16,
              fontWeight: 700,
              cursor: 'pointer',
              boxShadow: '0 4px 16px rgba(166,63,82,0.4)',
            }}
          >
            {T.seniorStartTalking}
          </button>
        </div>

        {/* Quick actions */}
        <div className="section-title">{T.seniorQuickActions}</div>
        <div style={{ padding: '0 16px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          {[
            { icon: '📊', label: T.seniorViewData, sub: T.seniorViewDataSub, action: 'dados' },
            { icon: '💊', label: T.seniorMedication, sub: T.seniorMedicationSub, action: 'medicamentos' },
            { icon: '📈', label: T.seniorHistory, sub: T.seniorHistorySub, action: 'historico' },
            { icon: '🆘', label: T.seniorAlertRicardo, sub: T.seniorAlertRicardoSub, action: 'sos', sos: true },
          ].map(item => (
            <button
              key={item.action}
              onClick={() => navigate(item.action)}
              style={{
                background: item.sos ? 'linear-gradient(135deg, #590212, #A63F52)' : '#fff',
                border: `1.5px solid ${item.sos ? 'transparent' : 'var(--border)'}`,
                borderRadius: 18,
                padding: '16px 14px',
                cursor: 'pointer',
                textAlign: 'left',
                boxShadow: 'var(--shadow-sm)',
                transition: 'all 0.2s',
              }}
            >
              <div style={{ fontSize: 28, marginBottom: 8 }}>{item.icon}</div>
              <div style={{ fontSize: 14, fontWeight: 700, color: item.sos ? '#fff' : 'var(--ink)', marginBottom: 3 }}>
                {item.label}
              </div>
              <div style={{ fontSize: 11, color: item.sos ? 'rgba(255,255,255,0.75)' : 'var(--muted)' }}>
                {item.sub}
              </div>
            </button>
          ))}
        </div>

        {/* Last record summary */}
        <div className="section-title" style={{ marginTop: 22 }}>{T.seniorLastRecord}</div>
        <div style={{ margin: '0 16px 8px', padding: '16px', background: '#fff', borderRadius: 18, border: '1px solid var(--border)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <span style={{ fontSize: 13, color: 'var(--muted)', fontWeight: 500 }}>{latest.label} às {latest.time}</span>
            <span style={{
              fontSize: 11, fontWeight: 700, padding: '3px 9px', borderRadius: 20,
              background: latest.status === 'ok' ? '#e8f8f0' : '#fff3e0',
              color: latest.status === 'ok' ? '#1a7a5a' : '#b06000',
            }}>
              {latest.status === 'ok' ? T.seniorNormal : T.seniorAttention}
            </span>
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
            <div style={{ flex: 1, background: 'var(--cream-lt)', borderRadius: 12, padding: '12px 14px', textAlign: 'center' }}>
              <div style={{ fontSize: 11, color: 'var(--muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{T.seniorBP}</div>
              <div style={{ fontSize: 22, fontWeight: 800, color: 'var(--wine)', marginTop: 4 }}>
                {latest.bloodPressure.systolic}/{latest.bloodPressure.diastolic}
              </div>
              <div style={{ fontSize: 10, color: 'var(--muted)' }}>mmHg</div>
            </div>
            <div style={{ flex: 1, background: 'var(--cream-lt)', borderRadius: 12, padding: '12px 14px', textAlign: 'center' }}>
              <div style={{ fontSize: 11, color: 'var(--muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{T.seniorGlucose}</div>
              <div style={{ fontSize: 22, fontWeight: 800, color: latest.bloodGlucose > 140 ? '#b06000' : 'var(--wine)', marginTop: 4 }}>
                {latest.bloodGlucose}
              </div>
              <div style={{ fontSize: 10, color: 'var(--muted)' }}>mg/dL</div>
            </div>
          </div>
          {latest.medicationTaken && (
            <div style={{ marginTop: 10, fontSize: 12, color: '#1a7a5a', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 5 }}>
              {T.seniorMedTaken}
            </div>
          )}
        </div>
      </div>

      <BottomNavSenior active="home" navigate={navigate} lang={lang} />
    </div>
  );
}

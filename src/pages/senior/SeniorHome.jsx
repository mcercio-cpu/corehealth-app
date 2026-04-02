import StatusBar from '../../components/StatusBar';
import LogoHeader from '../../components/LogoHeader';
import VoiceButton from '../../components/VoiceButton';
import BottomNavSenior from '../../components/BottomNavSenior';
import { rosaBiometrics, statusLabel } from '../../data/mockBiometrics';

const latest = rosaBiometrics[0];

export default function SeniorHome({ navigate }) {
  const bpStatus = statusLabel[latest.bloodPressure.systolic > 140 ? 'warning' : 'ok'];
  const glStatus = statusLabel[latest.bloodGlucose > 140 ? 'warning' : 'ok'];

  return (
    <div className="screen">
      <StatusBar />
      <LogoHeader
        title="CoreHealth"
        subtitle="Olá, Dona Rosa 👋"
        action={{ icon: '⚙️', onClick: () => navigate('definicoes') }}
      />

      <div className="scroll-area">
        {/* Daily greeting card */}
        <div style={{ margin: '0 16px 20px', padding: '18px 20px', borderRadius: 20, background: 'linear-gradient(135deg, #590212 0%, #A63F52 100%)', color: '#fff' }}>
          <div style={{ fontSize: 13, opacity: 0.8, marginBottom: 4 }}>Quarta, 2 de Abril</div>
          <div style={{ fontSize: 18, fontWeight: 700, lineHeight: 1.3 }}>
            Bom dia, Rosa! 🌸
          </div>
          <div style={{ fontSize: 13, opacity: 0.85, marginTop: 6 }}>
            Já registou os seus dados hoje? Estou aqui para ajudar.
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
            Fale comigo como se fosse um enfermeiro em casa
          </div>
          <VoiceButton size="xl" label="Falar Comigo" onPress={() => navigate('voz')} />
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
            🎤 Começar a Falar
          </button>
        </div>

        {/* Quick actions */}
        <div className="section-title">Ações Rápidas</div>
        <div style={{ padding: '0 16px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          {[
            { icon: '📊', label: 'Ver Dados', sub: 'Últimos registos', action: 'dados' },
            { icon: '💊', label: 'Medicação', sub: 'Horários e alertas', action: 'medicamentos' },
            { icon: '📈', label: 'Histórico', sub: 'Gráficos da semana', action: 'historico' },
            { icon: '🆘', label: 'Alertar Ricardo', sub: 'Chamar o meu filho', action: 'sos', sos: true },
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
        <div className="section-title" style={{ marginTop: 22 }}>Último Registo</div>
        <div style={{ margin: '0 16px 8px', padding: '16px', background: '#fff', borderRadius: 18, border: '1px solid var(--border)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <span style={{ fontSize: 13, color: 'var(--muted)', fontWeight: 500 }}>{latest.label} às {latest.time}</span>
            <span style={{
              fontSize: 11, fontWeight: 700, padding: '3px 9px', borderRadius: 20,
              background: latest.status === 'ok' ? '#e8f8f0' : '#fff3e0',
              color: latest.status === 'ok' ? '#1a7a5a' : '#b06000',
            }}>
              {latest.status === 'ok' ? '✓ Normal' : '⚠ Atenção'}
            </span>
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
            <div style={{ flex: 1, background: 'var(--cream-lt)', borderRadius: 12, padding: '12px 14px', textAlign: 'center' }}>
              <div style={{ fontSize: 11, color: 'var(--muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Tensão</div>
              <div style={{ fontSize: 22, fontWeight: 800, color: 'var(--wine)', marginTop: 4 }}>
                {latest.bloodPressure.systolic}/{latest.bloodPressure.diastolic}
              </div>
              <div style={{ fontSize: 10, color: 'var(--muted)' }}>mmHg</div>
            </div>
            <div style={{ flex: 1, background: 'var(--cream-lt)', borderRadius: 12, padding: '12px 14px', textAlign: 'center' }}>
              <div style={{ fontSize: 11, color: 'var(--muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Glicose</div>
              <div style={{ fontSize: 22, fontWeight: 800, color: latest.bloodGlucose > 140 ? '#b06000' : 'var(--wine)', marginTop: 4 }}>
                {latest.bloodGlucose}
              </div>
              <div style={{ fontSize: 10, color: 'var(--muted)' }}>mg/dL</div>
            </div>
          </div>
          {latest.medicationTaken && (
            <div style={{ marginTop: 10, fontSize: 12, color: '#1a7a5a', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 5 }}>
              ✓ Medicação tomada hoje
            </div>
          )}
        </div>
      </div>

      <BottomNavSenior active="home" navigate={navigate} />
    </div>
  );
}

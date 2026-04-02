import StatusBar from '../../components/StatusBar';
import MiniChart from '../../components/MiniChart';
import BottomNavAdult from '../../components/BottomNavAdult';
import { ricardoBiometrics, rosaChartData } from '../../data/mockBiometrics';
import { users } from '../../data/mockUsers';
import logoCrimson from '../../assets/logo-crimson.png';

const r = ricardoBiometrics[0];

export default function AdultHome({ navigate }) {
  const metrics = [
    { label: 'Glicose', value: r.bloodGlucose, unit: 'mg/dL', status: 'ok', icon: '🩸', dot: '#28a878' },
    { label: 'Tensão', value: `${r.bloodPressure.systolic}/${r.bloodPressure.diastolic}`, unit: 'mmHg', status: 'ok', icon: '❤️', dot: '#A63F52' },
    { label: 'Passos', value: r.steps.toLocaleString('pt-PT'), unit: '/ 10.000', status: 'warn', icon: '👣', dot: '#F5A623', wide: true, progress: r.steps / 10000 },
    { label: 'Sono', value: r.sleep, unit: '', status: 'ok', icon: '😴', dot: '#28a878' },
    { label: 'Freq. Cardíaca', value: r.heartRate, unit: 'bpm', status: 'ok', icon: '💓', dot: '#28a878' },
  ];

  const recommendations = [
    { icon: '✅', text: 'A sua glicose está estável. Continue assim!', type: 'ok' },
    { icon: '🚶', text: 'Pode tentar caminhar um pouco mais hoje — 1.653 passos para a meta!', type: 'info' },
    { icon: '📋', text: 'Próxima consulta em 2 dias — Dr. João Machado.', type: 'reminder' },
  ];

  return (
    <div className="screen">
      <StatusBar />

      {/* Header */}
      <div style={{ padding: '6px 20px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <div style={{ fontSize: 22, fontWeight: 800, color: 'var(--ink)', lineHeight: 1.2 }}>
            Olá, Ricardo! 👋
          </div>
          <div style={{ fontSize: 13, color: 'var(--muted)', marginTop: 3 }}>
            Quarta, 2 Abril · Resumo do dia
          </div>
        </div>
        <div style={{
          width: 40, height: 40, borderRadius: '50%',
          background: 'var(--wine)', color: '#fff',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 16, fontWeight: 700,
        }}>RS</div>
      </div>

      <div className="scroll-area">
        {/* Family alert card */}
        <div
          onClick={() => navigate('familia')}
          style={{
            margin: '0 16px 18px',
            background: 'linear-gradient(135deg, #590212 0%, #A63F52 100%)',
            borderRadius: 20,
            padding: '16px 18px',
            color: '#fff',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 14,
          }}
        >
          <span style={{ fontSize: 32 }}>⚠️</span>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14, fontWeight: 700 }}>Glicose da Rosa ligeiramente alta</div>
            <div style={{ fontSize: 12, opacity: 0.8, marginTop: 3 }}>156 mg/dL · Há 2 horas · Sugerir hidratação</div>
          </div>
          <span style={{ fontSize: 20, opacity: 0.7 }}>›</span>
        </div>

        {/* Personal metrics grid */}
        <div className="section-title">Os Meus Dados de Hoje</div>
        <div style={{ padding: '0 16px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {metrics.filter(m => !m.wide).map(m => (
              <div key={m.label} className="metric-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.4px' }}>{m.label}</span>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: m.dot }} />
                </div>
                <div>
                  <span style={{ fontSize: 26, fontWeight: 800, color: 'var(--ink)', lineHeight: 1 }}>{m.value}</span>
                  {m.unit && <span style={{ fontSize: 11, color: 'var(--muted)', marginLeft: 3 }}>{m.unit}</span>}
                </div>
                <div style={{ fontSize: 11, marginTop: 4, fontWeight: 600, color: m.status === 'ok' ? '#28a878' : '#e07040' }}>
                  {m.status === 'ok' ? '✓ Normal' : '⚠ Atenção'}
                </div>
              </div>
            ))}
          </div>

          {/* Steps — wide card */}
          {metrics.filter(m => m.wide).map(m => (
            <div key={m.label} className="metric-card" style={{ marginTop: 10, display: 'flex', alignItems: 'center', gap: 16 }}>
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.4px' }}>
                  {m.icon} {m.label}
                </div>
                <div style={{ fontSize: 28, fontWeight: 800, color: 'var(--ink)', marginTop: 4 }}>{m.value}</div>
                <div style={{ fontSize: 11, color: 'var(--muted)' }}>{m.unit}</div>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 11, color: 'var(--muted)', marginBottom: 6, textAlign: 'right' }}>
                  {Math.round(m.progress * 100)}%
                </div>
                <div style={{ height: 8, background: 'var(--cream)', borderRadius: 4 }}>
                  <div style={{ height: 8, background: 'var(--mint)', borderRadius: 4, width: `${m.progress * 100}%`, transition: 'width 1s ease' }} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 7-day chart */}
        <div className="section-title" style={{ marginTop: 20 }}>Últimos 7 Dias — Glicose</div>
        <div style={{ margin: '0 16px 14px', background: '#fff', borderRadius: 20, padding: '16px', border: '1px solid var(--border)' }}>
          <MiniChart data={[88, 92, 95, 91, 97, 90, 95]} color="#A63F52" height={65} />
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
            {['27 Mar', '28', '29', '31', '1 Abr', '2'].map((l, i) => (
              <span key={i} style={{ fontSize: 9, color: 'var(--muted)' }}>{l}</span>
            ))}
          </div>
        </div>

        {/* Recommendations */}
        <div className="section-title">Recomendações</div>
        <div style={{ padding: '0 16px', display: 'flex', flexDirection: 'column', gap: 8 }}>
          {recommendations.map((r, i) => (
            <div key={i} style={{
              background: '#fff',
              borderRadius: 16,
              padding: '12px 14px',
              border: '1px solid var(--border)',
              display: 'flex',
              alignItems: 'center',
              gap: 12,
            }}>
              <span style={{ fontSize: 20 }}>{r.icon}</span>
              <span style={{ fontSize: 13, color: 'var(--ink)', flex: 1, lineHeight: 1.45 }}>{r.text}</span>
            </div>
          ))}
        </div>

        {/* Quick register */}
        <div style={{ padding: '18px 16px 16px' }}>
          <button
            style={{
              width: '100%',
              background: 'var(--wine-md)',
              color: '#fff',
              border: 'none',
              borderRadius: 18,
              padding: '16px',
              fontSize: 15,
              fontWeight: 700,
              cursor: 'pointer',
              boxShadow: '0 4px 16px rgba(166,63,82,0.3)',
            }}
          >
            + Registar Dados Agora
          </button>
        </div>
      </div>

      <BottomNavAdult active="home" navigate={navigate} />
    </div>
  );
}

import StatusBar from '../../components/StatusBar';
import MiniChart from '../../components/MiniChart';
import BottomNavAdult from '../../components/BottomNavAdult';
import { ricardoBiometrics } from '../../data/mockBiometrics';

const r = ricardoBiometrics[0];

export default function AdultHome({ navigate }) {
  const metrics = [
    { label: 'Glicose', value: r.bloodGlucose, unit: 'mg/dL', status: 'ok', dot: '#28a878' },
    { label: 'Tensão', value: `${r.bloodPressure.systolic}/${r.bloodPressure.diastolic}`, unit: 'mmHg', status: 'ok', dot: '#A63F52' },
    { label: 'Sono', value: r.sleep, unit: '', status: 'ok', dot: '#28a878' },
    { label: 'Freq. Cardíaca', value: r.heartRate, unit: 'bpm', status: 'ok', dot: '#28a878' },
  ];

  return (
    <div className="screen">
      <StatusBar />

      <div style={{ padding: '6px 20px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <div style={{ fontSize: 22, fontWeight: 800, color: 'var(--ink)', lineHeight: 1.2 }}>Olá, Ricardo! 👋</div>
          <div style={{ fontSize: 13, color: 'var(--muted)', marginTop: 3 }}>Quarta, 2 Abril · Resumo do dia</div>
        </div>
        <div style={{
          width: 40, height: 40, borderRadius: '50%', background: 'var(--wine)', color: '#fff',
          display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, fontWeight: 700,
        }}>RS</div>
      </div>

      <div className="scroll-area">
        {/* Family alert */}
        <div onClick={() => navigate('familia')} style={{
          margin: '0 16px 18px', background: 'linear-gradient(135deg, #590212 0%, #A63F52 100%)',
          borderRadius: 20, padding: '16px 18px', color: '#fff', cursor: 'pointer',
          display: 'flex', alignItems: 'center', gap: 14,
        }}>
          <span style={{ fontSize: 32 }}>⚠️</span>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14, fontWeight: 700 }}>Glicose da mãe ligeiramente alta</div>
            <div style={{ fontSize: 12, opacity: 0.8, marginTop: 3 }}>156 mg/dL · Há 2 horas · Sugerir hidratação</div>
          </div>
          <span style={{ fontSize: 20, opacity: 0.7 }}>›</span>
        </div>

        {/* Metrics grid */}
        <div className="section-title">Os Meus Dados de Hoje</div>
        <div style={{ padding: '0 16px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {metrics.map(m => (
              <div key={m.label} className="metric-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.4px' }}>{m.label}</span>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: m.dot }} />
                </div>
                <div>
                  <span style={{ fontSize: 26, fontWeight: 800, color: 'var(--ink)', lineHeight: 1 }}>{m.value}</span>
                  {m.unit && <span style={{ fontSize: 11, color: 'var(--muted)', marginLeft: 3 }}>{m.unit}</span>}
                </div>
                <div style={{ fontSize: 11, marginTop: 4, fontWeight: 600, color: '#28a878' }}>✓ Normal</div>
              </div>
            ))}
          </div>

          {/* Steps wide */}
          <div className="metric-card" style={{ marginTop: 10, display: 'flex', alignItems: 'center', gap: 16 }}>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.4px' }}>👣 Passos</div>
              <div style={{ fontSize: 28, fontWeight: 800, color: 'var(--ink)', marginTop: 4 }}>{r.steps.toLocaleString('pt-PT')}</div>
              <div style={{ fontSize: 11, color: 'var(--muted)' }}>/ 10.000</div>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 11, color: 'var(--muted)', marginBottom: 6, textAlign: 'right' }}>83%</div>
              <div style={{ height: 8, background: 'var(--cream)', borderRadius: 4 }}>
                <div style={{ height: 8, background: 'var(--mint)', borderRadius: 4, width: '83%' }} />
              </div>
            </div>
          </div>
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

          {/* Normal recs */}
          {[
            { icon: '✅', text: 'A sua glicose está estável. Continue assim!' },
            { icon: '🚶', text: 'Pode tentar caminhar um pouco mais hoje — 1.653 passos para a meta!' },
          ].map((rec, i) => (
            <div key={i} style={{
              background: '#fff', borderRadius: 16, padding: '12px 14px',
              border: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 12,
            }}>
              <span style={{ fontSize: 20 }}>{rec.icon}</span>
              <span style={{ fontSize: 13, color: 'var(--ink)', flex: 1, lineHeight: 1.45 }}>{rec.text}</span>
            </div>
          ))}

          {/* Highlighted: próxima consulta */}
          <div style={{
            background: 'linear-gradient(135deg, #590212, #A63F52)',
            borderRadius: 16, padding: '14px 16px',
            display: 'flex', alignItems: 'center', gap: 12,
            boxShadow: '0 4px 16px rgba(89,2,18,0.25)',
          }}>
            <span style={{ fontSize: 24 }}>🏥</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#fff' }}>Próxima consulta em 2 dias</div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.8)', marginTop: 2 }}>Dr. João Machado · Terça, 4 Abr às 14:30</div>
            </div>
            <span style={{
              fontSize: 11, fontWeight: 700, background: 'rgba(255,255,255,0.2)',
              color: '#fff', padding: '4px 10px', borderRadius: 20,
            }}>2 dias</span>
          </div>

          {/* ECG exam reminder */}
          <div style={{
            background: '#fff', borderRadius: 16, padding: '14px 16px',
            border: '1.5px solid #f5c87a', display: 'flex', alignItems: 'center', gap: 12,
          }}>
            <span style={{ fontSize: 24 }}>🩺</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--ink)' }}>Lembrete: Eletrocardiograma</div>
              <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 2 }}>Clínica CUF Mértola · Hoje às 15:30</div>
            </div>
            <span style={{
              fontSize: 11, fontWeight: 700, background: '#fff3e0',
              color: '#b06000', padding: '4px 10px', borderRadius: 20,
            }}>Hoje</span>
          </div>
        </div>

        {/* CTA */}
        <div style={{ padding: '18px 16px 16px' }}>
          <button
            onClick={() => navigate('home')}
            style={{
              width: '100%', background: 'linear-gradient(135deg, #590212, #A63F52)',
              color: '#fff', border: 'none', borderRadius: 18, padding: '18px',
              fontSize: 16, fontWeight: 700, cursor: 'pointer',
              boxShadow: '0 4px 16px rgba(89,2,18,0.35)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
            }}
          >
            🤖 Aconselhar-me com a Core
          </button>
        </div>
      </div>

      <BottomNavAdult active="home" navigate={navigate} />
    </div>
  );
}

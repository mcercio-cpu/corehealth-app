import StatusBar from '../../components/StatusBar';
import BottomNavSenior from '../../components/BottomNavSenior';
import MiniChart from '../../components/MiniChart';
import { rosaBiometrics, rosaChartData } from '../../data/mockBiometrics';

export default function SeniorHistorico({ navigate }) {
  return (
    <div className="screen">
      <StatusBar />

      <div style={{ padding: '8px 20px 16px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <button onClick={() => navigate('home')} style={{ background: 'transparent', border: 'none', fontSize: 22, cursor: 'pointer', color: 'var(--wine-md)' }}>←</button>
        <div>
          <div style={{ fontSize: 20, fontWeight: 800, color: 'var(--ink)' }}>Histórico</div>
          <div style={{ fontSize: 12, color: 'var(--muted)' }}>Últimos 7 dias</div>
        </div>
      </div>

      <div className="scroll-area">
        {/* Chart — Blood Pressure */}
        <div style={{ margin: '0 16px 14px', background: '#fff', borderRadius: 20, padding: '18px', border: '1px solid var(--border)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
            <div>
              <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--ink)' }}>❤️ Tensão Arterial</div>
              <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 2 }}>Sistólica (mmHg)</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 22, fontWeight: 800, color: 'var(--wine)' }}>140/90</div>
              <div style={{ fontSize: 11, color: '#b06000', fontWeight: 600 }}>⚠ Ligeiramente alta</div>
            </div>
          </div>
          <MiniChart data={rosaChartData.bloodPressureSystolic} color="#A63F52" height={70} />
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
            {rosaChartData.labels.map((l, i) => (
              <span key={i} style={{ fontSize: 9, color: 'var(--muted)', textAlign: 'center' }}>{l.split(' ')[0]}</span>
            ))}
          </div>
        </div>

        {/* Chart — Glucose */}
        <div style={{ margin: '0 16px 14px', background: '#fff', borderRadius: 20, padding: '18px', border: '1px solid var(--border)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
            <div>
              <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--ink)' }}>🩸 Glicose</div>
              <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 2 }}>mg/dL · Normal: 70–140</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 22, fontWeight: 800, color: '#b06000' }}>156</div>
              <div style={{ fontSize: 11, color: '#b06000', fontWeight: 600 }}>⚠ Acima do normal</div>
            </div>
          </div>
          <MiniChart data={rosaChartData.bloodGlucose} color="#F5A623" height={70} />
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
            {rosaChartData.labels.map((l, i) => (
              <span key={i} style={{ fontSize: 9, color: 'var(--muted)', textAlign: 'center' }}>{l.split(' ')[0]}</span>
            ))}
          </div>
        </div>

        {/* Daily records list */}
        <div className="section-title">Registos Diários</div>
        <div style={{ padding: '0 16px' }}>
          {rosaBiometrics.map((r, i) => (
            <div key={r.id} style={{
              background: '#fff',
              borderRadius: 16,
              padding: '14px 16px',
              border: '1px solid var(--border)',
              marginBottom: 10,
              display: 'flex',
              alignItems: 'center',
              gap: 14,
            }}>
              {/* Date pill */}
              <div style={{
                background: 'var(--cream)',
                borderRadius: 12,
                padding: '8px 10px',
                textAlign: 'center',
                minWidth: 52,
              }}>
                <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--wine)', lineHeight: 1 }}>
                  {r.date.split('-')[2]}
                </div>
                <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase' }}>
                  {['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'][parseInt(r.date.split('-')[1]) - 1]}
                </div>
              </div>

              {/* Data */}
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--ink)', marginBottom: 4 }}>
                  {r.bloodPressure.systolic}/{r.bloodPressure.diastolic} mmHg
                </div>
                <div style={{ fontSize: 12, color: 'var(--muted)' }}>
                  Glicose: {r.bloodGlucose} mg/dL · {r.time}
                </div>
                {!r.medicationTaken && (
                  <div style={{ fontSize: 11, color: '#b06000', fontWeight: 600, marginTop: 3 }}>
                    ⚠ Medicação não registada
                  </div>
                )}
              </div>

              {/* Status */}
              <span style={{
                fontSize: 11, fontWeight: 700, padding: '4px 10px', borderRadius: 20,
                background: r.status === 'ok' ? '#e8f8f0' : r.status === 'warning' ? '#fff3e0' : '#fee2e2',
                color: r.status === 'ok' ? '#1a7a5a' : r.status === 'warning' ? '#b06000' : '#dc2626',
              }}>
                {r.status === 'ok' ? '✓ Normal' : r.status === 'warning' ? '⚠ Atenção' : '! Alerta'}
              </span>
            </div>
          ))}
        </div>
      </div>

      <BottomNavSenior active="historico" navigate={navigate} />
    </div>
  );
}

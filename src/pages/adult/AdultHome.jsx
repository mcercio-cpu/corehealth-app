import StatusBar from '../../components/StatusBar';
import MiniChart from '../../components/MiniChart';
import BottomNavAdult from '../../components/BottomNavAdult';
import MiniLogo from '../../components/MiniLogo';
import { ricardoBiometrics } from '../../data/mockBiometrics';
import { translations } from '../../data/translations';

const r = ricardoBiometrics[0];

export default function AdultHome({ navigate, lang = 'pt' }) {
  const T = translations[lang];

  const metrics = T.adultMetrics.map((m, i) => {
    const values = [r.bloodGlucose, `${r.bloodPressure.systolic}/${r.bloodPressure.diastolic}`, r.sleep, r.heartRate];
    const dots = ['#28a878', '#A63F52', '#28a878', '#28a878'];
    return { ...m, value: values[i], dot: dots[i] };
  });

  return (
    <div className="screen">
      <StatusBar />

      <div style={{ padding: '6px 20px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
          <MiniLogo navigate={navigate} />
          <div>
            <div style={{ fontSize: 22, fontWeight: 800, color: 'var(--ink)', lineHeight: 1.2 }}>{T.adultGreeting}</div>
            <div style={{ fontSize: 13, color: 'var(--muted)', marginTop: 3 }}>{T.adultDate}</div>
          </div>
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
            <div style={{ fontSize: 14, fontWeight: 700 }}>{T.adultAlertTitle}</div>
            <div style={{ fontSize: 12, opacity: 0.8, marginTop: 3 }}>{T.adultAlertSub}</div>
          </div>
          <span style={{ fontSize: 20, opacity: 0.7 }}>›</span>
        </div>

        {/* Metrics grid */}
        <div className="section-title">{T.adultMyData}</div>
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
                <div style={{ fontSize: 11, marginTop: 4, fontWeight: 600, color: '#28a878' }}>{T.adultNormal}</div>
              </div>
            ))}
          </div>

          {/* Steps wide */}
          <div className="metric-card" style={{ marginTop: 10, display: 'flex', alignItems: 'center', gap: 16 }}>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.4px' }}>{T.adultSteps}</div>
              <div style={{ fontSize: 28, fontWeight: 800, color: 'var(--ink)', marginTop: 4 }}>{r.steps.toLocaleString(lang === 'en' ? 'en-GB' : 'pt-PT')}</div>
              <div style={{ fontSize: 11, color: 'var(--muted)' }}>{T.adultStepsGoal}</div>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 11, color: 'var(--muted)', marginBottom: 6, textAlign: 'right' }}>{T.adultStepsPct}</div>
              <div style={{ height: 8, background: 'var(--cream)', borderRadius: 4 }}>
                <div style={{ height: 8, background: 'var(--mint)', borderRadius: 4, width: '83%' }} />
              </div>
            </div>
          </div>
        </div>

        {/* 7-day chart */}
        <div className="section-title" style={{ marginTop: 20 }}>{T.adultChartTitle}</div>
        <div style={{ margin: '0 16px 14px', background: '#fff', borderRadius: 20, padding: '16px', border: '1px solid var(--border)' }}>
          <MiniChart data={[88, 92, 95, 91, 97, 90, 95]} color="#A63F52" height={65} />
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
            {(lang === 'en'
              ? ['27 Mar', '28', '29', '30', '31', '1 Apr', '2']
              : ['27 Mar', '28', '29', '31', '1 Abr', '2']
            ).map((l, i) => (
              <span key={i} style={{ fontSize: 9, color: 'var(--muted)' }}>{l}</span>
            ))}
          </div>
        </div>

        {/* Recommendations */}
        <div className="section-title">{T.adultRecommendations}</div>
        <div style={{ padding: '0 16px', display: 'flex', flexDirection: 'column', gap: 8 }}>

          {[
            { icon: '✅', text: T.adultRec1 },
            { icon: '🚶', text: T.adultRec2 },
          ].map((rec, i) => (
            <div key={i} style={{
              background: '#fff', borderRadius: 16, padding: '12px 14px',
              border: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 12,
            }}>
              <span style={{ fontSize: 20 }}>{rec.icon}</span>
              <span style={{ fontSize: 13, color: 'var(--ink)', flex: 1, lineHeight: 1.45 }}>{rec.text}</span>
            </div>
          ))}

          {/* Highlighted: next appointment */}
          <div style={{
            background: 'linear-gradient(135deg, #590212, #A63F52)',
            borderRadius: 16, padding: '14px 16px',
            display: 'flex', alignItems: 'center', gap: 12,
            boxShadow: '0 4px 16px rgba(89,2,18,0.25)',
          }}>
            <span style={{ fontSize: 24 }}>🏥</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#fff' }}>{T.adultConsultCard}</div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.8)', marginTop: 2 }}>{T.adultConsultDetail}</div>
            </div>
            <span style={{
              fontSize: 11, fontWeight: 700, background: 'rgba(255,255,255,0.2)',
              color: '#fff', padding: '4px 10px', borderRadius: 20,
            }}>{T.adultDays}</span>
          </div>

          {/* ECG exam reminder */}
          <div style={{
            background: '#fff', borderRadius: 16, padding: '14px 16px',
            border: '1.5px solid #f5c87a', display: 'flex', alignItems: 'center', gap: 12,
          }}>
            <span style={{ fontSize: 24 }}>🩺</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--ink)' }}>{T.adultEcgTitle}</div>
              <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 2 }}>{T.adultEcgDetail}</div>
            </div>
            <span style={{
              fontSize: 11, fontWeight: 700, background: '#fff3e0',
              color: '#b06000', padding: '4px 10px', borderRadius: 20,
            }}>{T.adultToday}</span>
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
            {T.adultCTA}
          </button>
        </div>
      </div>

      <BottomNavAdult active="home" navigate={navigate} lang={lang} />
    </div>
  );
}

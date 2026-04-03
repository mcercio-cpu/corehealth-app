import { useState } from 'react';
import StatusBar from '../../components/StatusBar';
import MiniChart from '../../components/MiniChart';
import BottomNavAdult from '../../components/BottomNavAdult';
import MiniLogo from '../../components/MiniLogo';
import { ricardoBiometrics } from '../../data/mockBiometrics';
import { translations } from '../../data/translations';

const r = ricardoBiometrics[0];

const weekDates = {
  pt: ['27 Mar', '28', '29', '30', '31', '1 Abr', '2'],
  en: ['27 Mar', '28', '29', '30', '31', '1 Apr', '2'],
};

const metricHistory = {
  glucose:   { data: [88, 92, 95, 91, 97, 90, 95], color: '#28a878', unit: 'mg/dL', normal: '70–140 mg/dL' },
  bp:        { data: [118, 120, 122, 119, 125, 121, 125], color: '#A63F52', unit: 'mmHg', normal: '< 130/80 mmHg' },
  sleep:     { data: [7.2, 6.8, 7.5, 8.0, 7.1, 6.9, 7.5], color: '#5B8DEF', unit: '', normal: '7–9h' },
  heartRate: { data: [65, 68, 72, 67, 71, 69, 68], color: '#28a878', unit: 'bpm', normal: '60–100 bpm' },
  steps:     { data: [7200, 8900, 6500, 9100, 7800, 7200, 8347], color: '#28a878', unit: '', normal: '> 10.000' },
};

const metricKeys = ['glucose', 'bp', 'sleep', 'heartRate'];

function formatSleep(v) {
  return `${Math.floor(v)}h ${Math.round((v % 1) * 60)}m`;
}

export default function AdultHome({ navigate, lang = 'pt' }) {
  const T = translations[lang];
  const [selectedMetric, setSelectedMetric] = useState(null);

  const metrics = T.adultMetrics.map((m, i) => {
    const values = [r.bloodGlucose, `${r.bloodPressure.systolic}/${r.bloodPressure.diastolic}`, r.sleep, r.heartRate];
    const dots = ['#28a878', '#A63F52', '#28a878', '#28a878'];
    return { ...m, value: values[i], dot: dots[i], key: metricKeys[i] };
  });

  const dates = weekDates[lang] || weekDates.pt;
  const selected = selectedMetric ? metricHistory[selectedMetric] : null;

  const getSelectedLabel = () => {
    if (!selectedMetric) return '';
    if (selectedMetric === 'steps') return lang === 'en' ? 'Steps' : 'Passos';
    const idx = metricKeys.indexOf(selectedMetric);
    return idx >= 0 ? metrics[idx].label : '';
  };

  const getCurrentValue = () => {
    switch (selectedMetric) {
      case 'glucose':   return `${r.bloodGlucose}`;
      case 'bp':        return `${r.bloodPressure.systolic}/${r.bloodPressure.diastolic}`;
      case 'sleep':     return r.sleep;
      case 'heartRate': return `${r.heartRate}`;
      case 'steps':     return r.steps.toLocaleString(lang === 'en' ? 'en-GB' : 'pt-PT');
      default:          return '';
    }
  };

  const formatHistoryValue = (v) => {
    if (selectedMetric === 'sleep') return formatSleep(v);
    if (selectedMetric === 'steps') return v.toLocaleString(lang === 'en' ? 'en-GB' : 'pt-PT');
    return String(v);
  };

  return (
    <div className="screen">
      <StatusBar />

      <div style={{ padding: '6px 20px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
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
              <div
                key={m.label}
                className="metric-card"
                onClick={() => setSelectedMetric(m.key)}
                style={{ cursor: 'pointer' }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.4px' }}>{m.label}</span>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: m.dot }} />
                </div>
                <div>
                  <span style={{ fontSize: 26, fontWeight: 800, color: 'var(--ink)', lineHeight: 1 }}>{m.value}</span>
                  {m.unit && <span style={{ fontSize: 11, color: 'var(--muted)', marginLeft: 3 }}>{m.unit}</span>}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 4 }}>
                  <div style={{ fontSize: 11, fontWeight: 600, color: '#28a878' }}>{T.adultNormal}</div>
                  <div style={{ fontSize: 12, color: 'var(--muted)' }}>›</div>
                </div>
              </div>
            ))}
          </div>

          {/* Steps wide */}
          <div
            className="metric-card"
            onClick={() => setSelectedMetric('steps')}
            style={{ marginTop: 10, display: 'flex', alignItems: 'center', gap: 16, cursor: 'pointer' }}
          >
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
              <div style={{ textAlign: 'right', marginTop: 5, fontSize: 12, color: 'var(--muted)' }}>›</div>
            </div>
          </div>
        </div>

        {/* Recommendations */}
        <div className="section-title" style={{ marginTop: 8 }}>{T.adultRecommendations}</div>
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

          {/* Next appointment */}
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
            }}
          >
            {T.adultCTA}
          </button>
        </div>
      </div>

      <BottomNavAdult active="home" navigate={navigate} lang={lang} />

      {/* Metric detail overlay */}
      {selectedMetric && selected && (
        <div style={{
          position: 'absolute', inset: 0,
          background: '#faf8f5',
          zIndex: 50,
          display: 'flex', flexDirection: 'column',
          borderRadius: 'inherit',
          overflow: 'hidden',
        }}>
          <StatusBar />
          <div style={{ padding: '8px 20px 14px', display: 'flex', alignItems: 'center', gap: 12 }}>
            <button
              onClick={() => setSelectedMetric(null)}
              style={{ background: 'transparent', border: 'none', fontSize: 22, cursor: 'pointer', color: 'var(--wine-md)' }}
            >←</button>
            <div style={{ fontSize: 20, fontWeight: 800, color: 'var(--ink)', flex: 1 }}>{getSelectedLabel()}</div>
            <span style={{ fontSize: 11, fontWeight: 700, padding: '4px 10px', borderRadius: 20, background: '#e8f8f0', color: '#1a7a5a' }}>
              {T.adultNormal}
            </span>
          </div>

          <div style={{ padding: '0 16px 16px', overflowY: 'auto', flex: 1 }}>
            {/* Current value card */}
            <div style={{ background: '#fff', borderRadius: 20, padding: '20px', border: '1px solid var(--border)', marginBottom: 14 }}>
              <div style={{ fontSize: 12, color: 'var(--muted)', fontWeight: 600, marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.4px' }}>
                {lang === 'en' ? 'Current value' : 'Valor atual'}
              </div>
              <div>
                <span style={{ fontSize: 40, fontWeight: 800, color: 'var(--wine)', lineHeight: 1 }}>
                  {getCurrentValue()}
                </span>
                {selected.unit && <span style={{ fontSize: 15, color: 'var(--muted)', marginLeft: 6 }}>{selected.unit}</span>}
              </div>
              <div style={{ fontSize: 12, color: '#1a7a5a', fontWeight: 600, marginTop: 8 }}>
                ✓ {T.adultNormal} · {lang === 'en' ? 'Reference' : 'Referência'}: {selected.normal}
              </div>
            </div>

            {/* 7-day chart */}
            <div style={{ background: '#fff', borderRadius: 20, padding: '18px', border: '1px solid var(--border)', marginBottom: 14 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--ink)', marginBottom: 14 }}>
                {lang === 'en' ? 'Last 7 days' : 'Últimos 7 dias'}
              </div>
              <MiniChart data={selected.data} color={selected.color} height={80} />
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
                {dates.map((l, i) => (
                  <span key={i} style={{ fontSize: 9, color: 'var(--muted)', textAlign: 'center' }}>{l}</span>
                ))}
              </div>
            </div>

            {/* Day-by-day breakdown */}
            <div style={{ background: '#fff', borderRadius: 20, padding: '16px 18px', border: '1px solid var(--border)' }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--ink)', marginBottom: 12 }}>
                {lang === 'en' ? 'Daily detail' : 'Detalhe diário'}
              </div>
              {selected.data.map((v, i) => (
                <div key={i} style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  padding: '8px 0',
                  borderBottom: i < selected.data.length - 1 ? '1px solid var(--border-lt)' : 'none',
                }}>
                  <span style={{ fontSize: 13, color: 'var(--muted)' }}>{dates[i]}</span>
                  <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--ink)' }}>
                    {formatHistoryValue(v)}
                    {selected.unit && <span style={{ fontSize: 11, color: 'var(--muted)', fontWeight: 400, marginLeft: 4 }}>{selected.unit}</span>}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

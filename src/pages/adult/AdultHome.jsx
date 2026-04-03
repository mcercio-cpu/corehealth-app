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

const hourlyTimes = ['7h', '10h', '13h', '16h', '19h', '22h'];
const sleepTimes  = ['23h', '1h', '2h', '3h', '4h', '6h', '7h'];

const metricHistory = {
  glucose:   { data: [88, 92, 95, 91, 97, 90, 95], color: '#28a878', unit: 'mg/dL', normal: '70–140 mg/dL' },
  bp:        { data: [118, 120, 122, 119, 125, 121, 125], color: '#A63F52', unit: 'mmHg', normal: '< 130/80 mmHg' },
  sleep:     { data: [7.2, 6.8, 7.5, 8.0, 7.1, 6.9, 7.5], color: '#5B8DEF', unit: '', normal: '7–9h' },
  heartRate: { data: [65, 68, 72, 67, 71, 69, 68], color: '#28a878', unit: 'bpm', normal: '60–100 bpm' },
};

// Intraday fluctuations per metric per day (index 0 = 27 Mar ... 6 = 2 Abr)
const dailyHourly = {
  glucose: [
    [82, 95, 114, 92, 88, 85],
    [85, 99, 118, 96, 91, 88],
    [80, 94, 110, 90, 86, 83],
    [78, 91, 106, 88, 84, 81],
    [84, 97, 121, 94, 90, 87],
    [81, 93, 111, 89, 85, 82],
    [83, 96, 115, 91, 87, 84],
  ],
  bp: [
    [115, 118, 122, 120, 119, 116],
    [117, 120, 124, 122, 121, 118],
    [114, 118, 123, 121, 120, 117],
    [113, 116, 120, 118, 117, 114],
    [116, 121, 127, 124, 122, 119],
    [115, 118, 122, 120, 119, 116],
    [116, 121, 127, 124, 122, 119],
  ],
  // sleep stages: 1=Leve/Light  2=REM  3=Profundo/Deep
  sleep: [
    [1, 2, 3, 3, 2, 3, 1],
    [1, 2, 2, 3, 2, 2, 1],
    [1, 3, 3, 2, 3, 2, 1],
    [1, 2, 3, 3, 2, 3, 1],
    [1, 2, 2, 3, 2, 1, 1],
    [1, 2, 3, 2, 2, 1, 1],
    [1, 2, 3, 2, 3, 2, 1],
  ],
  heartRate: [
    [62, 68, 76, 72, 70, 65],
    [64, 70, 79, 74, 72, 66],
    [63, 69, 77, 73, 71, 65],
    [61, 67, 74, 70, 68, 63],
    [63, 71, 78, 74, 72, 66],
    [62, 68, 76, 72, 70, 64],
    [62, 68, 75, 71, 69, 64],
  ],
};

const activityLog = {
  pt: [
    { day: 'Seg, 27 Mar', type: 'Caminhada', duration: '35 min', extra: '2,8 km', icon: '🚶', cal: 145 },
    { day: 'Ter, 28 Mar', type: 'Corrida',   duration: '22 min', extra: '3,5 km', icon: '🏃', cal: 210 },
    { day: 'Qua, 29 Mar', type: 'Ginásio',   duration: '55 min', extra: '',       icon: '🏋️', cal: 320 },
    { day: 'Qui, 30 Mar', type: 'Caminhada', duration: '28 min', extra: '2,2 km', icon: '🚶', cal: 115 },
    { day: 'Sex, 31 Mar', type: 'Yoga',      duration: '40 min', extra: '',       icon: '🧘', cal: 130 },
    { day: 'Sáb, 1 Abr', type: 'Corrida',   duration: '30 min', extra: '5,1 km', icon: '🏃', cal: 285 },
    { day: 'Dom, 2 Abr', type: 'Caminhada', duration: '45 min', extra: '3,6 km', icon: '🚶', cal: 185 },
  ],
  en: [
    { day: 'Mon, 27 Mar', type: 'Walk',    duration: '35 min', extra: '2.8 km', icon: '🚶', cal: 145 },
    { day: 'Tue, 28 Mar', type: 'Running', duration: '22 min', extra: '3.5 km', icon: '🏃', cal: 210 },
    { day: 'Wed, 29 Mar', type: 'Gym',     duration: '55 min', extra: '',       icon: '🏋️', cal: 320 },
    { day: 'Thu, 30 Mar', type: 'Walk',    duration: '28 min', extra: '2.2 km', icon: '🚶', cal: 115 },
    { day: 'Fri, 31 Mar', type: 'Yoga',    duration: '40 min', extra: '',       icon: '🧘', cal: 130 },
    { day: 'Sat, 1 Apr',  type: 'Running', duration: '30 min', extra: '5.1 km', icon: '🏃', cal: 285 },
    { day: 'Sun, 2 Apr',  type: 'Walk',    duration: '45 min', extra: '3.6 km', icon: '🚶', cal: 185 },
  ],
};

const metricKeys = ['glucose', 'bp', 'sleep', 'heartRate'];

function formatSleep(v) {
  return `${Math.floor(v)}h ${Math.round((v % 1) * 60)}m`;
}

function SleepStageLabel({ v, lang }) {
  const labels = {
    1: { pt: 'Leve',     en: 'Light', color: '#5B8DEF' },
    2: { pt: 'REM',      en: 'REM',   color: '#A63F52' },
    3: { pt: 'Profundo', en: 'Deep',  color: '#28a878' },
  };
  const l = labels[v] || labels[1];
  return <span style={{ color: l.color, fontWeight: 700 }}>{lang === 'en' ? l.en : l.pt}</span>;
}

export default function AdultHome({ navigate, lang = 'pt' }) {
  const T = translations[lang];
  const [selectedMetric, setSelectedMetric] = useState(null);
  const [selectedDay, setSelectedDay]       = useState(null);

  const metrics = T.adultMetrics.map((m, i) => {
    const values = [r.bloodGlucose, `${r.bloodPressure.systolic}/${r.bloodPressure.diastolic}`, r.sleep, r.heartRate];
    const dots   = ['#28a878', '#A63F52', '#28a878', '#28a878'];
    return { ...m, value: values[i], dot: dots[i], key: metricKeys[i] };
  });

  const dates      = weekDates[lang] || weekDates.pt;
  const activities = activityLog[lang] || activityLog.pt;
  const selected   = (selectedMetric && selectedMetric !== 'activity') ? metricHistory[selectedMetric] : null;

  const getSelectedLabel = () => {
    if (!selectedMetric || selectedMetric === 'activity') return '';
    const idx = metricKeys.indexOf(selectedMetric);
    return idx >= 0 ? metrics[idx].label : '';
  };

  const getCurrentValue = () => {
    switch (selectedMetric) {
      case 'glucose':   return `${r.bloodGlucose}`;
      case 'bp':        return `${r.bloodPressure.systolic}/${r.bloodPressure.diastolic}`;
      case 'sleep':     return r.sleep;
      case 'heartRate': return `${r.heartRate}`;
      default:          return '';
    }
  };

  const dayHourly = (selectedDay !== null && selectedMetric && dailyHourly[selectedMetric])
    ? dailyHourly[selectedMetric][selectedDay]
    : null;
  const dayTimes = selectedMetric === 'sleep' ? sleepTimes : hourlyTimes;

  const totalMins  = activities.reduce((s, a) => s + parseInt(a.duration), 0);
  const avgMins    = Math.round(totalMins / 7);
  const totalCal   = activities.reduce((s, a) => s + a.cal, 0);

  const closeMetric = () => { setSelectedMetric(null); setSelectedDay(null); };

  return (
    <div className="screen">
      <StatusBar />

      {/* Header */}
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
              <div key={m.label} className="metric-card" onClick={() => setSelectedMetric(m.key)} style={{ cursor: 'pointer' }}>
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

          {/* Physical Activity card */}
          <div className="metric-card" onClick={() => setSelectedMetric('activity')}
            style={{ marginTop: 10, cursor: 'pointer' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.4px' }}>
                🏃 {lang === 'en' ? 'Physical Activity' : 'Atividade Física'}
              </span>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#28a878' }} />
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 16 }}>
              <div>
                <div style={{ fontSize: 20, fontWeight: 800, color: 'var(--ink)', lineHeight: 1.1 }}>
                  🚶 45 min
                </div>
                <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 3 }}>
                  {r.steps.toLocaleString(lang === 'en' ? 'en-GB' : 'pt-PT')} {lang === 'en' ? 'steps' : 'passos'}
                </div>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 11, color: 'var(--muted)', marginBottom: 4, textAlign: 'right' }}>83%</div>
                <div style={{ height: 7, background: 'var(--cream)', borderRadius: 4 }}>
                  <div style={{ height: 7, background: 'var(--mint)', borderRadius: 4, width: '83%' }} />
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 4 }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: '#28a878' }}>{T.adultNormal}</div>
              <div style={{ fontSize: 12, color: 'var(--muted)' }}>›</div>
            </div>
          </div>
        </div>

        {/* Diet button */}
        <div style={{ padding: '12px 16px 4px' }}>
          <button onClick={() => {}} style={{
            width: '100%', background: '#fff', border: '1.5px solid var(--border)',
            borderRadius: 18, padding: '14px 18px', display: 'flex', alignItems: 'center',
            gap: 14, cursor: 'pointer', textAlign: 'left',
          }}>
            <span style={{ fontSize: 28 }}>🥗</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--ink)' }}>
                {lang === 'en' ? 'Food Diary' : 'Registo Alimentar'}
              </div>
              <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 2 }}>
                {lang === 'en' ? 'Log meals and track nutrition' : 'Registar refeições e nutrição'}
              </div>
            </div>
            <span style={{ fontSize: 16, color: 'var(--muted)' }}>›</span>
          </button>
        </div>

        {/* Recommendations */}
        <div className="section-title" style={{ marginTop: 8 }}>{T.adultRecommendations}</div>
        <div style={{ padding: '0 16px', display: 'flex', flexDirection: 'column', gap: 8 }}>
          {[{ icon: '✅', text: T.adultRec1 }, { icon: '🚶', text: T.adultRec2 }].map((rec, i) => (
            <div key={i} style={{
              background: '#fff', borderRadius: 16, padding: '12px 14px',
              border: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 12,
            }}>
              <span style={{ fontSize: 20 }}>{rec.icon}</span>
              <span style={{ fontSize: 13, color: 'var(--ink)', flex: 1, lineHeight: 1.45 }}>{rec.text}</span>
            </div>
          ))}

          <div style={{
            background: 'linear-gradient(135deg, #590212, #A63F52)', borderRadius: 16, padding: '14px 16px',
            display: 'flex', alignItems: 'center', gap: 12, boxShadow: '0 4px 16px rgba(89,2,18,0.25)',
          }}>
            <span style={{ fontSize: 24 }}>🏥</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#fff' }}>{T.adultConsultCard}</div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.8)', marginTop: 2 }}>{T.adultConsultDetail}</div>
            </div>
            <span style={{ fontSize: 11, fontWeight: 700, background: 'rgba(255,255,255,0.2)', color: '#fff', padding: '4px 10px', borderRadius: 20 }}>{T.adultDays}</span>
          </div>

          <div style={{
            background: '#fff', borderRadius: 16, padding: '14px 16px',
            border: '1.5px solid #f5c87a', display: 'flex', alignItems: 'center', gap: 12,
          }}>
            <span style={{ fontSize: 24 }}>🩺</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--ink)' }}>{T.adultEcgTitle}</div>
              <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 2 }}>{T.adultEcgDetail}</div>
            </div>
            <span style={{ fontSize: 11, fontWeight: 700, background: '#fff3e0', color: '#b06000', padding: '4px 10px', borderRadius: 20 }}>{T.adultToday}</span>
          </div>
        </div>

        {/* CTA */}
        <div style={{ padding: '18px 16px 16px' }}>
          <button onClick={() => navigate('home')} style={{
            width: '100%', background: 'linear-gradient(135deg, #590212, #A63F52)',
            color: '#fff', border: 'none', borderRadius: 18, padding: '18px',
            fontSize: 16, fontWeight: 700, cursor: 'pointer',
            boxShadow: '0 4px 16px rgba(89,2,18,0.35)',
          }}>
            {T.adultCTA}
          </button>
        </div>
      </div>

      <BottomNavAdult active="home" navigate={navigate} lang={lang} />

      {/* ─── METRIC DETAIL OVERLAY ─── */}
      {selectedMetric && selectedMetric !== 'activity' && selected && (
        <div style={{
          position: 'absolute', inset: 0, background: '#faf8f5', zIndex: 50,
          display: 'flex', flexDirection: 'column', borderRadius: 'inherit', overflow: 'hidden',
        }}>
          <StatusBar />
          <div style={{ padding: '8px 20px 14px', display: 'flex', alignItems: 'center', gap: 12 }}>
            <button onClick={closeMetric}
              style={{ background: 'transparent', border: 'none', fontSize: 22, cursor: 'pointer', color: 'var(--wine-md)' }}>←</button>
            <div style={{ fontSize: 20, fontWeight: 800, color: 'var(--ink)', flex: 1 }}>{getSelectedLabel()}</div>
            <span style={{ fontSize: 11, fontWeight: 700, padding: '4px 10px', borderRadius: 20, background: '#e8f8f0', color: '#1a7a5a' }}>
              {T.adultNormal}
            </span>
          </div>

          {/* ── DAY DETAIL: intraday fluctuations ── */}
          {selectedDay !== null && dayHourly ? (
            <div style={{ padding: '0 16px 16px', overflowY: 'auto', flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                <button onClick={() => setSelectedDay(null)} style={{
                  background: 'var(--cream)', border: 'none', borderRadius: 10,
                  padding: '6px 12px', fontSize: 13, fontWeight: 600, color: 'var(--wine-md)', cursor: 'pointer',
                }}>← {dates[selectedDay]}</button>
                <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--ink)' }}>
                  {lang === 'en' ? 'Intraday fluctuation' : 'Flutuações do dia'}
                </span>
              </div>

              <div style={{ background: '#fff', borderRadius: 20, padding: '18px', border: '1px solid var(--border)', marginBottom: 14 }}>
                <MiniChart data={dayHourly} color={selected.color} height={80} />
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
                  {dayTimes.map((t, i) => (
                    <span key={i} style={{ fontSize: 9, color: 'var(--muted)', textAlign: 'center' }}>{t}</span>
                  ))}
                </div>
              </div>

              <div style={{ background: '#fff', borderRadius: 20, padding: '16px 18px', border: '1px solid var(--border)' }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--ink)', marginBottom: 12 }}>
                  {lang === 'en' ? 'Values by time' : 'Valores por hora'}
                </div>
                {dayHourly.map((v, i) => (
                  <div key={i} style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    padding: '8px 0',
                    borderBottom: i < dayHourly.length - 1 ? '1px solid var(--border-lt)' : 'none',
                  }}>
                    <span style={{ fontSize: 13, color: 'var(--muted)' }}>{dayTimes[i]}</span>
                    <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--ink)' }}>
                      {selectedMetric === 'sleep'
                        ? <SleepStageLabel v={v} lang={lang} />
                        : <>{v}{selected.unit && <span style={{ fontSize: 11, color: 'var(--muted)', fontWeight: 400, marginLeft: 4 }}>{selected.unit}</span>}</>
                      }
                    </span>
                  </div>
                ))}
              </div>
            </div>

          ) : (
            /* ── WEEK OVERVIEW ── */
            <div style={{ padding: '0 16px 16px', overflowY: 'auto', flex: 1 }}>
              {/* Current value */}
              <div style={{ background: '#fff', borderRadius: 20, padding: '20px', border: '1px solid var(--border)', marginBottom: 14 }}>
                <div style={{ fontSize: 12, color: 'var(--muted)', fontWeight: 600, marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.4px' }}>
                  {lang === 'en' ? 'Current value' : 'Valor atual'}
                </div>
                <div>
                  <span style={{ fontSize: 40, fontWeight: 800, color: 'var(--wine)', lineHeight: 1 }}>{getCurrentValue()}</span>
                  {selected.unit && <span style={{ fontSize: 15, color: 'var(--muted)', marginLeft: 6 }}>{selected.unit}</span>}
                </div>
                <div style={{ fontSize: 12, color: '#1a7a5a', fontWeight: 600, marginTop: 8 }}>
                  ✓ {T.adultNormal} · {lang === 'en' ? 'Reference' : 'Referência'}: {selected.normal}
                </div>
              </div>

              {/* Weekly chart */}
              <div style={{ background: '#fff', borderRadius: 20, padding: '18px', border: '1px solid var(--border)', marginBottom: 14 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--ink)', marginBottom: 14 }}>
                  {lang === 'en' ? 'Weekly average' : 'Média semanal'}
                </div>
                <MiniChart data={selected.data} color={selected.color} height={80} />
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
                  {dates.map((l, i) => (
                    <span key={i} style={{ fontSize: 9, color: 'var(--muted)', textAlign: 'center' }}>{l}</span>
                  ))}
                </div>
              </div>

              {/* Daily detail — each row is clickable */}
              <div style={{ background: '#fff', borderRadius: 20, padding: '16px 18px', border: '1px solid var(--border)' }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--ink)', marginBottom: 2 }}>
                  {lang === 'en' ? 'Daily detail' : 'Detalhe diário'}
                </div>
                <div style={{ fontSize: 11, color: 'var(--muted)', marginBottom: 12 }}>
                  {lang === 'en' ? 'Tap a day to see intraday fluctuations' : 'Toca num dia para ver as flutuações'}
                </div>
                {selected.data.map((v, i) => {
                  const displayVal = selectedMetric === 'sleep' ? formatSleep(v) : String(v);
                  return (
                    <div key={i} onClick={() => setSelectedDay(i)} style={{
                      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                      padding: '10px 0', cursor: 'pointer',
                      borderBottom: i < selected.data.length - 1 ? '1px solid var(--border-lt)' : 'none',
                    }}>
                      <span style={{ fontSize: 13, color: 'var(--muted)' }}>{dates[i]}</span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--ink)' }}>
                          {displayVal}
                          {selected.unit && <span style={{ fontSize: 11, color: 'var(--muted)', fontWeight: 400, marginLeft: 4 }}>{selected.unit}</span>}
                        </span>
                        <span style={{ fontSize: 12, color: 'var(--muted)' }}>›</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ─── PHYSICAL ACTIVITY OVERLAY ─── */}
      {selectedMetric === 'activity' && (
        <div style={{
          position: 'absolute', inset: 0, background: '#faf8f5', zIndex: 50,
          display: 'flex', flexDirection: 'column', borderRadius: 'inherit', overflow: 'hidden',
        }}>
          <StatusBar />
          <div style={{ padding: '8px 20px 14px', display: 'flex', alignItems: 'center', gap: 12 }}>
            <button onClick={() => setSelectedMetric(null)}
              style={{ background: 'transparent', border: 'none', fontSize: 22, cursor: 'pointer', color: 'var(--wine-md)' }}>←</button>
            <div style={{ fontSize: 20, fontWeight: 800, color: 'var(--ink)', flex: 1 }}>
              {lang === 'en' ? 'Physical Activity' : 'Atividade Física'}
            </div>
          </div>

          <div style={{ padding: '0 16px 16px', overflowY: 'auto', flex: 1 }}>
            {/* Weekly summary banner */}
            <div style={{
              background: 'linear-gradient(135deg, #590212, #A63F52)',
              borderRadius: 20, padding: '18px 20px', marginBottom: 16,
              display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8,
            }}>
              {[
                { label: lang === 'en' ? 'Avg / day' : 'Média / dia', value: `${avgMins} min` },
                { label: lang === 'en' ? 'Total week' : 'Total semana', value: `${totalMins} min` },
                { label: lang === 'en' ? 'Calories' : 'Calorias', value: `${totalCal} kcal` },
              ].map(s => (
                <div key={s.label} style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 20, fontWeight: 800, color: '#fff' }}>{s.value}</div>
                  <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.7)', marginTop: 3 }}>{s.label}</div>
                </div>
              ))}
            </div>

            {/* Activity log */}
            <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--ink)', marginBottom: 10, paddingLeft: 2 }}>
              {lang === 'en' ? 'This week' : 'Esta semana'}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 18 }}>
              {activities.map((a, i) => (
                <div key={i} style={{
                  background: '#fff', borderRadius: 16, padding: '14px 16px',
                  border: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 14,
                }}>
                  <span style={{ fontSize: 26 }}>{a.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--ink)' }}>{a.type}</div>
                    <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 2 }}>
                      {a.day} · {a.duration}{a.extra ? ` · ${a.extra}` : ''}
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: 14, fontWeight: 800, color: 'var(--wine-md)' }}>{a.cal}</div>
                    <div style={{ fontSize: 10, color: 'var(--muted)' }}>kcal</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Daily goals */}
            <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--ink)', marginBottom: 10, paddingLeft: 2 }}>
              {lang === 'en' ? 'Daily Goals' : 'Metas Diárias'}
            </div>
            <div style={{ background: '#fff', borderRadius: 20, padding: '16px 18px', border: '1px solid var(--border)' }}>
              {[
                { icon: '🚶', label: lang === 'en' ? 'Steps' : 'Passos',             current: lang === 'en' ? '8,347' : '8.347', goal: lang === 'en' ? '10,000' : '10.000', pct: 83 },
                { icon: '⏱️', label: lang === 'en' ? 'Active minutes' : 'Min. ativos', current: '45',   goal: '60',  pct: 75 },
                { icon: '🔥', label: lang === 'en' ? 'Calories burned' : 'Calorias',  current: '185',  goal: '400', pct: 46 },
              ].map((g, i, arr) => (
                <div key={i} style={{ padding: '10px 0', borderBottom: i < arr.length - 1 ? '1px solid var(--border-lt)' : 'none' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                    <span style={{ fontSize: 13, color: 'var(--ink)', fontWeight: 600 }}>{g.icon} {g.label}</span>
                    <span style={{ fontSize: 12, color: 'var(--muted)' }}>{g.current} / {g.goal}</span>
                  </div>
                  <div style={{ height: 7, background: 'var(--cream)', borderRadius: 4 }}>
                    <div style={{ height: 7, background: 'var(--mint)', borderRadius: 4, width: `${g.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

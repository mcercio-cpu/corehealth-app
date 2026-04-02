import { useState } from 'react';
import StatusBar from '../../components/StatusBar';
import BottomNavAdult from '../../components/BottomNavAdult';
import MiniChart from '../../components/MiniChart';
import { rosaBiometrics } from '../../data/mockBiometrics';
import { translations } from '../../data/translations';

const rosaLatest = rosaBiometrics[0];

// 7-day mock history for Rosa
const rosaHistory = {
  dates: { pt: ['27 Mar', '28', '29', '30', '31', '1 Abr', '2'], en: ['27 Mar', '28', '29', '30', '31', '1 Apr', '2'] },
  systolic: [148, 152, 144, 155, 149, 158, 156],
  diastolic: [92, 95, 90, 97, 91, 96, 94],
  glucose: [142, 138, 145, 151, 148, 154, 156],
};

export default function AdultFamilia({ navigate, lang = 'pt' }) {
  const T = translations[lang];
  const [showCall, setShowCall] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

  const rosaConsultas = lang === 'en' ? [
    { icon: '🏥', title: 'Appointment — Diabetes Clinic', date: 'Thursday, April 10 at 10:00', days: '8 days', urgent: false },
    { icon: '💊', title: 'Medication renewal — Metformin', date: 'Monday, April 7 at 09:00', days: '5 days', urgent: false },
    { icon: '🩺', title: 'Fasting blood tests', date: 'Tomorrow, April 3 at 08:30', days: 'Tomorrow', urgent: true },
  ] : [
    { icon: '🏥', title: 'Consulta — Clínica de Diabetes', date: 'Quinta, 10 Abr às 10:00', days: '8 dias', urgent: false },
    { icon: '💊', title: 'Renovar medicação — Metformina', date: 'Segunda, 7 Abr às 09:00', days: '5 dias', urgent: false },
    { icon: '🩺', title: 'Análises de sangue em jejum', date: 'Amanhã, 3 Abr às 08:30', days: 'Amanhã', urgent: true },
  ];

  const statusColor = {
    ok: { bg: '#e8f8f0', text: '#1a7a5a', border: '#a7ddc4' },
    warning: { bg: '#fff3e0', text: '#b06000', border: '#f5c87a' },
    alert: { bg: '#fee2e2', text: '#dc2626', border: '#fca5a5' },
    muted: { bg: 'var(--cream)', text: 'var(--muted)', border: 'var(--border)' },
  };

  const member = {
    id: 'rosa',
    name: 'Rosa Santos',
    relation: lang === 'en' ? 'Mum' : 'Mãe',
    age: 68,
    avatar: '👵',
    lastUpdate: lang === 'en' ? '2 hours ago' : 'há 2 horas',
    status: 'warning',
    statusText: T.adultFamilyWarning,
    data: {
      tensao: `${rosaLatest.bloodPressure.systolic}/${rosaLatest.bloodPressure.diastolic} mmHg`,
      tensaoStatus: 'ok',
      glicose: `${rosaLatest.bloodGlucose} mg/dL`,
      glicoseStatus: 'warning',
      medicacao: rosaLatest.medicationTaken ? T.adultFamilyMedTaken : T.adultFamilyMedNone,
      medicacaoStatus: rosaLatest.medicationTaken ? 'ok' : 'warning',
    },
    suggestions: lang === 'en' ? [
      { text: 'Suggest hydration and light movement', icon: '💧' },
      { text: 'Check if she is resting well', icon: '😴' },
    ] : [
      { text: 'Sugerir hidratação e movimento leve', icon: '💧' },
      { text: 'Verificar se está a descansar bem', icon: '😴' },
    ],
  };

  const sc = statusColor[member.status];
  const histDates = rosaHistory.dates[lang] || rosaHistory.dates.pt;

  return (
    <div className="screen">
      <StatusBar />
      <div style={{ padding: '8px 20px 14px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <div>
          <div style={{ fontSize: 20, fontWeight: 800, color: 'var(--ink)' }}>{T.adultFamilyTitle}</div>
          <div style={{ fontSize: 12, color: 'var(--muted)' }}>{T.adultFamilySub}</div>
        </div>
        <button style={{
          marginLeft: 'auto', background: 'var(--cream)', border: 'none',
          borderRadius: 12, padding: '8px 14px', fontSize: 13, fontWeight: 600, color: 'var(--wine-md)', cursor: 'pointer',
        }}>
          {T.adultFamilyAdd}
        </button>
      </div>

      <div className="scroll-area">
        <div style={{ margin: '0 16px 16px' }}>
          {/* Member header card */}
          <div style={{
            background: '#fff',
            borderRadius: 20,
            border: `1.5px solid ${sc.border}`,
            overflow: 'hidden',
          }}>
            {/* Top row */}
            <div style={{
              background: `${sc.bg}`,
              padding: '14px 16px',
              display: 'flex',
              alignItems: 'center',
              gap: 14,
            }}>
              <div style={{ fontSize: 36 }}>{member.avatar}</div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: 16, fontWeight: 700, color: 'var(--ink)' }}>{member.name}</span>
                  <span style={{ fontSize: 11, color: 'var(--muted)', fontWeight: 500 }}>({member.relation})</span>
                </div>
                <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 2 }}>
                  {member.age} {lang === 'en' ? 'years' : 'anos'} · {T.adultFamilyLastUpdate} {member.lastUpdate}
                </div>
                <div style={{ fontSize: 12, fontWeight: 700, color: sc.text, marginTop: 4 }}>
                  {member.statusText}
                </div>
              </div>
            </div>

            {/* Data rows */}
            <div style={{ padding: '14px 16px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, marginBottom: 14 }}>
                {[
                  { label: T.adultFamilyBPLabel, value: member.data.tensao, status: member.data.tensaoStatus },
                  { label: T.adultFamilyGlucLabel, value: member.data.glicose, status: member.data.glicoseStatus },
                  { label: T.adultFamilyMedLabel, value: member.data.medicacao, status: member.data.medicacaoStatus },
                ].map(d => {
                  const ds = statusColor[d.status] || statusColor.muted;
                  return (
                    <div key={d.label} style={{
                      background: ds.bg, borderRadius: 12, padding: '10px 10px', textAlign: 'center',
                      border: `1px solid ${ds.border}`,
                    }}>
                      <div style={{ fontSize: 10, color: 'var(--muted)', fontWeight: 600, marginBottom: 4 }}>{d.label}</div>
                      <div style={{ fontSize: 12, fontWeight: 700, color: ds.text, lineHeight: 1.3 }}>{d.value}</div>
                    </div>
                  );
                })}
              </div>

              {/* Suggestions */}
              {member.suggestions.map((s, i) => (
                <div key={i} style={{
                  background: 'var(--cream-lt)', borderRadius: 12, padding: '10px 12px',
                  marginBottom: 6, display: 'flex', alignItems: 'center', gap: 10,
                }}>
                  <span style={{ fontSize: 18 }}>{s.icon}</span>
                  <span style={{ fontSize: 12, color: 'var(--ink)', flex: 1 }}>{s.text}</span>
                </div>
              ))}

              {/* Action buttons */}
              <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
                <button
                  onClick={() => setShowCall(true)}
                  style={{
                    flex: 1, background: 'var(--wine-md)', color: '#fff', border: 'none',
                    borderRadius: 14, padding: '12px', fontSize: 13, fontWeight: 700, cursor: 'pointer',
                  }}
                >
                  {T.adultFamilyContact}
                </button>
                <button
                  onClick={() => setShowHistory(h => !h)}
                  style={{
                    flex: 1,
                    background: showHistory ? 'var(--wine-md)' : 'var(--cream)',
                    color: showHistory ? '#fff' : 'var(--wine-md)',
                    border: '1px solid var(--border)',
                    borderRadius: 14, padding: '12px', fontSize: 13, fontWeight: 700, cursor: 'pointer',
                  }}
                >
                  {T.adultFamilyHistory}
                </button>
              </div>

              {/* History charts */}
              {showHistory && (
                <div style={{ marginTop: 16, borderTop: '1px solid var(--border-lt)', paddingTop: 16 }}>
                  <div style={{ marginBottom: 18 }}>
                    <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.4px', marginBottom: 8 }}>
                      {T.adultFamilyBP7}
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                      <span style={{ fontSize: 10, color: 'var(--muted)' }}>mmHg</span>
                      <span style={{ fontSize: 10, color: 'var(--muted)' }}>{T.adultFamilyBPNormal}</span>
                    </div>
                    <MiniChart data={rosaHistory.systolic} color="#A63F52" height={60} />
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
                      {histDates.map((d, i) => (
                        <span key={i} style={{ fontSize: 9, color: 'var(--muted)' }}>{d}</span>
                      ))}
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
                      {rosaHistory.systolic.map((v, i) => (
                        <span key={i} style={{ fontSize: 10, fontWeight: 700, color: v >= 150 ? '#b06000' : 'var(--ink)', textAlign: 'center', flex: 1 }}>{v}</span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.4px', marginBottom: 8 }}>
                      {T.adultFamilyGlucose7}
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                      <span style={{ fontSize: 10, color: 'var(--muted)' }}>mg/dL</span>
                      <span style={{ fontSize: 10, color: 'var(--muted)' }}>{T.adultFamilyGlucNormal}</span>
                    </div>
                    <MiniChart data={rosaHistory.glucose} color="#b06000" height={60} />
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
                      {histDates.map((d, i) => (
                        <span key={i} style={{ fontSize: 9, color: 'var(--muted)' }}>{d}</span>
                      ))}
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
                      {rosaHistory.glucose.map((v, i) => (
                        <span key={i} style={{ fontSize: 10, fontWeight: 700, color: v >= 140 ? '#b06000' : 'var(--ink)', textAlign: 'center', flex: 1 }}>{v}</span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Upcoming appointments */}
          <div style={{ marginTop: 4 }}>
            <div className="section-title" style={{ padding: '12px 0 8px' }}>{T.adultFamilyUpcoming}</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {rosaConsultas.map((c, i) => (
                <div key={i} style={{
                  background: '#fff',
                  borderRadius: 16,
                  padding: '14px 16px',
                  border: c.urgent ? '1.5px solid #f5c87a' : '1px solid var(--border)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                }}>
                  <span style={{ fontSize: 22 }}>{c.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--ink)' }}>{c.title}</div>
                    <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 2 }}>{c.date}</div>
                  </div>
                  <span style={{
                    fontSize: 11, fontWeight: 700,
                    background: c.urgent ? '#fff3e0' : 'var(--cream)',
                    color: c.urgent ? '#b06000' : 'var(--muted)',
                    padding: '4px 10px', borderRadius: 20,
                    whiteSpace: 'nowrap',
                  }}>{c.days}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Info note */}
        <div style={{ margin: '0 16px 16px', padding: '14px 16px', background: 'var(--cream)', borderRadius: 16, border: '1px solid var(--border)' }}>
          <div style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.5, textAlign: 'center' }}>
            {T.adultFamilyPrivacy}
          </div>
        </div>
      </div>

      <BottomNavAdult active="familia" navigate={navigate} lang={lang} />

      {/* Fake call screen overlay */}
      {showCall && (
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(160deg, #1a0a0e 0%, #590212 60%, #A63F52 100%)',
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'space-between',
          padding: '60px 32px 56px',
          zIndex: 100,
          borderRadius: 'inherit',
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', fontWeight: 500, marginBottom: 12 }}>{T.adultFamilyCallTitle}</div>
            <div style={{
              width: 96, height: 96, borderRadius: '50%',
              background: 'rgba(255,255,255,0.15)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 52, margin: '0 auto 20px',
              boxShadow: '0 0 0 12px rgba(255,255,255,0.08)',
              animation: 'pulse 2s ease-in-out infinite',
            }}>
              👵
            </div>
            <div style={{ fontSize: 26, fontWeight: 800, color: '#fff', marginBottom: 6 }}>Rosa Santos</div>
            <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)' }}>{T.adultFamilyCallSub}</div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20, width: '100%' }}>
            <div style={{ display: 'flex', gap: 32, justifyContent: 'center' }}>
              {[
                { icon: '🔇', label: T.adultFamilyMute },
                { icon: '⌨️', label: T.adultFamilyKeypad },
                { icon: '🔊', label: T.adultFamilySpeaker },
              ].map(a => (
                <div key={a.label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                  <div style={{
                    width: 56, height: 56, borderRadius: '50%',
                    background: 'rgba(255,255,255,0.12)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 24, cursor: 'pointer',
                  }}>
                    {a.icon}
                  </div>
                  <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)' }}>{a.label}</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => setShowCall(false)}
              style={{
                width: 72, height: 72, borderRadius: '50%',
                background: '#dc2626', border: 'none',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 28, cursor: 'pointer',
                boxShadow: '0 6px 24px rgba(220,38,38,0.5)',
              }}
            >
              📵
            </button>
            <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>{T.adultFamilyEndCall}</span>
          </div>
        </div>
      )}
    </div>
  );
}

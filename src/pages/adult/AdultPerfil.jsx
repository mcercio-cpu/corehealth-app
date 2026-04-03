import StatusBar from '../../components/StatusBar';
import BottomNavAdult from '../../components/BottomNavAdult';
import MiniLogo from '../../components/MiniLogo';
import { ricardoMedications } from '../../data/mockMedications';
import { translations } from '../../data/translations';

export default function AdultPerfil({ navigate, onLogout, lang = 'pt' }) {
  const T = translations[lang];
  const wearables = ['Apple Watch', 'Oura Ring'];

  return (
    <div className="screen">
      <StatusBar />

      <div style={{ padding: '8px 20px 14px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <MiniLogo navigate={navigate} />
        <div style={{ fontSize: 20, fontWeight: 800, color: 'var(--ink)', flex: 1 }}>{T.adultPerfilTitle}</div>
        <button style={{
          background: 'var(--cream)', border: 'none', borderRadius: 12,
          padding: '8px 14px', fontSize: 13, fontWeight: 600, color: 'var(--wine-md)', cursor: 'pointer',
        }}>{T.adultPerfilEdit}</button>
      </div>

      <div className="scroll-area">
        {/* Profile card */}
        <div style={{ margin: '0 16px 16px' }}>
          <div style={{
            background: 'linear-gradient(135deg, #590212 0%, #A63F52 100%)',
            borderRadius: 20,
            padding: '20px',
            color: '#fff',
            display: 'flex',
            gap: 16,
            alignItems: 'center',
          }}>
            <div style={{
              width: 64, height: 64, borderRadius: '50%',
              background: 'rgba(255,255,255,0.2)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 32,
            }}>
              🧑
            </div>
            <div>
              <div style={{ fontSize: 20, fontWeight: 800 }}>Ricardo Santos</div>
              <div style={{ fontSize: 13, opacity: 0.8, marginTop: 3 }}>{lang === 'en' ? '32 years · Lisbon' : '32 anos · Lisboa'}</div>
              <div style={{ fontSize: 12, opacity: 0.7, marginTop: 4 }}>ricardo.santos@email.com</div>
              <div style={{ fontSize: 12, opacity: 0.7 }}>+351 91 234 5678</div>
            </div>
          </div>
        </div>

        {/* Conditions */}
        <div className="section-title">{T.adultPerfilConditions}</div>
        <div style={{ margin: '0 16px 16px', background: '#fff', borderRadius: 20, padding: '16px', border: '1px solid var(--border)' }}>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 10 }}>
            {T.adultPerfilConditionTags.map((c, i) => (
              <span key={i} style={{
                fontSize: 12, fontWeight: 600, padding: '5px 12px', borderRadius: 20,
                background: i === 0 ? '#fee2e2' : 'var(--cream)', color: i === 0 ? '#dc2626' : 'var(--muted)',
                textDecoration: i > 0 ? 'line-through' : 'none',
                opacity: i > 0 ? 0.6 : 1,
              }}>
                {c}
              </span>
            ))}
          </div>
          <div style={{ fontSize: 13, color: 'var(--ink)', fontStyle: 'italic', borderTop: '1px solid var(--border-lt)', paddingTop: 10 }}>
            {T.adultPerfilNote}
          </div>
          <div style={{ fontSize: 12, color: 'var(--wine-md)', fontWeight: 600, marginTop: 6 }}>
            {T.adultPerfilFamilyHistory}
          </div>
        </div>

        {/* Medications */}
        <div className="section-title">{T.adultPerfilMeds}</div>
        <div style={{ margin: '0 16px 16px' }}>
          {ricardoMedications.map(med => (
            <div key={med.id} style={{
              background: '#fff', borderRadius: 18, padding: '16px', border: '1px solid var(--border)', marginBottom: 10,
              display: 'flex', gap: 14, alignItems: 'center',
            }}>
              <span style={{ fontSize: 28 }}>💊</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--ink)' }}>{med.name} {med.dosage}</div>
                <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 2 }}>{med.timeOfDay} · {med.timeLabel}</div>
                <div style={{ fontSize: 12, color: 'var(--muted)', fontStyle: 'italic' }}>{med.instructions}</div>
              </div>
              <div style={{
                background: '#e8f8f0', border: '1px solid #a7ddc4',
                borderRadius: 12, padding: '6px 10px', textAlign: 'center',
              }}>
                <div style={{ fontSize: 18, fontWeight: 800, color: '#1a7a5a' }}>{med.adherenceStreak}</div>
                <div style={{ fontSize: 9, color: '#1a7a5a', fontWeight: 600 }}>{T.adultPerfilDays}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Wearables */}
        <div className="section-title">{T.adultPerfilWearables}</div>
        <div style={{ margin: '0 16px 16px', background: '#fff', borderRadius: 20, padding: '16px', border: '1px solid var(--border)' }}>
          {wearables.map((w, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', gap: 14,
              padding: '10px 0',
              borderBottom: i < wearables.length - 1 ? '1px solid var(--border-lt)' : 'none',
            }}>
              <span style={{ fontSize: 24 }}>{i === 0 ? '⌚' : '💍'}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--ink)' }}>{w}</div>
                <div style={{ fontSize: 11, color: '#28a878', fontWeight: 600 }}>{T.adultPerfilConnected}</div>
              </div>
              <button style={{
                background: 'var(--cream)', border: 'none', borderRadius: 10,
                padding: '6px 12px', fontSize: 12, fontWeight: 600, color: 'var(--muted)', cursor: 'pointer',
              }}>{T.adultPerfilManage}</button>
            </div>
          ))}
        </div>

        {/* Logout */}
        <div style={{ padding: '4px 16px 20px' }}>
          <button
            onClick={onLogout}
            style={{
              width: '100%', background: 'transparent', border: '1.5px solid #dc2626',
              borderRadius: 18, padding: '14px', fontSize: 15, fontWeight: 700,
              color: '#dc2626', cursor: 'pointer',
            }}
          >
            {T.adultPerfilLogout}
          </button>
        </div>
      </div>

      <BottomNavAdult active="perfil" navigate={navigate} lang={lang} />
    </div>
  );
}

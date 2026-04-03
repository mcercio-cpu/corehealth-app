import StatusBar from '../../components/StatusBar';
import BottomNavSenior from '../../components/BottomNavSenior';
import MiniLogo from '../../components/MiniLogo';
import { translations } from '../../data/translations';

export default function SeniorDefinicoes({ navigate, onLogout, lang = 'pt' }) {
  const T = translations[lang];
  const toggleItems = [
    { icon: '🔔', label: T.seniorToggle1, description: T.seniorToggle1Sub, enabled: true },
    { icon: '📅', label: T.seniorToggle2, description: T.seniorToggle2Sub, enabled: true },
    { icon: '⚠️', label: T.seniorToggle3, description: T.seniorToggle3Sub, enabled: false },
  ];

  return (
    <div className="screen">
      <StatusBar />

      <div style={{ padding: '8px 20px 16px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <button onClick={() => navigate('home')} style={{ background: 'transparent', border: 'none', fontSize: 22, cursor: 'pointer', color: 'var(--wine-md)' }}>←</button>
        <MiniLogo navigate={navigate} />
        <div style={{ fontSize: 20, fontWeight: 800, color: 'var(--ink)', flex: 1 }}>{T.seniorSettingsTitle}</div>
      </div>

      <div className="scroll-area">
        {/* Profile */}
        <div style={{ margin: '0 16px 14px', background: '#fff', borderRadius: 20, overflow: 'hidden', border: '1px solid var(--border)' }}>
          <div style={{ background: 'linear-gradient(135deg, #590212, #A63F52)', padding: '20px', display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28 }}>
              👵
            </div>
            <div>
              <div style={{ fontSize: 18, fontWeight: 700, color: '#fff' }}>{T.seniorProfileName}</div>
              <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.75)' }}>{T.seniorProfileAge}</div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', marginTop: 3 }}>{T.seniorProfileConditions}</div>
            </div>
          </div>
          <button style={{
            width: '100%', background: 'transparent', border: 'none', borderTop: '1px solid var(--border)',
            padding: '14px 18px', cursor: 'pointer', textAlign: 'left', fontSize: 14, fontWeight: 600, color: 'var(--wine-md)',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          }}>
            {T.seniorEditProfile} <span>›</span>
          </button>
        </div>

        {/* Emergency contact */}
        <div className="section-title">{T.seniorEmergencyContact}</div>
        <div style={{ margin: '0 16px 14px', background: '#fff', borderRadius: 20, padding: '16px 18px', border: '1px solid var(--border)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'var(--cream)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>
              👨‍💻
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--ink)' }}>{T.seniorContactName}</div>
              <div style={{ fontSize: 13, color: 'var(--muted)' }}>{T.seniorContactPhone}</div>
            </div>
            <button style={{
              background: 'var(--cream)', border: 'none', borderRadius: 12, padding: '8px 12px',
              fontSize: 13, fontWeight: 600, color: 'var(--wine-md)', cursor: 'pointer',
            }}>
              {T.seniorCallBtn}
            </button>
          </div>
        </div>

        {/* Notifications */}
        <div className="section-title">{T.seniorNotifications}</div>
        <div style={{ margin: '0 16px 14px', background: '#fff', borderRadius: 20, border: '1px solid var(--border)', overflow: 'hidden' }}>
          {toggleItems.map((item, i) => (
            <div key={i} style={{
              padding: '16px 18px',
              borderBottom: i < toggleItems.length - 1 ? '1px solid var(--border-lt)' : 'none',
              display: 'flex', alignItems: 'center', gap: 14,
            }}>
              <span style={{ fontSize: 22 }}>{item.icon}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--ink)' }}>{item.label}</div>
                <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 2 }}>{item.description}</div>
              </div>
              <div style={{
                width: 44, height: 26, borderRadius: 13,
                background: item.enabled ? 'var(--wine-md)' : '#ddd',
                position: 'relative', cursor: 'pointer', flexShrink: 0,
                transition: 'background 0.3s',
              }}>
                <div style={{
                  position: 'absolute',
                  top: 3, left: item.enabled ? 21 : 3,
                  width: 20, height: 20, borderRadius: '50%',
                  background: '#fff',
                  boxShadow: '0 1px 4px rgba(0,0,0,0.2)',
                  transition: 'left 0.3s',
                }} />
              </div>
            </div>
          ))}
        </div>

        {/* Privacy */}
        <div className="section-title">{T.seniorPrivacy}</div>
        <div style={{ margin: '0 16px 14px', background: '#fff', borderRadius: 20, padding: '14px 18px', border: '1px solid var(--border)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontSize: 22 }}>🔒</span>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--ink)' }}>{T.seniorPrivacyTitle}</div>
              <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 2 }}>{T.seniorPrivacyText}</div>
            </div>
          </div>
        </div>

        {/* About */}
        <div style={{ margin: '0 16px 6px', background: '#fff', borderRadius: 20, padding: '14px 18px', border: '1px solid var(--border)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontSize: 22 }}>ℹ️</span>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--ink)' }}>{T.seniorAbout}</div>
              <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 2 }}>{T.seniorAboutSub}</div>
            </div>
          </div>
        </div>

        {/* Logout */}
        <div style={{ padding: '16px 16px 20px' }}>
          <button
            onClick={onLogout}
            style={{
              width: '100%', background: 'transparent', border: '1.5px solid #dc2626',
              borderRadius: 18, padding: '14px', fontSize: 15, fontWeight: 700,
              color: '#dc2626', cursor: 'pointer',
            }}
          >
            {T.seniorLogout}
          </button>
        </div>
      </div>

      <BottomNavSenior active="definicoes" navigate={navigate} lang={lang} />
    </div>
  );
}

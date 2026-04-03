import StatusBar from '../../components/StatusBar';
import BottomNavAdult from '../../components/BottomNavAdult';
import MiniLogo from '../../components/MiniLogo';
import { translations } from '../../data/translations';

const tipoStyle = {
  warning: { border: '#f5c87a', bg: '#fff3e0', accent: '#b06000' },
  ok:      { border: '#a7ddc4', bg: '#e8f8f0', accent: '#1a7a5a' },
  info:    { border: 'var(--border)', bg: '#fff', accent: 'var(--wine-md)' },
  alert:   { border: '#fca5a5', bg: '#fee2e2', accent: '#dc2626' },
};

const tipoKeys = ['warning', 'ok', 'info'];

export default function AdultAlertas({ navigate, lang = 'pt' }) {
  const T = translations[lang];
  const alertas = T.alertas.map((a, i) => ({ ...a, id: `a${i + 1}`, tipo: tipoKeys[i] }));

  return (
    <div className="screen">
      <StatusBar />
      <div style={{ padding: '8px 20px 14px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 20, fontWeight: 800, color: 'var(--ink)' }}>{T.adultAlertasTitle}</div>
          <div style={{ fontSize: 12, color: 'var(--muted)' }}>{alertas.length} {lang === 'en' ? 'notifications' : 'notificações'}</div>
        </div>
        <button style={{
          background: 'transparent', border: 'none', fontSize: 13, fontWeight: 600,
          color: 'var(--muted)', cursor: 'pointer', padding: '8px',
        }}>
          {T.adultAlertasClearAll}
        </button>
        <MiniLogo navigate={navigate} />
      </div>

      <div className="scroll-area">
        <div className="section-title">{T.adultAlertasToday}</div>
        <div style={{ padding: '0 16px' }}>
          {alertas.map(a => {
            const st = tipoStyle[a.tipo];
            const icons = ['⚠️', '✅', '🏥'];
            const icon = icons[parseInt(a.id.replace('a', '')) - 1];
            return (
              <div key={a.id} style={{
                background: st.bg,
                border: `1.5px solid ${st.border}`,
                borderRadius: 20,
                padding: '16px',
                marginBottom: 12,
              }}>
                <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                  <span style={{ fontSize: 28, flexShrink: 0 }}>{icon}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--ink)', marginBottom: 4 }}>{a.titulo}</div>
                    <div style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.45 }}>{a.descricao}</div>
                    <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 6, fontWeight: 500 }}>{a.hora}</div>

                    {a.actions.length > 0 && (
                      <div style={{ display: 'flex', gap: 8, marginTop: 12, flexWrap: 'wrap' }}>
                        {a.actions.map((action, i) => (
                          <button key={i} style={{
                            background: i === 0 ? st.accent : 'transparent',
                            color: i === 0 ? '#fff' : st.accent,
                            border: `1.5px solid ${st.accent}`,
                            borderRadius: 12,
                            padding: '8px 14px',
                            fontSize: 12,
                            fontWeight: 700,
                            cursor: 'pointer',
                          }}>
                            {action}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <BottomNavAdult active="alertas" navigate={navigate} lang={lang} />
    </div>
  );
}

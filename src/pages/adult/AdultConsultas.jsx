import StatusBar from '../../components/StatusBar';
import BottomNavAdult from '../../components/BottomNavAdult';
import MiniLogo from '../../components/MiniLogo';
import { ricardoConsultas, ricardoExames } from '../../data/mockConsultas';
import { translations } from '../../data/translations';

export default function AdultConsultas({ navigate, lang = 'pt' }) {
  const T = translations[lang];

  return (
    <div className="screen">
      <StatusBar />
      <div style={{ padding: '8px 20px 14px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 20, fontWeight: 800, color: 'var(--ink)' }}>{T.adultConsultasTitle}</div>
          <div style={{ fontSize: 12, color: 'var(--muted)' }}>{T.adultConsultasSub}</div>
        </div>
        <button style={{
          background: 'var(--wine-md)', border: 'none',
          borderRadius: 12, padding: '8px 14px', fontSize: 13, fontWeight: 700, color: '#fff', cursor: 'pointer',
        }}>
          {T.adultConsultasBook}
        </button>
        <MiniLogo navigate={navigate} />
      </div>

      <div className="scroll-area">
        <div className="section-title">{T.adultConsultasUpcoming}</div>

        <div style={{ padding: '0 16px' }}>
          {ricardoConsultas.map(c => (
            <div key={c.id} style={{
              background: '#fff',
              borderRadius: 20,
              padding: '16px',
              border: '1px solid var(--border)',
              marginBottom: 12,
              display: 'flex',
              gap: 16,
              alignItems: 'flex-start',
              cursor: 'pointer',
              boxShadow: 'var(--shadow-sm)',
            }}>
              {/* Date box */}
              <div style={{
                background: 'var(--cream)',
                borderRadius: 14,
                padding: '10px 8px',
                textAlign: 'center',
                minWidth: 52,
                flexShrink: 0,
              }}>
                <div style={{ fontSize: 22, fontWeight: 800, color: 'var(--wine)', lineHeight: 1 }}>{c.dia}</div>
                <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', marginTop: 2 }}>{c.mes}</div>
              </div>

              {/* Info */}
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--ink)' }}>{c.tipo}</div>
                <div style={{ fontSize: 13, color: 'var(--muted)', marginTop: 3 }}>{c.medico}</div>
                <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 2 }}>
                  🕐 {c.hora} · {c.local}
                </div>
                {c.proximaDias <= 3 && (
                  <div style={{ marginTop: 6, fontSize: 12, fontWeight: 700, color: 'var(--wine-md)' }}>
                    ⏰ {T.adultConsultasInDays} {c.proximaDias} {T.adultConsultasDays}
                  </div>
                )}
                <div style={{ marginTop: 10, display: 'flex', gap: 8 }}>
                  <button style={{
                    background: 'var(--cream)', border: 'none', borderRadius: 10,
                    padding: '7px 12px', fontSize: 12, fontWeight: 600, color: 'var(--wine-md)', cursor: 'pointer',
                  }}>
                    {T.adultConsultasCalendar}
                  </button>
                  {c.videochamada && (
                    <button style={{
                      background: 'var(--cream)', border: 'none', borderRadius: 10,
                      padding: '7px 12px', fontSize: 12, fontWeight: 600, color: 'var(--wine-md)', cursor: 'pointer',
                    }}>
                      {T.adultConsultasVideo}
                    </button>
                  )}
                </div>
              </div>

              {/* Status chip */}
              <span style={{
                fontSize: 11, fontWeight: 700, padding: '4px 10px', borderRadius: 20, flexShrink: 0,
                background: '#e8f8f0', color: '#1a7a5a',
              }}>
                {T.adultConsultasConfirmed}
              </span>
            </div>
          ))}
        </div>

        <div className="section-title" style={{ marginTop: 6 }}>{T.adultConsultasExams}</div>
        <div style={{ padding: '0 16px' }}>
          {ricardoExames.map(ex => (
            <div key={ex.id} style={{
              background: '#fff',
              borderRadius: 20,
              padding: '16px',
              border: '1px solid var(--border)',
              marginBottom: 12,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                <span style={{ fontSize: 28 }}>🧪</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--ink)' }}>{ex.tipo}</div>
                  <div style={{ fontSize: 12, color: 'var(--muted)' }}>{ex.data} · {ex.local}</div>
                </div>
                <span style={{ fontSize: 11, fontWeight: 700, padding: '4px 10px', borderRadius: 20, background: '#e8f8f0', color: '#1a7a5a' }}>
                  {T.adultConsultasNormal}
                </span>
              </div>

              <div style={{ background: 'var(--cream-lt)', borderRadius: 14, padding: '12px 14px' }}>
                {ex.resultados.map((res, i) => (
                  <div key={i} style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    padding: '6px 0',
                    borderBottom: i < ex.resultados.length - 1 ? '1px solid var(--border-lt)' : 'none',
                  }}>
                    <span style={{ fontSize: 13, color: 'var(--muted)' }}>{res.label}</span>
                    <span style={{ fontSize: 13, fontWeight: 700, color: '#1a7a5a' }}>
                      ✓ {res.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div style={{ padding: '4px 16px 16px' }}>
          <button style={{
            width: '100%',
            background: 'transparent',
            border: '1.5px dashed var(--border)',
            borderRadius: 18,
            padding: '14px',
            fontSize: 14,
            fontWeight: 600,
            color: 'var(--muted)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
          }}>
            {T.adultConsultasUpload}
          </button>
        </div>
      </div>

      <BottomNavAdult active="consultas" navigate={navigate} lang={lang} />
    </div>
  );
}

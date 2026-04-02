import StatusBar from '../../components/StatusBar';
import BottomNavAdult from '../../components/BottomNavAdult';

const alertas = [
  {
    id: 'a1',
    tipo: 'warning',
    titulo: 'Glicose da Rosa ligeiramente alta',
    descricao: '156 mg/dL — Sugerir hidratação e movimento leve',
    hora: 'Hoje às 09:15',
    icon: '⚠️',
    actions: ['Contactar Rosa', 'Ignorar'],
  },
  {
    id: 'a2',
    tipo: 'ok',
    titulo: 'Medicamentos do Ricardo — Tudo no dia',
    descricao: 'Atorvastatina 40mg tomada às 22:00 de ontem.',
    hora: 'Ontem às 22:03',
    icon: '✅',
    actions: [],
  },
  {
    id: 'a3',
    tipo: 'info',
    titulo: 'Próxima consulta em 2 dias',
    descricao: 'Médico de Família — Dr. João Machado · Terça, 4 Abr às 14:30',
    hora: 'Quarta-feira',
    icon: '🏥',
    actions: ['Ver detalhes'],
  },
  {
    id: 'a4',
    tipo: 'alert',
    titulo: 'João sem registos há 3 dias',
    descricao: 'O seu pai não registou tensão ou medicação desde segunda-feira.',
    hora: 'Sábado',
    icon: '🔔',
    actions: ['Ligar ao Pai', 'Enviar lembrete'],
  },
];

const tipoStyle = {
  warning: { border: '#f5c87a', bg: '#fff3e0', accent: '#b06000' },
  ok: { border: '#a7ddc4', bg: '#e8f8f0', accent: '#1a7a5a' },
  info: { border: 'var(--border)', bg: '#fff', accent: 'var(--wine-md)' },
  alert: { border: '#fca5a5', bg: '#fee2e2', accent: '#dc2626' },
};

export default function AdultAlertas({ navigate }) {
  return (
    <div className="screen">
      <StatusBar />
      <div style={{ padding: '8px 20px 14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontSize: 20, fontWeight: 800, color: 'var(--ink)' }}>Alertas</div>
          <div style={{ fontSize: 12, color: 'var(--muted)' }}>{alertas.length} notificações</div>
        </div>
        <button style={{
          background: 'transparent', border: 'none', fontSize: 13, fontWeight: 600,
          color: 'var(--muted)', cursor: 'pointer', padding: '8px',
        }}>
          Limpar tudo
        </button>
      </div>

      <div className="scroll-area">
        <div className="section-title">Hoje</div>
        <div style={{ padding: '0 16px' }}>
          {alertas.map(a => {
            const st = tipoStyle[a.tipo];
            return (
              <div key={a.id} style={{
                background: st.bg,
                border: `1.5px solid ${st.border}`,
                borderRadius: 20,
                padding: '16px',
                marginBottom: 12,
              }}>
                <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                  <span style={{ fontSize: 28, flexShrink: 0 }}>{a.icon}</span>
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

      <BottomNavAdult active="alertas" navigate={navigate} />
    </div>
  );
}

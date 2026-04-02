import logoCrimson from '../../assets/logo-crimson.png';

export default function PersonaSelect({ onSelect }) {
  const personas = [
    {
      id: 'senior',
      icon: '👵',
      title: 'Sou um sénior',
      subtitle: 'Uso apenas a minha voz.',
      description: 'Falo com a Cora para registar a minha tensão e glicose, receber lembretes de medicação e ouvir dicas de saúde personalizadas.',
      color: '#A63F52',
      bg: '#FBF0F2',
    },
    {
      id: 'adult',
      icon: '🧑',
      title: 'Gestor de saúde',
      subtitle: 'Controlo e acompanhamento.',
      description: 'Gero os meus dados, marco consultas e acompanho quem mais gosto com alertas e notificações em tempo real.',
      color: '#590212',
      bg: '#FBF0F2',
    },
  ];

  return (
    <div style={{
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      background: 'var(--cream-lt)',
      padding: 0,
    }}>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(160deg, #590212 0%, #A63F52 100%)',
        padding: '52px 28px 36px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 14,
      }}>
        <img src={logoCrimson} alt="CoreHealth" style={{
          width: 60,
          height: 60,
          borderRadius: 16,
          background: '#fff',
          padding: 5,
          boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
        }} />
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 24, fontWeight: 800, color: '#fff', lineHeight: 1.2 }}>Bem-vindo!</div>
          <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.75)', marginTop: 6 }}>
            Como vamos usar a CoreHealth?
          </div>
        </div>
      </div>

      {/* Cards */}
      <div style={{ padding: '28px 20px', display: 'flex', flexDirection: 'column', gap: 14, flex: 1 }}>
        {personas.map(p => (
          <button
            key={p.id}
            onClick={() => onSelect(p.id)}
            style={{
              width: '100%',
              background: '#fff',
              border: '1.5px solid var(--border)',
              borderRadius: 20,
              padding: '20px 20px',
              cursor: 'pointer',
              textAlign: 'left',
              display: 'flex',
              gap: 16,
              alignItems: 'flex-start',
              boxShadow: 'var(--shadow-sm)',
              transition: 'all 0.25s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = p.color;
              e.currentTarget.style.boxShadow = `0 4px 20px rgba(89,2,18,0.15)`;
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'var(--border)';
              e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <div style={{
              width: 56,
              height: 56,
              borderRadius: 16,
              background: p.bg,
              border: `1.5px solid ${p.color}22`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 28,
              flexShrink: 0,
            }}>
              {p.icon}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--ink)', marginBottom: 3 }}>
                {p.title}
              </div>
              <div style={{ fontSize: 13, fontWeight: 500, color: p.color, marginBottom: 6 }}>
                {p.subtitle}
              </div>
              <div style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.5 }}>
                {p.description}
              </div>
            </div>
            <span style={{ fontSize: 18, color: 'var(--muted)', alignSelf: 'center' }}>›</span>
          </button>
        ))}

        {/* Professional option — Em breve */}
        <button
          style={{
            width: '100%',
            background: 'transparent',
            border: '1.5px dashed var(--border)',
            borderRadius: 20,
            padding: '18px 20px',
            cursor: 'not-allowed',
            textAlign: 'left',
            display: 'flex',
            gap: 16,
            alignItems: 'flex-start',
          }}
          disabled
        >
          <div style={{
            width: 56,
            height: 56,
            borderRadius: 16,
            background: 'var(--cream)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 26,
            flexShrink: 0,
            opacity: 0.5,
          }}>
            🩺
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 3 }}>
              <span style={{ fontSize: 15, fontWeight: 700, color: 'var(--muted)' }}>Acesso Clínico</span>
              <span style={{
                fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 20,
                background: 'var(--cream)', color: 'var(--wine-md)', letterSpacing: '0.3px',
              }}>EM BREVE</span>
            </div>
            <div style={{ fontSize: 12, fontWeight: 500, color: 'var(--muted)', marginBottom: 4 }}>
              Sou profissional de saúde.
            </div>
            <div style={{ fontSize: 11, color: 'var(--muted)', lineHeight: 1.5, opacity: 0.8 }}>
              Analiso o histórico e os sinais vitais partilhados pelos meus pacientes para um acompanhamento preventivo.
            </div>
          </div>
        </button>
      </div>

      {/* Footer */}
      <div style={{ padding: '0 20px 32px', textAlign: 'center' }}>
        <div style={{ fontSize: 11, color: 'var(--muted)' }}>
          Saúde para todos.
        </div>
      </div>
    </div>
  );
}

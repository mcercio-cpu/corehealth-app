import logoCrimson from '../../assets/logo-crimson.png';

export default function PersonaSelect({ onSelect }) {
  const personas = [
    {
      id: 'senior',
      icon: '👵',
      title: 'Sou um sénior',
      subtitle: 'Gerir a minha própria saúde',
      description: 'Registo de tensão, glicose e medicação com ajuda de voz.',
      name: 'Dona Rosa',
      color: '#A63F52',
      bg: '#FBF0F2',
    },
    {
      id: 'adult',
      icon: '👨‍💻',
      title: 'Cuido de um familiar',
      subtitle: 'Monitorizar a saúde dos meus pais',
      description: 'Dashboard pessoal e acompanhamento familiar à distância.',
      name: 'Ricardo',
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
          width: 56,
          height: 56,
          borderRadius: 14,
          filter: 'brightness(0) invert(1)',
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

        {/* Professional option */}
        <button
          style={{
            width: '100%',
            background: 'transparent',
            border: '1.5px dashed var(--border)',
            borderRadius: 20,
            padding: '16px 20px',
            cursor: 'not-allowed',
            textAlign: 'left',
            display: 'flex',
            gap: 16,
            alignItems: 'center',
            opacity: 0.6,
          }}
          disabled
        >
          <div style={{
            width: 44,
            height: 44,
            borderRadius: 12,
            background: 'var(--cream)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 22,
          }}>
            🩺
          </div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--ink)' }}>Sou profissional de saúde</div>
            <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 2 }}>Em breve — Dra. Inês</div>
          </div>
        </button>
      </div>

      {/* Footer */}
      <div style={{ padding: '0 20px 32px', textAlign: 'center' }}>
        <div style={{ fontSize: 11, color: 'var(--muted)' }}>
          "A Saúde Não Deve Ser um Privilégio."
        </div>
      </div>
    </div>
  );
}

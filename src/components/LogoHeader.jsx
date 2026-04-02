import logoCrimson from '../assets/logo-crimson.png';

export default function LogoHeader({ title, subtitle, action, size = 'sm' }) {
  const logoSize = size === 'sm' ? 32 : 40;

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '8px 20px 16px',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <img src={logoCrimson} alt="CoreHealth" style={{ width: logoSize, height: logoSize, borderRadius: 8 }} />
        <div>
          <div style={{ fontSize: size === 'sm' ? 16 : 20, fontWeight: 700, color: 'var(--wine)', lineHeight: 1.2 }}>
            {title || 'CoreHealth'}
          </div>
          {subtitle && (
            <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 1 }}>{subtitle}</div>
          )}
        </div>
      </div>
      {action && (
        <button
          onClick={action.onClick}
          style={{
            background: 'transparent',
            border: 'none',
            fontSize: 22,
            cursor: 'pointer',
            padding: 4,
          }}
        >
          {action.icon}
        </button>
      )}
    </div>
  );
}

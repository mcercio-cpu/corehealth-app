export default function BottomNavAdult({ active, navigate }) {
  const items = [
    { key: 'home',      icon: '🏠', label: 'Início' },
    { key: 'familia',   icon: '👨‍👩‍👧', label: 'Família' },
    { key: 'consultas', icon: '🏥', label: 'Consultas' },
    { key: 'alertas',   icon: '🔔', label: 'Alertas' },
    { key: 'perfil',    icon: '👤', label: 'Perfil' },
  ];

  return (
    <nav className="bottom-nav">
      {items.map(item => (
        <button
          key={item.key}
          className={`nav-item${active === item.key ? ' active' : ''}`}
          onClick={() => navigate(item.key)}
        >
          <span className="nav-icon">{item.icon}</span>
          <span className="nav-label" style={active === item.key ? { color: 'var(--wine-md)' } : {}}>
            {item.label}
          </span>
        </button>
      ))}
    </nav>
  );
}

export default function BottomNavSenior({ active, navigate }) {
  const items = [
    { key: 'home',         icon: '🏠', label: 'Início' },
    { key: 'dados',        icon: '📊', label: 'Dados' },
    { key: 'medicamentos', icon: '💊', label: 'Medicação' },
    { key: 'definicoes',   icon: '⚙️', label: 'Definições' },
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

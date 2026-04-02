import { translations } from '../data/translations';

export default function BottomNavAdult({ active, navigate, lang = 'pt' }) {
  const T = translations[lang];
  const items = [
    { key: 'home',      icon: '🏠', label: T.navHome },
    { key: 'familia',   icon: '👨‍👩‍👧', label: T.navFamily },
    { key: 'consultas', icon: '🏥', label: T.navConsultations },
    { key: 'alertas',   icon: '🔔', label: T.navAlerts },
    { key: 'perfil',    icon: '👤', label: T.navProfile },
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

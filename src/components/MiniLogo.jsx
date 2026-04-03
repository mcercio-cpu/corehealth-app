import logoCrimson from '../assets/logo-crimson.png';

export default function MiniLogo({ navigate }) {
  return (
    <img
      src={logoCrimson}
      alt="CoreHealth"
      onClick={() => navigate('persona')}
      style={{
        width: 30, height: 30, borderRadius: 8,
        cursor: 'pointer', flexShrink: 0,
        boxShadow: '0 1px 4px rgba(0,0,0,0.1)',
      }}
      title="Mudar de perfil"
    />
  );
}

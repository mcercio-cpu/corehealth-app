export default function StatusBar() {
  const now = new Date();
  const time = now.toLocaleTimeString('pt-PT', { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="status-bar">
      <span className="status-time">{time}</span>
      <div className="status-icons">
        <span>📶</span>
        <span>🔋</span>
      </div>
    </div>
  );
}

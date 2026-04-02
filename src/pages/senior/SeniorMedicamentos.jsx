import { useState } from 'react';
import StatusBar from '../../components/StatusBar';
import BottomNavSenior from '../../components/BottomNavSenior';
import { rosaMedications } from '../../data/mockMedications';

export default function SeniorMedicamentos({ navigate }) {
  const [taken, setTaken] = useState(
    rosaMedications.reduce((acc, m) => ({ ...acc, [m.id]: m.todayTaken }), {})
  );

  const toggleTaken = (id) => {
    setTaken(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const allTaken = Object.values(taken).every(Boolean);

  return (
    <div className="screen">
      <StatusBar />

      <div style={{ padding: '8px 20px 16px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <button onClick={() => navigate('home')} style={{ background: 'transparent', border: 'none', fontSize: 22, cursor: 'pointer', color: 'var(--wine-md)' }}>←</button>
        <div>
          <div style={{ fontSize: 20, fontWeight: 800, color: 'var(--ink)' }}>Medicamentos</div>
          <div style={{ fontSize: 12, color: 'var(--muted)' }}>Hoje, 2 de Abril de 2026</div>
        </div>
      </div>

      <div className="scroll-area">
        {/* Daily summary banner */}
        <div style={{
          margin: '0 16px 18px',
          background: allTaken ? 'linear-gradient(135deg, #1a7a5a, #28a878)' : 'linear-gradient(135deg, #590212, #A63F52)',
          borderRadius: 18,
          padding: '16px 18px',
          color: '#fff',
          display: 'flex',
          alignItems: 'center',
          gap: 14,
        }}>
          <span style={{ fontSize: 32 }}>{allTaken ? '✅' : '💊'}</span>
          <div>
            <div style={{ fontSize: 15, fontWeight: 700 }}>
              {allTaken ? 'Parabéns, Rosa!' : 'Medicação de hoje'}
            </div>
            <div style={{ fontSize: 13, opacity: 0.85, marginTop: 3 }}>
              {allTaken
                ? 'Tomou toda a medicação. Continue assim!'
                : `${Object.values(taken).filter(Boolean).length} de ${rosaMedications.length} medicamentos tomados`}
            </div>
          </div>
        </div>

        {/* Streak */}
        <div style={{ margin: '0 16px 18px', background: '#fff', borderRadius: 18, padding: '14px 18px', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 14 }}>
          <span style={{ fontSize: 28 }}>🔥</span>
          <div>
            <div style={{ fontSize: 16, fontWeight: 800, color: 'var(--wine)' }}>34 dias seguidos</div>
            <div style={{ fontSize: 12, color: 'var(--muted)' }}>Aderência à medicação — continue assim!</div>
          </div>
        </div>

        <div className="section-title">Hoje</div>

        {/* Medications list */}
        <div style={{ padding: '0 16px' }}>
          {rosaMedications.map(med => (
            <div key={med.id} style={{
              background: '#fff',
              borderRadius: 20,
              padding: '18px',
              border: `1.5px solid ${taken[med.id] ? '#a7ddc4' : 'var(--border)'}`,
              marginBottom: 12,
              transition: 'border-color 0.3s',
            }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
                {/* Color dot */}
                <div style={{
                  width: 48, height: 48, borderRadius: 14,
                  background: `${med.color}18`,
                  border: `2px solid ${med.color}44`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 24, flexShrink: 0,
                }}>
                  💊
                </div>

                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--ink)' }}>{med.name} {med.dosage}</div>
                  <div style={{ fontSize: 13, color: 'var(--muted)', marginTop: 3 }}>
                    {med.timeOfDay} · {med.timeLabel}
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 2, fontStyle: 'italic' }}>
                    {med.instructions}
                  </div>
                </div>
              </div>

              {/* Today status */}
              <div style={{ marginTop: 14, display: 'flex', gap: 10 }}>
                <div style={{ flex: 1, background: 'var(--cream-lt)', borderRadius: 12, padding: '10px 12px' }}>
                  <div style={{ fontSize: 11, color: 'var(--muted)', marginBottom: 4 }}>⏰ Hoje às {med.timeLabel}</div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: taken[med.id] ? '#1a7a5a' : '#b06000' }}>
                    {taken[med.id] ? '✅ Tomado' : '⏳ Pendente'}
                  </div>
                </div>
                <div style={{ flex: 1, background: 'var(--cream-lt)', borderRadius: 12, padding: '10px 12px' }}>
                  <div style={{ fontSize: 11, color: 'var(--muted)', marginBottom: 4 }}>⏰ Amanhã às {med.timeLabel}</div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--muted)' }}>
                    ⏳ Pendente
                  </div>
                </div>
              </div>

              {/* Toggle taken button */}
              <button
                onClick={() => toggleTaken(med.id)}
                style={{
                  marginTop: 12,
                  width: '100%',
                  background: taken[med.id] ? 'var(--cream)' : 'var(--wine-md)',
                  color: taken[med.id] ? 'var(--wine-md)' : '#fff',
                  border: `1.5px solid ${taken[med.id] ? 'var(--border)' : 'transparent'}`,
                  borderRadius: 14,
                  padding: '12px',
                  fontSize: 14,
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'all 0.25s',
                }}
              >
                {taken[med.id] ? '↩ Desfazer registo' : '✓ Marcar como tomado'}
              </button>
            </div>
          ))}
        </div>

        {/* Add medication */}
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
            + Adicionar medicamento
          </button>
        </div>
      </div>

      <BottomNavSenior active="medicamentos" navigate={navigate} />
    </div>
  );
}

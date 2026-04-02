import StatusBar from '../../components/StatusBar';
import BottomNavAdult from '../../components/BottomNavAdult';
import { rosaBiometrics } from '../../data/mockBiometrics';

const rosaLatest = rosaBiometrics[0];

export default function AdultFamilia({ navigate }) {
  const familyMembers = [
    {
      id: 'rosa',
      name: 'Rosa Santos',
      relation: 'Mãe',
      age: 68,
      avatar: '👵',
      lastUpdate: 'há 2 horas',
      status: 'warning',
      statusText: '⚠ Glicose ligeiramente alta',
      data: {
        tensao: `${rosaLatest.bloodPressure.systolic}/${rosaLatest.bloodPressure.diastolic} mmHg`,
        tensaoStatus: 'ok',
        glicose: `${rosaLatest.bloodGlucose} mg/dL`,
        glicoseStatus: 'warning',
        medicacao: rosaLatest.medicationTaken ? 'Tomada hoje' : 'Não registada',
        medicacaoStatus: rosaLatest.medicationTaken ? 'ok' : 'warning',
      },
      suggestions: [
        { text: 'Sugerir hidratação e movimento leve', icon: '💧' },
        { text: 'Verificar se está a descansar bem', icon: '😴' },
      ],
    },
  ];

  const statusColor = {
    ok: { bg: '#e8f8f0', text: '#1a7a5a', border: '#a7ddc4' },
    warning: { bg: '#fff3e0', text: '#b06000', border: '#f5c87a' },
    alert: { bg: '#fee2e2', text: '#dc2626', border: '#fca5a5' },
    muted: { bg: 'var(--cream)', text: 'var(--muted)', border: 'var(--border)' },
  };

  return (
    <div className="screen">
      <StatusBar />
      <div style={{ padding: '8px 20px 14px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <div>
          <div style={{ fontSize: 20, fontWeight: 800, color: 'var(--ink)' }}>Família</div>
          <div style={{ fontSize: 12, color: 'var(--muted)' }}>Monitorização remota</div>
        </div>
        <button style={{
          marginLeft: 'auto', background: 'var(--cream)', border: 'none',
          borderRadius: 12, padding: '8px 14px', fontSize: 13, fontWeight: 600, color: 'var(--wine-md)', cursor: 'pointer',
        }}>
          + Adicionar
        </button>
      </div>

      <div className="scroll-area">
        {familyMembers.map(member => {
          const sc = statusColor[member.status];
          return (
            <div key={member.id} style={{ margin: '0 16px 16px' }}>
              {/* Member header card */}
              <div style={{
                background: '#fff',
                borderRadius: 20,
                border: `1.5px solid ${sc.border}`,
                overflow: 'hidden',
              }}>
                {/* Top row */}
                <div style={{
                  background: `${sc.bg}`,
                  padding: '14px 16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 14,
                }}>
                  <div style={{ fontSize: 36 }}>{member.avatar}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ fontSize: 16, fontWeight: 700, color: 'var(--ink)' }}>{member.name}</span>
                      <span style={{ fontSize: 11, color: 'var(--muted)', fontWeight: 500 }}>({member.relation})</span>
                    </div>
                    <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 2 }}>
                      {member.age} anos · Última actualização {member.lastUpdate}
                    </div>
                    <div style={{ fontSize: 12, fontWeight: 700, color: sc.text, marginTop: 4 }}>
                      {member.statusText}
                    </div>
                  </div>
                </div>

                {/* Data rows */}
                <div style={{ padding: '14px 16px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, marginBottom: 14 }}>
                    {[
                      { label: '❤️ Tensão', value: member.data.tensao, status: member.data.tensaoStatus },
                      { label: '🩸 Glicose', value: member.data.glicose, status: member.data.glicoseStatus },
                      { label: '💊 Medicação', value: member.data.medicacao, status: member.data.medicacaoStatus },
                    ].map(d => {
                      const ds = statusColor[d.status] || statusColor.muted;
                      return (
                        <div key={d.label} style={{
                          background: ds.bg, borderRadius: 12, padding: '10px 10px', textAlign: 'center',
                          border: `1px solid ${ds.border}`,
                        }}>
                          <div style={{ fontSize: 10, color: 'var(--muted)', fontWeight: 600, marginBottom: 4 }}>{d.label}</div>
                          <div style={{ fontSize: 12, fontWeight: 700, color: ds.text, lineHeight: 1.3 }}>{d.value}</div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Suggestions */}
                  {member.suggestions.map((s, i) => (
                    <div key={i} style={{
                      background: 'var(--cream-lt)', borderRadius: 12, padding: '10px 12px',
                      marginBottom: 6, display: 'flex', alignItems: 'center', gap: 10,
                    }}>
                      <span style={{ fontSize: 18 }}>{s.icon}</span>
                      <span style={{ fontSize: 12, color: 'var(--ink)', flex: 1 }}>{s.text}</span>
                    </div>
                  ))}

                  {/* Action buttons */}
                  <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
                    <button style={{
                      flex: 1, background: 'var(--wine-md)', color: '#fff', border: 'none',
                      borderRadius: 14, padding: '12px', fontSize: 13, fontWeight: 700, cursor: 'pointer',
                    }}>
                      📞 Contactar
                    </button>
                    <button style={{
                      flex: 1, background: 'var(--cream)', color: 'var(--wine-md)', border: '1px solid var(--border)',
                      borderRadius: 14, padding: '12px', fontSize: 13, fontWeight: 700, cursor: 'pointer',
                    }}>
                      📊 Ver Histórico
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {/* Info note */}
        <div style={{ margin: '0 16px 16px', padding: '14px 16px', background: 'var(--cream)', borderRadius: 16, border: '1px solid var(--border)' }}>
          <div style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.5, textAlign: 'center' }}>
            🔒 Apenas visualização — não pode editar dados dos seus familiares. Os dados são actualizados pelos próprios.
          </div>
        </div>
      </div>

      <BottomNavAdult active="familia" navigate={navigate} />
    </div>
  );
}

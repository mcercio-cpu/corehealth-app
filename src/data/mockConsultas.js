export const ricardoConsultas = [
  {
    id: 'con_001',
    tipo: 'Médico de Família',
    medico: 'Dr. João Machado',
    data: '2026-04-04',
    hora: '14:30',
    dia: '4',
    mes: 'ABR',
    local: 'Centro de Saúde de Arroios',
    status: 'confirmada',
    proximaDias: 2,
    videochamada: false,
  },
  {
    id: 'con_002',
    tipo: 'Cardiologista',
    medico: 'Dra. Madalena Sousa',
    data: '2026-04-11',
    hora: '10:00',
    dia: '11',
    mes: 'ABR',
    local: 'Clínica CUF Descobertas',
    status: 'confirmada',
    proximaDias: 9,
    videochamada: false,
  },
];

export const ricardoExames = [
  {
    id: 'ex_001',
    tipo: 'Análise de Sangue',
    data: '2026-03-20',
    local: 'Unilabs',
    resultados: [
      { label: 'Glicose', value: '92 mg/dL', status: 'ok' },
      { label: 'Colesterol Total', value: '186 mg/dL', status: 'ok' },
      { label: 'Triglicéridos', value: '98 mg/dL', status: 'ok' },
      { label: 'HDL', value: '52 mg/dL', status: 'ok' },
      { label: 'LDL', value: '112 mg/dL', status: 'ok' },
    ],
    status: 'ok',
  },
  {
    id: 'ex_002',
    tipo: 'ECG',
    data: '2026-02-15',
    local: 'Hospital Santa Maria',
    resultados: [
      { label: 'Resultado', value: 'Normal', status: 'ok' },
    ],
    status: 'ok',
  },
];

export const rosaConsultaUrgente = {
  medicos: [
    {
      id: 'doc_001',
      nome: 'Dr. João Silva',
      especialidade: 'Cardiologista',
      local: 'Clínica Privada — 30km',
      disponibilidade: 'Hoje às 14h (1 vaga)',
      seguro: true,
      comparticipacao: '60%',
      tipo: 'privado',
    },
    {
      id: 'doc_002',
      nome: 'Dra. Maria Costa',
      especialidade: 'Cardiologista',
      local: 'Clínica Privada — 5km',
      disponibilidade: 'Hoje às 15h (2 vagas)',
      seguro: false,
      preco: '€60',
      tipo: 'privado',
    },
    {
      id: 'doc_003',
      nome: 'Dr. Pedro Santos',
      especialidade: 'Cardiologista',
      local: 'Hospital Público — Mértola',
      disponibilidade: '13 de Abril, 10h30',
      seguro: true,
      preco: 'Gratuito (SNS)',
      tipo: 'sns',
      jaAgendado: true,
    },
  ],
};

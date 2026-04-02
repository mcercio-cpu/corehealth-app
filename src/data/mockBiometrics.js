// Biometric records for Dona Rosa
export const rosaBiometrics = [
  {
    id: 'r001',
    userId: 'user_rosa_001',
    date: '2026-04-02',
    time: '09:15',
    label: 'Qua, 2 Abr',
    bloodPressure: { systolic: 140, diastolic: 90 },
    bloodGlucose: 156,
    weight: 72,
    medicationTaken: true,
    notes: 'Após pequeno-almoço',
    status: 'warning', // ok | warning | alert
  },
  {
    id: 'r002',
    userId: 'user_rosa_001',
    date: '2026-04-01',
    time: '09:30',
    label: 'Ter, 1 Abr',
    bloodPressure: { systolic: 135, diastolic: 85 },
    bloodGlucose: 142,
    weight: 72,
    medicationTaken: true,
    notes: '',
    status: 'ok',
  },
  {
    id: 'r003',
    userId: 'user_rosa_001',
    date: '2026-03-31',
    time: '10:00',
    label: 'Seg, 31 Mar',
    bloodPressure: { systolic: 148, diastolic: 93 },
    bloodGlucose: 178,
    weight: 72.5,
    medicationTaken: false,
    notes: 'Sentiu-se cansada',
    status: 'alert',
  },
  {
    id: 'r004',
    userId: 'user_rosa_001',
    date: '2026-03-29',
    time: '09:00',
    label: 'Sáb, 29 Mar',
    bloodPressure: { systolic: 132, diastolic: 82 },
    bloodGlucose: 138,
    weight: 72,
    medicationTaken: true,
    notes: '',
    status: 'ok',
  },
  {
    id: 'r005',
    userId: 'user_rosa_001',
    date: '2026-03-28',
    time: '09:20',
    label: 'Sex, 28 Mar',
    bloodPressure: { systolic: 138, diastolic: 88 },
    bloodGlucose: 145,
    weight: 72,
    medicationTaken: true,
    notes: '',
    status: 'ok',
  },
  {
    id: 'r006',
    userId: 'user_rosa_001',
    date: '2026-03-27',
    time: '09:45',
    label: 'Qui, 27 Mar',
    bloodPressure: { systolic: 130, diastolic: 80 },
    bloodGlucose: 132,
    weight: 71.5,
    medicationTaken: true,
    notes: 'Bom dia',
    status: 'ok',
  },
  {
    id: 'r007',
    userId: 'user_rosa_001',
    date: '2026-03-26',
    time: '10:10',
    label: 'Qua, 26 Mar',
    bloodPressure: { systolic: 142, diastolic: 91 },
    bloodGlucose: 160,
    weight: 72,
    medicationTaken: true,
    notes: '',
    status: 'warning',
  },
];

// Biometric records for Ricardo
export const ricardoBiometrics = [
  {
    id: 'rc001',
    userId: 'user_ricardo_001',
    date: '2026-04-02',
    time: '07:30',
    bloodPressure: { systolic: 125, diastolic: 80 },
    bloodGlucose: 95,
    weight: 78,
    steps: 8347,
    sleep: '7h 32m',
    heartRate: 68,
    status: 'ok',
  },
];

// Chart data (last 7 days) for Rosa
export const rosaChartData = {
  labels: ['27 Mar', '28 Mar', '29 Mar', '31 Mar', '1 Abr', '2 Abr'],
  bloodPressureSystolic: [130, 138, 132, 148, 135, 140],
  bloodPressureDiastolic: [80, 88, 82, 93, 85, 90],
  bloodGlucose: [132, 145, 138, 178, 142, 156],
  normalGlucoseMin: 70,
  normalGlucoseMax: 140,
  normalSystolicMin: 90,
  normalSystolicMax: 140,
};

export const getBPStatus = (systolic, diastolic) => {
  if (systolic > 140 || diastolic > 90) return 'warning';
  if (systolic > 160 || diastolic > 100) return 'alert';
  return 'ok';
};

export const getGlucoseStatus = (value) => {
  if (value > 180) return 'alert';
  if (value > 140) return 'warning';
  return 'ok';
};

export const statusLabel = {
  ok: { text: 'Normal', icon: '✓', color: '#28a878', bg: '#e8f8f0' },
  warning: { text: 'Atenção', icon: '⚠', color: '#e07040', bg: '#fff3e0' },
  alert: { text: 'Alerta', icon: '!', color: '#dc2626', bg: '#fee2e2' },
};

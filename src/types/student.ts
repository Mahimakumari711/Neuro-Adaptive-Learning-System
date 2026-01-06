export interface StudentBiometrics {
  id: number;
  name: string;
  heartRate: number;
  hrv: number; // Heart Rate Variability
  eegAlpha: number; // Alpha wave activity (8-13 Hz)
  engagement: number; // 0-100
  attention: number; // 0-100
  stress: number; // 0-100
  status: 'active' | 'idle' | 'alert';
  lastUpdate: Date;
}

export interface AggregateMetrics {
  avgEngagement: number;
  avgAttention: number;
  avgStress: number;
  activeStudents: number;
  alertCount: number;
}

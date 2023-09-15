export function configs(): string {
  return 'configs';
}

export const relays: string[] = ['http://localhost:8765/gun'];

export enum AnomalyTypes {
  SIMPLE = 'Simple Anomaly',
  COMPLEX = 'Complex Anomaly',
}

export const Anomaly = 'anomaly';
export const Anomalies = 'anomalies-test-1';
export const Alert = 'alert-test-1';
export const DoctorNode = 'doctor';

export interface AnomalyUI {
  id?: string;
  agentId: string;
  anomalyType: AnomalyTypes;
}

import { Injectable } from '@angular/core';
import { AgentService } from './agent.service';
import { Alert, Anomalies, Anomaly, AnomalyTypes, AnomalyUI } from '@dapp-p2p-gun/config';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  private _clientName = '';

  hasAlert = false;

  public get clientName(): string {
    return this._clientName;
  }

  public set clientName(val: string) {
    this._clientName = val;
    this._agent.agentId = val;
    this.checkAlertOnce();
  }

  constructor(private _agent: AgentService) {
    this.watchAlerts();
    this.watchAnomalies();
  }

  checkAlertOnce() {
    this._agent.gunClient.get(Alert).once((data) => {
      this.alertCheck(data);
    });
  }

  watchAlerts() {
    this._agent.gunClient.get(Alert).on((data) => {
      this.alertCheck(data);
    });
  }

  watchAnomalies() {
    this._agent.gunClient.get(Anomalies).on((data) => {
      console.log('Anomalies updated');
    });
  }

  alertCheck(data: any) {
    if (data?.alerts) {
      const alerts: string[] = JSON.parse(data.alerts);
      if (alerts.includes(this.clientName)) {
        this.hasAlert = true;
      } else {
        this.hasAlert = false;
      }
    }
  }

  anomalyDetected(anomaliesData: AnomalyUI[] = [], anomalyType: AnomalyTypes = AnomalyTypes.SIMPLE) {
    const anomaliesNode = this._agent.gunClient.get(Anomalies);

    anomaliesNode.once((data) => {
      if (data?.clients) {
        anomaliesData = JSON.parse(data.clients) ?? [];
      }
      anomaliesData.push({ agentId: this._agent.agentId, anomalyType });

      const anomaliesNodeKeyed: Record<string, AnomalyUI> = anomaliesData.reduce(
        (acc: Record<string, AnomalyUI>, curr) => {
          acc[curr.agentId] = curr;
          return acc;
        },
        {}
      );

      anomaliesData = Object.values(anomaliesNodeKeyed);

      anomaliesNode.put(null, () => {
        anomaliesNode.put({ clients: JSON.stringify(anomaliesData) });
      });
    });
  }
}

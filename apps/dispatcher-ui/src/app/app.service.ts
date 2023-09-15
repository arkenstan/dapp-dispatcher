import { Injectable } from '@angular/core';
import { AgentService } from './agent.service';
import { Alert, Anomalies } from '@dapp-p2p-gun/config';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  private _clientName = 'Dispatcher';

  constructor(private _agent: AgentService) {}

  clearAllAlerts() {
    const alertNode = this._agent.gunClient.get(Alert);
    alertNode.put({ alerts: '[]' });
  }

  clearAllAnomalies() {
    this._agent.gunClient.get(Anomalies).put({ clients: '[]' });
  }

  alertClient(agentId: string) {
    const alertNode = this._agent.gunClient.get(Alert);

    alertNode.once((data) => {
      let alerts: string[] = [];

      if (data?.alerts) {
        alerts = JSON.parse(data.alerts);
      }
      if (!alerts.includes(agentId)) {
        alerts.push(agentId);
      }

      if (data) {
        console.log('HERE', data);
        alertNode.put({ alerts: JSON.stringify(alerts) });
      }
    });
  }

  removeAlertForClient(clientId: string) {
    const alertNode = this._agent.gunClient.get(Alert);

    alertNode.once((data) => {
      if (data?.alerts) {
        let alerts = JSON.parse(data.alerts);
        alerts = alerts.filter((el: any) => el !== clientId);
        alertNode.put({ alerts: JSON.stringify(alerts) });
      }
    });
  }

  anomalyCompleted(clientId: string) {
    const anomaliesNode = this._agent.gunClient.get(Anomalies);
    anomaliesNode.once((data) => {
      if (data?.clients) {
        let clients = JSON.parse(data.clients);

        clients = clients.filter((el: any) => el.agentId !== clientId);

        anomaliesNode.put(null, () => {
          anomaliesNode.put({ clients: JSON.stringify(clients) });
          this.removeAlertForClient(clientId);
        });
      }
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { AgentService } from './agent.service';
import { Anomalies, Anomaly, AnomalyUI } from '@dapp-p2p-gun/config';
import { AppService } from './app.service';

@Component({
  selector: 'dapp-p2p-gun-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'dispatcher-ui';

  private _anomalies: AnomalyUI[] = [];

  get anomalies() {
    return this._anomalies;
  }

  constructor(private _app: AppService, private _agent: AgentService) {}

  markAnomalyComplete(clientId: string) {
    this._app.anomalyCompleted(clientId);
  }

  sendAlert(clientId: string) {
    this._app.alertClient(clientId);
  }

  clearAlerts() {
    this._app.clearAllAlerts();
  }

  clearAnomalies() {
    this._app.clearAllAnomalies();
    this.clearAlerts();
  }

  listAnomalies() {
    console.log('LIST CALLED');

    this._agent.gunClient.get(Anomalies).on((data) => {
      if (data.clients) {
        this._anomalies = JSON.parse(data.clients);
      }
      console.log(data);
    });
  }
}

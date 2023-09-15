import { Component, OnInit } from '@angular/core';
import { AppService } from './app.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'dapp-p2p-gun-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'room-ui';
  clientNameInput = new FormControl(null);

  constructor(public _app: AppService) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.clientNameInput.valueChanges.subscribe((res) => {
      if (res) {
        this._app.clientName = res;
      }
    });
  }

  triggerAnomaly() {
    this._app.anomalyDetected();
  }
}

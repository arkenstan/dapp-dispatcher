import { Injectable } from '@angular/core';
import { relays } from '@dapp-p2p-gun/config';
import { v4 as uuidV4 } from 'uuid';
import GUN from 'gun';
import 'gun/lib/path';
import 'gun/lib/open';

@Injectable({
  providedIn: 'root',
})
export class AgentService {
  private relays: string[] = relays;

  agentId = 'Dispatcher';
  gunClient = GUN({ peers: this.relays });
}

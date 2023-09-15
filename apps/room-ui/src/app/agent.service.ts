import { Injectable } from '@angular/core';
import { relays } from '@dapp-p2p-gun/config';
import { v4 as uuidV4 } from 'uuid';
import GUN from 'gun';
import 'gun/lib/open';

@Injectable({
  providedIn: 'root',
})
export class AgentService {
  private relays: string[] = relays;

  agentId: string = uuidV4();
  gunClient = GUN(this.relays);
}

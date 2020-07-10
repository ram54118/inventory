import { InventoryService } from './../../core/services/inventory.service';
import { Protocol } from './../../models/protocol';
import { Client } from './../../models/client';
import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-client-protocol-filter',
  templateUrl: './client-protocol-filter.component.html',
  styleUrls: ['./client-protocol-filter.component.scss']
})
export class ClientProtocolFilterComponent implements OnInit, OnChanges {
  @Input() view: string;
  public clientsList$: Observable<Client[]>;
  public protocolList$: Observable<Protocol[]>;
  private selectedClients: Client[];
  private selectedProtocols: Protocol[];
  constructor(private inventoryService: InventoryService) { }
  ngOnInit() {
    this.selectedClients = [];
    this.selectedProtocols = [];
    this.clientsList$ = this.inventoryService.getclients();
  }

  ngOnChanges(changes: SimpleChanges) {
    for (const propName in changes) {
      if (changes.hasOwnProperty(propName)) {
        switch (propName) {
          case 'view': {
            if (!changes.view.firstChange && changes.view.currentValue === 'protocols') {
              this.getProtocols();
            }
          }
        }
      }
    }
  }

  public addOrRemoveClient(client: Client) {
    if (this.selectedClients && this.selectedClients.length) {
      const clientIndex = this.selectedClients.findIndex(selectedClient =>
        selectedClient.MASTER_CLIENT_ID === client.MASTER_CLIENT_ID);
      if (clientIndex > -1) {
        client.isSelected = false;
        this.selectedClients.splice(clientIndex, 1);
      } else {
        client.isSelected = true;
        this.selectedClients.push(client);
      }
    } else {
      client.isSelected = true;
      this.selectedClients.push(client);
    }
    console.log(this.selectedClients);
  }

  public clientsTrackBy(id: number, client: Client) {
    return client.MASTER_CLIENT_ID;
  }
  public protocolsTrackBy(id: number, protocol: Protocol) {
    return protocol.MASTER_PROTOCOL_ID;
  }

  public getProtocols() {
    const clientIds = this.selectedClients.map(client => client.MASTER_CLIENT_ID);
    this.protocolList$ = this.inventoryService.getProtocols(clientIds);
  }

  public addOrRemoveProtocol(protocol: Protocol) {
    if (this.selectedProtocols && this.selectedProtocols.length) {
      const protocolIndex = this.selectedProtocols.findIndex(selectedProtocol =>
        selectedProtocol.MASTER_PROTOCOL_ID === protocol.MASTER_PROTOCOL_ID);
      if (protocolIndex > -1) {
        protocol.isSelected = false;
        this.selectedProtocols.splice(protocolIndex, 1);
      } else {
        protocol.isSelected = true;
        this.selectedProtocols.push(protocol);
      }
    } else {
      protocol.isSelected = true;
      this.selectedProtocols.push(protocol);
    }
    console.log(this.selectedProtocols);
  }
}

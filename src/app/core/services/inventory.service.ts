import { Protocol } from './../../models/protocol';
import { catchError } from 'rxjs/operators';
import { ServerProxyService } from './server-proxy.service';
import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { Client } from './../../models/client';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  constructor(private serverProxyService: ServerProxyService) { }

  getProtocols(clientIds: number[]): Observable<Protocol[]> {
    return this.serverProxyService.get('protocols-17860.json').pipe(catchError((error) => {
      return of([]);
    }));
  }

  getclients(): Observable<Client[]> {
    return this.serverProxyService.get('clients.json').pipe(catchError((error) => {
      return of([]);
    }));
  }

}

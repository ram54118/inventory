import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, retry, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ServerProxyService {
  private baseUrl = './assets/json/';
  constructor(private http: HttpClient) { }

  get(url) {
    return this.http.get(this.baseUrl + url).pipe(map(response => response['result']));
  }
}

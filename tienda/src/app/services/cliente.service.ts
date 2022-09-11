import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { global } from './global';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  public url: any;

  constructor(
    private _http: HttpClient,
  ) {
    this.url = global.url;
  }

  clientLogin(data: any): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(this.url + 'loginCliente', data, {headers: headers});
  }

  fetchClientIdGuest(id: any, token: any): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application').set('Authorization', token);
    return this._http.get(this.url + 'fetchClientIdGuest/' + id, {headers: headers});
  }

  updateClientGuest(id: any, token: any, data: any): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', token);
    return this._http.put(this.url + '/updateClientGuest/' + id, data, {headers: headers});
  }

}

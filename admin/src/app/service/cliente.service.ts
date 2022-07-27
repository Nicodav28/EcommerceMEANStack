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

  fetchClients(tipo: any, filtro: any, token: any): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', token);
    return this._http.get(this.url + 'listarClientes/' + tipo + '/' + filtro, { headers: headers });
  }

  clientRegister(data: any, token: any){
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', token);
    return this._http.post(this.url + 'registerClientAdmin', data, { headers: headers });
  }

  fetchClientId(id: any, token: any){
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', token);
    return this._http.get(this.url + '/obtenerClienteAdmin/'+ id, { headers: headers });
  }

  updateClient(id: any, data: any, token: any){
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', token);
    return this._http.put(this.url + '/actualizarClienteAdmin/'+ id, data, { headers: headers });
  }

}

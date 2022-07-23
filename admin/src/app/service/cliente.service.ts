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
    private http: HttpClient,
  ) {
    this.url = global.url;
  }

  fetchClients(tipo: any, filtro: any, token: any): Observable<any> {
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    console.log(token);
    return this.http.get(this.url + 'listarClientes/'+tipo+'/'+filtro,{headers: headers});
  }
}

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { global } from './global';

@Injectable({
  providedIn: 'root'
})
export class CuponService {

  public url: any;

  constructor(
    private _http: HttpClient,
  ) {
    this.url = global.url;
  }

  cuponRegister(data: any, token: any): Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', token);
    return this._http.post(this.url + 'cuponRegister', data, { headers: headers });
  }

  fetchCuponFilter(filtro: any, token: any): Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', token);
    return this._http.get(this.url + 'fetchCuponFilter/' + filtro, { headers: headers });
  }
}

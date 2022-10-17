import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { global } from './global';
import { JwtHelperService } from "@auth0/angular-jwt";

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

  public checkAuth(): boolean {

    const token: any = localStorage.getItem('token');

    if (!token) {
      return false;
    }

    try {
      const helper = new JwtHelperService();
      var decodedToken = helper.decodeToken(token);

      if(helper.isTokenExpired(token)){
        localStorage.clear();
        return false;
      }
      // console.log(decodedToken);
      if (!decodedToken) {
        localStorage.clear();
        return false;
      }
    }catch(error){
      localStorage.clear();
      return false;
    }

    return true;
  }

  fetchCategories(): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.get(this.url + 'fetchCategories',{ headers: headers });
  }

  fetchProducts(filtro: any){
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.get(this.url + 'fetchProductsGuest/' + filtro,{ headers: headers });
  }

  addClientCart(data: any, token: any): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', token);
    return this._http.post(this.url + 'addClientCart/', data,{headers: headers});
  }

  fetchClientCart(id: any, token: any): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', token);
    return this._http.get(this.url + 'fetchClientCart/'+id,{headers: headers});
  }

  delClientCart(id: any, token: any): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', token);
    return this._http.delete(this.url + 'delClientCart/'+id,{headers: headers});
  }

  
}

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { global } from './global';
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  public url: any;

  constructor(
    private _http: HttpClient,
  ) {
    this.url = global.url;
  }

  loginAdmin(data: any): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(this.url + 'loginAdmin', data, { headers: headers });
  }

  getToken() {
    return localStorage.getItem('token');
  }

  public checkAuth(allowedRol: string[]): boolean {

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

    return allowedRol.includes(decodedToken['rol']);
  }

  fetchConfigData(token: any): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', token);
    return this._http.get(this.url + 'fetchConfigData',{ headers: headers });
  }

  updateConfig(data: any, id: any, token: any): Observable<any> {
    if(data.logo){
      let headers = new HttpHeaders({'Authorization': token});

      const fd = new FormData();
      fd.append('titulo',data.titulo);
      fd.append('serie',data.serie);
      fd.append('correlativo',data.correlativo);
      fd.append('categorias',JSON.stringify(data.categorias));
      fd.append('logo',data.logo);

      return this._http.put(this.url + 'updateConfig/'+ id, fd,{ headers: headers });
    }else{
      let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', token);
      return this._http.put(this.url + 'updateConfig/'+ id, data,{ headers: headers });
    }
  }

  fetchCategories(): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.get(this.url + 'fetchCategories',{ headers: headers });
  }

  
}

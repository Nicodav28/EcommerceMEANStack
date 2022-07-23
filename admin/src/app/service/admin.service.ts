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
    private http: HttpClient,
  ) {
    this.url = global.url;
  }

  loginAdmin(data: any): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(this.url + 'loginAdmin', data, { headers: headers });
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

      // console.log(decodedToken);
      if (!decodedToken) {
        localStorage.removeItem('token');
        localStorage.removeItem('_id');
        return false;
      }
    }catch(error){
      localStorage.removeItem('token');
      localStorage.removeItem('_id');
      return false;
    }

    return allowedRol.includes(decodedToken['rol']);
  }
}

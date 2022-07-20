import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { global } from './global';

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

  loginAdmin(data: any): Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(this.url+'loginAdmin',data,{ headers:headers });
  }

  getToken(){
    return localStorage.getItem('token');
  }
}

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { global } from './global';

@Injectable({
  providedIn: 'root'
})
export class GuestService {
  public url: any;

  constructor(
    private _http: HttpClient,
  ) { 
    this.url = global.url;
  }

  fetchProductsDetails(slug: any){
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.get(this.url + 'fetchProductsDetails/' + slug,{ headers: headers });
  }

  fetchProductsRecommended(categoria: any){
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.get(this.url + 'fetchProductsRecommended/' + categoria,{ headers: headers });
  }

}

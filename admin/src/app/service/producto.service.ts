import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { global } from './global';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  public url: any;

  constructor(
    private _http: HttpClient,
  ) {
    this.url = global.url;
  }

  productRegister(data: any, file:any, token: any){
    let headers = new HttpHeaders({'Authorization': token});
    const formData = new FormData();
    formData.append('titulo',data.titulo);
    formData.append('stock',data.stock);
    formData.append('precio',data.precio);
    formData.append('descripcion',data.descripcion);
    formData.append('contenido',data.contenido);
    formData.append('categoria',data.categoria);
    formData.append('portada', file);

    return this._http.post(this.url + 'registroProducto', formData, { headers: headers });
  }

  fetchProductsAdmin(filtro: any, token: any): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', token);
    return this._http.get(this.url + 'obtenerRegistros/' + filtro, { headers: headers });
  }

  fetchProductsId(id: any ,token: any): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', token);
    return this._http.get(this.url + 'fetchProductId/' + id, { headers: headers });  
  }

  updateProductData(data: any,id: any, token: any): Observable<any> {
    if(data.portada){
      let headers = new HttpHeaders({'Authorization': token});
      const formData = new FormData();
      formData.append('titulo',data.titulo);
      formData.append('stock',data.stock);
      formData.append('precio',data.precio);
      formData.append('descripcion',data.descripcion);
      formData.append('contenido',data.contenido);
      formData.append('categoria',data.categoria);
      formData.append('portada', data.portada);

      return this._http.put(this.url + 'updateProductData/'+ id, formData, { headers: headers });
    }else{
      let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', token);
      return this._http.put(this.url + 'updateProductData/'+ id, data, { headers: headers });
    }
  }

  deleteClient(id: any, token: any): Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', token);
    return this._http.delete(this.url + 'deleteProduct/'+ id, { headers: headers });
  }
}

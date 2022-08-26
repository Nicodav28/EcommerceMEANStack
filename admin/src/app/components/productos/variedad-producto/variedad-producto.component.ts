import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from 'src/app/service/admin.service';
import { global } from 'src/app/service/global';
import { ProductoService } from 'src/app/service/producto.service';

declare var iziToast: any;

@Component({
  selector: 'app-variedad-producto',
  templateUrl: './variedad-producto.component.html',
  styleUrls: ['./variedad-producto.component.css']
})
export class VariedadProductoComponent implements OnInit {
  public producto: any = {};
  public id: any;
  public token: any;
  public newVariety: any = '';
  public tittleVariety: any = '';
  public loadBtn: boolean = false;
  public url: any;



  constructor(
    private _route: ActivatedRoute,
    private _productoService: ProductoService,
    private _adminService: AdminService
  ) {
    this.token = this._adminService.getToken();
    this.url = global.url;
   }

  ngOnInit(): void {
    this._route.params.subscribe(
      params => {
        this.id = params['id'];
        this._productoService.fetchProductsId(this.id, this.token).subscribe(
          response => {
            if (response.data == undefined) {
              this.producto = undefined;
            } else {
              this.producto = response.data;
            }
            // console.log(this.producto);
          },
          error => {
            console.log(error);
          }
        );
      }
    );
    // console.log(JSON.stringify(this.producto));
  }

  addVariety(){
    if(this.newVariety){
      this.producto.variedades.push({titulo: this.newVariety});
      this.newVariety = '';
    }else{
      iziToast.error({
        title: 'Error:',
        position: 'topRight',
        message: 'El campo de la variedad debe ser completado.'
      });
    }
  }

  deleteVariety(idx){
    this.producto.variedades.splice(idx, 1);
  }

  updateVariety(){
    // console.log(JSON.stringify(this.producto));
    if(this.producto.tituloVariedad){
      if(this.producto.variedades.length >= 1){ 
        this.loadBtn = true;
        this._productoService.updateProductVariety(this.id, this.producto, this.token).subscribe(
          response => {
            iziToast.success({
              title: 'Registro Exitoso:',
              position: 'topRight',
              message: 'Las variedades han sido registradas de manera exitosa'
            });
            this.loadBtn = false;
          },
          error => {
            console.log(error);
            this.loadBtn = false;
          }
        );
      }else{
        iziToast.error({
          title: 'Error:',
          position: 'topRight',
          message: 'Debe ingresar minimo una variedad.'
        });
      }
    }else{
      iziToast.error({
        title: 'Error:',
        position: 'topRight',
        message: 'Debe diligenciar el campo del titulo de la variedad.'
      });
    }
  }
}

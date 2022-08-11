import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from 'src/app/service/admin.service';
import { ProductoService } from 'src/app/service/producto.service';
declare var iziToast: any;
declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-inventario-producto',
  templateUrl: './inventario-producto.component.html',
  styleUrls: ['./inventario-producto.component.css']
})
export class InventarioProductoComponent implements OnInit {

  public id: any;
  public token: any;
  public producto: any = {};
  public invetarios: Array<any> = [];
  public loadBtn = false;

  constructor(
    private _route: ActivatedRoute,
    private _productoService: ProductoService,
    private _adminService: AdminService
  ) { 
    this.token = this._adminService.getToken();
  }

  ngOnInit(): void {
    this._route.params.subscribe(
      params => {
        this.id = params['id'];
        // console.log(this.id);
        this._productoService.fetchProductsId(this.id, this.token).subscribe(
          response => {
            if (response.data == undefined) {
              this.producto = undefined;
            } else {
              this.producto = response.data;
              this._productoService.invetoryFetchAdmin(this.id, this.token).subscribe(
                response => {
                  this.invetarios = response.data;
                  console.log(this.invetarios);
                },
                error => {
                  console.log(error);
                }
              );
            }
          },
          error => {
            console.log(error);
          }
        );
      }
    )
  }

  updateStockData(id: any){
    this.loadBtn = true;
    this._productoService.updateStockData(id, this.token).subscribe(
      response => {
        iziToast.success({
          title: 'Producto Eliminado:',
          position: 'topRight',
          message: 'El producto fue eliminado exitosamente'//error.message
        });

        $('#delete-'+id).modal('hide');
        $('.modal-backdrop').removeClass('show');
        this.loadBtn = false;
        this._productoService.invetoryFetchAdmin(this.id, this.token).subscribe(
          response => {
            this.invetarios = response.data;
            console.log(this.invetarios);
          },
          error => {
            console.log(error);
          }
        );
      },
      error => {
        iziToast.error({
          title: 'Error:',
          position: 'topRight',
          message: 'Hubo un error eliminando el producto'//error.message
        });
        this.loadBtn = false;
      }
    );
  }

}

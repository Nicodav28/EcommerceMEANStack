import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/service/admin.service';
import { global } from 'src/app/service/global';
import { ProductoService } from 'src/app/service/producto.service';
declare var iziToast: any;

@Component({
  selector: 'app-index-producto',
  templateUrl: './index-producto.component.html',
  styleUrls: ['./index-producto.component.css']
})
export class IndexProductoComponent implements OnInit {

  public loadData: any = true;
  public filtro: any = '';
  public token: any;
  public productos: Array<any> = [];
  public url: string;
  public page = 1;
  public pageSize = 5;

  constructor(
    private _productoService: ProductoService,
    private _adminService: AdminService
  ) {
    this.token = _adminService.getToken();
    this.url = global.url;
  }

  ngOnInit(): void {
    this.initData();
  }

  initData(){
    this._productoService.fetchProductsAdmin(this.filtro, this.token).subscribe(
      response => {
        console.log(response);
        this.productos = response.data;
        this.loadData = false;
      },
      error => {
        console.log(error);
      }
    );
  }

  filterProduct() {
    if (this.filtro) {
      console.log(this.filtro);
      this._productoService.fetchProductsAdmin(this.filtro, this.token).subscribe(
        response => {
          console.log(response);
          this.productos = response.data;
          this.loadData = false;
        },
        error => {
          console.log(error);
        }
      );
    } else {
      iziToast.error({
        title: 'Error realizando registro:',
        position: 'topRight',
        message: 'Ingrese un filtro para buscar'
      });
    }
  }

  resetFilter(){
    this.filtro = '';
    this.initData();
  }

}

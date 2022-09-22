import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/service/admin.service';
import { global } from 'src/app/service/global';
import { ProductoService } from 'src/app/service/producto.service';
import { Workbook } from 'exceljs';
import * as fs from 'file-saver';

declare var iziToast: any;
declare var jQuery: any;
declare var $: any;

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
  public arrProductos: Array<any> = [];
  public url: string;
  public page = 1;
  public pageSize = 10;
  public loadBtn: boolean = false;

  constructor(
    private _productoService: ProductoService,
    private _adminService: AdminService,
    private _router: Router
  ) {
    this.token = this._adminService.getToken();
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
        this.productos.forEach(element => {
          this.arrProductos.push({
            titulo: element.titulo,
            stock: element.stock,
            precio: element.precio,
            categorio: element.categoria,
            nventas: element.nventas
          });
        })
        this.loadData = false;
        console.log(this.arrProductos);
      },
      error => {
        if(error.status == 403 || error.status == 500){
          iziToast.error({
          title: 'Error:',
          class: 'text-danger',
          position: 'topRight',
          message: 'La expirado la sesión o no cuenta con los permisos para acceder al modulo, será redireccionado al inicio de sesión'//error.message
        });

        setTimeout(() => {
          localStorage.removeItem('token');
          localStorage.removeItem('_id');
          this._router.navigate(['/login']);
        }, 3000);
      }
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

  deleteItem(id){
    this.loadBtn = true;
    this._productoService.deleteClient(id, this.token).subscribe(
      response => {
        iziToast.success({
          title: 'Producto Eliminado:',
          position: 'topRight',
          message: 'El producto fue eliminado exitosamente'//error.message
        });

        $('#delete-'+id).modal('hide');
        $('.modal-backdrop').removeClass('show');
        this.loadBtn = false;
        this.initData();
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

  downloadExcel(){
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet("Reporte de productos");

    worksheet.addRow(undefined);
    for (let x1 of this.arrProductos){
      let x2=Object.keys(x1);

      let temp=[]
      for(let y of x2){
        temp.push(x1[y])
      }
      worksheet.addRow(temp)
    }

    let fname='REP01- ';

    worksheet.columns = [
      { header: 'Producto', key: 'col1', width: 30},
      { header: 'Stock', key: 'col2', width: 15},
      { header: 'Precio', key: 'col3', width: 15},
      { header: 'Categoria', key: 'col4', width: 25},
      { header: 'N° ventas', key: 'col5', width: 15},
    ]as any;

    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob, fname+'-'+new Date().valueOf()+'.xlsx');
    });
  }

}

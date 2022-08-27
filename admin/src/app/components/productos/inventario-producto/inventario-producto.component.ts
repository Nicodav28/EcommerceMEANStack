import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from 'src/app/service/admin.service';
import { ProductoService } from 'src/app/service/producto.service';
import { Workbook } from 'exceljs';
import * as fs from 'file-saver';

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
  public _idUser: any;
  public producto: any = {};
  public invetarios: Array<any> = [];
  public arrInventario: Array<any> = [];
  public loadBtn = false;
  public inventoryData: any = {};

  constructor(
    private _route: ActivatedRoute,
    private _productoService: ProductoService,
    private _adminService: AdminService
  ) { 
    this.token = this._adminService.getToken();
    this._idUser = localStorage.getItem('_id');
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
                  this.invetarios.forEach(element => {
                    this.arrInventario.push({
                      admin: element.admin.nombres + ' ' + element.admin.apellidos,
                      cantidad: element.cantidad,
                      proveedor: element.proveedor
                    });
                  })
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
          message: 'Hubo un error eliminando el producto'
        });
        this.loadBtn = false;
      }
    );
  }

  registerInventory(inventoryForm: any){
    if(inventoryForm.valid){
      console.log(this.inventoryData);
      let data = {
        producto: this.producto._id,
        admin: this._idUser,
        proveedor: inventoryForm.value.proveedor,
        cantidad: inventoryForm.value.cantidad
      }

      this._productoService.createInventory(data, this.token).subscribe(
        response => {
          iziToast.success({
            title: 'Registro Exitoso:',
            position: 'topRight',
            message: 'El inventario fue registrado de manera exitosa.'
          });
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
            message: 'Hubo un error registrando el producto.'
          });
        }
      );
    }else{
      iziToast.error({
        title: 'Error:',
        position: 'topRight',
        message: 'Los datos del formulario no son validos, por favor verifique la información ingresada.'//error.message
      });
    }
  }

  downloadExcel(){
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet("Reporte de Inventario");

    worksheet.addRow(undefined);
    for (let x1 of this.arrInventario){
      let x2=Object.keys(x1);

      let temp=[]
      for(let y of x2){
        temp.push(x1[y])
      }
      worksheet.addRow(temp)
    }

    let fname=this.producto.titulo + 'REP01- ';

    worksheet.columns = [
      { header: 'Trabajador', key: 'col1', width: 30},
      { header: 'Cantidad', key: 'col2', width: 15},
      { header: 'Proveedor', key: 'col3', width: 15}
    ]as any;

    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob, fname+'-'+new Date().valueOf()+'.xlsx');
    });
  }

}

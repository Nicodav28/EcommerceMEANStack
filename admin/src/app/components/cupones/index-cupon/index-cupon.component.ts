import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/service/admin.service';
import { CuponService } from 'src/app/service/cupon.service';
declare var iziToast: any;

@Component({
  selector: 'app-index-cupon',
  templateUrl: './index-cupon.component.html',
  styleUrls: ['./index-cupon.component.css']
})
export class IndexCuponComponent implements OnInit {

  public cuponsList: Array<any> = [];
  public loadData: boolean = true;
  public page = 1;
  public pageSize = 20;
  public filtro: any = '';
  public token: any;
  public info:boolean = true;

  constructor(
    private _cuponService: CuponService,
    private _adminService: AdminService
  ) { 
    this.token = _adminService.getToken();
  }

  ngOnInit(): void {
    this._cuponService.fetchCuponFilter(this.filtro, this.token).subscribe(
      response => {
        this.cuponsList = response.data;
        this.loadData = false;
      },
      error => {
        console.log(error);
        iziToast.error({
          title: 'Error:',
          position: 'topRight',
          message: 'Ha ocurrido un error verifique la conexion a su red o contactese con un administrador del sistema.'//error.message
        });
      }
    )
  }

  filterData(){
    this._cuponService.fetchCuponFilter(this.filtro, this.token).subscribe(
      response => {
        if(response.data.length == 0){
          console.log(response.data.length);    
          this.info = false;
        }else{
          this.cuponsList = response.data;
          this.loadData = false;
          this.info = true;
        }
      },
      error => {
        console.log(error);
        iziToast.error({
          title: 'Error:',
          position: 'topRight',
          message: 'Ha ocurrido un error verifique la conexion a su red o contactese con un administrador del sistema.'//error.message
        });
      }
    )
  }

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/service/admin.service';
import { CuponService } from 'src/app/service/cupon.service';
declare var iziToast: any;

@Component({
  selector: 'app-update-cupon',
  templateUrl: './update-cupon.component.html',
  styleUrls: ['./update-cupon.component.css']
})
export class UpdateCuponComponent implements OnInit {

  public cuponData: any = {
    tipo: ''
  };
  public loadBtn: boolean = false;
  public token: any;
  public id: any;
  public loadData: boolean = true;

  constructor(
    private _cuponService: CuponService,
    private _adminService: AdminService,
    private _router: Router,
    private _route: ActivatedRoute
  ) { 
    this.token = this._adminService.getToken();
  }

  ngOnInit(): void {
    this._route.params.subscribe(
      params=>{
        this.id = params['id'];
        console.log(this.id);
        this._cuponService.fetchCuponId(this.id, this.token).subscribe(
          response => {
            if(response.data == undefined){
              this._router.navigate(['/panel/cupones']);
              this.cuponData = undefined;
              iziToast.error({
                title: 'Error:',
                position: 'topRight',
                message: 'El id del elemento a editar no se encontró, contactesé con un administrador del servicio.'//error.message
              });
              this.loadData = false;
            }else{
              this.cuponData = response.data;
              this.loadData = false;
            }
          },
          error => {
            console.log(error);
          }
        );
      }
    )
  }

  cuponUpdate(cuponUpdateForm){
    if(cuponUpdateForm.valid){
      console.log(this.cuponData);
      this._cuponService.updateCuponData(this.id, this.cuponData ,this.token).subscribe(
        response => {
          iziToast.success({
            title: 'Actualización Exitosa:',
            position: 'topRight',
            message: 'El cupon ha sido actualizado de manera exitosa.'//error.message
          });
          this.loadBtn = false;
          this._router.navigate(['/panel/cupones']);
        },
        error => {
          console.log(error);
          iziToast.error({
            title: 'Error:',
            position: 'topRight',
            message: 'Hubo un error en el sistema, por favor intentelo de nuevo.'//error.message
          });
        }
      );
    }else{
      iziToast.error({
        title: 'Error:',
        position: 'topRight',
        message: 'Los datos ingresados en el formulario no son validos.'//error.message
      });
    }
  }

}

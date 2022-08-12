import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/service/admin.service';
import { CuponService } from 'src/app/service/cupon.service';
declare var iziToast: any;

@Component({
  selector: 'app-create-cupon',
  templateUrl: './create-cupon.component.html',
  styleUrls: ['./create-cupon.component.css']
})
export class CreateCuponComponent implements OnInit {

  public cuponData: any = {
    tipo: ''
  };
  public loadBtn: boolean = false;
  public token: any;

  constructor(
    private _cuponService: CuponService,
    private _adminService: AdminService
  ) { 
    this.token = _adminService.getToken();
  }

  ngOnInit(): void {
  }

  cuponRegister(cuponRegisterForm){
    if(cuponRegisterForm.valid){
      this.loadBtn = true;
      this._cuponService.cuponRegister(this.cuponData, this.token).subscribe(
        response => {
          console.log(response);
          iziToast.success({
            title: 'Registro Exitoso:',
            position: 'topRight',
            message: 'El cupon ha sido registrado de manera exitosa'//error.message
          });
          this.loadBtn = false;
          cuponRegisterForm.reset();
        },
        error => {
          console.log(error);
          iziToast.error({
            title: 'Error:',
            position: 'topRight',
            message: 'Hubo un error realizando el registro.'//error.message
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

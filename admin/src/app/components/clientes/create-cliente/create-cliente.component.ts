import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/service/admin.service';
import { ClienteService } from 'src/app/service/cliente.service';

declare var iziToast: any;


@Component({
  selector: 'app-create-cliente',
  templateUrl: './create-cliente.component.html',
  styleUrls: ['./create-cliente.component.css']
})
export class CreateClienteComponent implements OnInit {

  public clientData: any = {
    genero: ''
  };

  public token: any;

  constructor(
    private _clienteService: ClienteService,
    private _adminService: AdminService
  ) { 
    this.token = this._adminService.getToken();
  }

  ngOnInit(): void {
  }

  clientRegister(clientRegister: any){
    if(clientRegister.valid){
      console.log(this.clientData);
      this._clienteService.clientRegister(this.clientData, this.token).subscribe(
        response=>{
          // console.log(response);
          iziToast.success({
            title: 'Registro Exitoso:',
            position: 'topRight',
            message: 'El usuario cliente ha sido creado de manera exitosa'//error.message
          });
          clientRegister.reset();
        },
        error=>{
          if(error.status == 409){
            iziToast.error({
              title: 'Error realizando registro:',
              position: 'topRight',
              message: 'El correo ingresado ya se encuentra registrado, intente con uno diferente.'//error.message
            }); 
          }else{
            iziToast.error({
              title: 'Error realizando registro:',
              position: 'topRight',
              message: error.message
            }); 
          }
        }
      );
    }else{
      iziToast.error({
        title: 'Error:',
        class: 'text-danger',
        position: 'topRight',
        message: 'Hubo un problema registrando el usuario, por favor intentelo de nuevo.'//error.message
      });
    }
  }

}

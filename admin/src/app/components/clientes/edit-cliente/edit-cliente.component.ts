import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from 'src/app/service/admin.service';
import { ClienteService } from 'src/app/service/cliente.service';

declare var iziToast: any;


@Component({
  selector: 'app-edit-cliente',
  templateUrl: './edit-cliente.component.html',
  styleUrls: ['./edit-cliente.component.css']
})
export class EditClienteComponent implements OnInit {

  public clientData: any = {};
  public id: any;
  public token: any;

  constructor(
    private _route: ActivatedRoute,
    private _clienteService: ClienteService,
    private _adminService: AdminService
  ) {
    this.token = this._adminService.getToken();
   }

  ngOnInit(): void {
    this._route.params.subscribe(
      params=>{
        this.id = params['id'];
        this._clienteService.fetchClientId(this.id, this.token).subscribe(
          response => {
            //@ts-ignore
            if(response.data == undefined){
              this.clientData = undefined;
              console.log(this.clientData);
            }else{
              //@ts-ignore
              this.clientData = response.data;
            }
          },
          error => {
            console.log(error);
          }
        );
      }
    )
  }

  clientUpdate(updateForm: any){
    if(updateForm.valid){
      this._clienteService.updateClient(this.id, this.clientData, this.token).subscribe(
        response => {
          console.log(response);
          iziToast.success({
            title: 'Actualización Exitosa:',
            position: 'topRight',
            message: 'El usuario cliente ha sido actualizado de manera exitosa'//error.message
          });
        },
        error => {
          console.log(error);
          iziToast.error({
            title: 'Error:',
            position: 'topRight',
            message: 'Hubo un error actualizando los datos del usuario, por favor intentelo de nuevo'//error.message
          }); 
        }
      );
    }else{
      iziToast.error({
        title: 'Error:',
        position: 'topRight',
        message: 'Hubo un error actualizando los datos del usuario, por favor intentelo de nuevo'//error.message
      }); 
    }
  }
}

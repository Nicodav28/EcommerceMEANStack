import { Component, OnInit } from '@angular/core';
import { ClienteService } from 'src/app/services/cliente.service';

declare var iziToast: any;
declare var $:any;

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  public cliente: any = {};
  public id: any = undefined;
  public token: any = undefined;
  
  constructor(
    private _clientService: ClienteService
  ) { 
    this.id = localStorage.getItem('_id');
    this.token = localStorage.getItem('token');
    this.initData();
  }

  ngOnInit(): void {
  }

  updateClientData(updateForm: any){
    if(updateForm.valid){
      this.cliente.password = $('#inputPassword').val();
      this._clientService.updateClientGuest(this.id, this.token, this.cliente).subscribe(
        response => {
          iziToast.success({
            title: 'Actualización Exitosa:',
            position: 'topRight',
            message: 'El perfil ha sido actualizado exitosamente.'
          });
          this.initData();
        },
        error => {
          console.log(error);
        }
      );
    }else{
      iziToast.error({
        title: 'Error Actualizando Datos:',
        position: 'topRight',
        message: 'Los datos ingresados no son validos.'
      });
    }
  }

  initData(){
    if(this.id != undefined && this.token != undefined){
      this._clientService.fetchClientIdGuest(this.id, this.token).subscribe(
        response => {
          this.cliente = response.data;
        }
      );
    }
  }

}

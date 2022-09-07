import { Component, OnInit } from '@angular/core';
import { ClienteService } from 'src/app/services/cliente.service';

declare var iziToast: any;

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

    if(this.id != undefined && this.token != undefined){
      this._clientService.fetchClientIdGuest(this.id, this.token).subscribe(
        response => {
          this.cliente = response.data;
        }
      );
    }
  }

  ngOnInit(): void {
  }

  updateClientData(updateForm: any){
    if(updateForm.valid){
      console.log(this.cliente);
    }else{
      iziToast.error({
        title: 'Error Actualizando Datos:',
        position: 'topRight',
        message: 'Los datos ingresados no son validos.'
      });
    }
  }

}

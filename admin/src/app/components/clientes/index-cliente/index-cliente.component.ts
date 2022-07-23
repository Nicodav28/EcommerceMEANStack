import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/service/admin.service';
import { ClienteService } from 'src/app/service/cliente.service';

@Component({
  selector: 'app-index-cliente',
  templateUrl: './index-cliente.component.html',
  styleUrls: ['./index-cliente.component.css']
})
export class IndexClienteComponent implements OnInit {

  public clientes: Array<any> = [];
  public lastNameFilter = '';
  public emailFilter = '';
  public page = 1;
  public pageSize = 2;
  public token: any;

  constructor(
    private _clienteService: ClienteService,
    private _adminService: AdminService
  ) {
    this.token = this._adminService.getToken();
   }

  ngOnInit(): void {
    this._clienteService.fetchClients(null, null, this.token).subscribe(
      response =>{
        this.clientes = response.data;
      },
      error =>{
        console.log(error);
      }
    );
  }

  filterData(tipo: any){
    if(tipo == 'apellidos'){
      this._clienteService.fetchClients(tipo, this.lastNameFilter, this.token).subscribe(
        response =>{
          this.clientes = response.data;
        },
        error =>{
          console.log(error);
        }
      );
    }else if(tipo == 'email'){
      this._clienteService.fetchClients(tipo, this.emailFilter, this.token).subscribe(
        response =>{
          this.clientes = response.data;
        },
        error =>{
          console.log(error);
        }
      );
    }
  }

}

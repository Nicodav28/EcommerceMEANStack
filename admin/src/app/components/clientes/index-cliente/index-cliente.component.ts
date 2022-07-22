import { Component, OnInit } from '@angular/core';
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
  public pageSize = 1;

  constructor(
    private _clienteService: ClienteService
  ) {

   }

  ngOnInit(): void {
    this._clienteService.fetchClients(null, null).subscribe(
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
      this._clienteService.fetchClients(tipo, this.lastNameFilter).subscribe(
        response =>{
          this.clientes = response.data;
        },
        error =>{
          console.log(error);
        }
      );
    }else if(tipo == 'email'){
      this._clienteService.fetchClients(tipo, this.emailFilter).subscribe(
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

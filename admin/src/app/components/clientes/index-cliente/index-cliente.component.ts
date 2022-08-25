import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/service/admin.service';
import { ClienteService } from 'src/app/service/cliente.service';
import { Router } from '@angular/router'; 

declare var iziToast: any;
declare var jQuery: any;
declare var $: any;

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
  public pageSize = 5;
  public token: any;
  public loadData: any = true;
  public info: any = true;

  constructor(
    private _clienteService: ClienteService,
    private _adminService: AdminService,
    private _router: Router
  ) {
    this.token = this._adminService.getToken();
   }

  ngOnInit(): void {
    this.initData();
  }

  initData(){
    this._clienteService.fetchClients(null, null, this.token).subscribe(
      response =>{
        // if(response.data)
        this.clientes = response.data;
        this.loadData = false;

        // setTimeout(() =>{
        // },3000);
      },
      error =>{
        if(error.status == 403 || error.status == 500){
          iziToast.error({
          title: 'Error:',
          class: 'text-danger',
          position: 'topRight',
          message: 'Ha expirado la sesión o no cuenta con los permisos para acceder al modulo, será redireccionado al inicio de sesión'//error.message
        });

        setTimeout(() => {
          localStorage.removeItem('token');
          localStorage.removeItem('_id');
          this._router.navigate(['/login']);
        }, 3000);
      }
        // console.log(error);
      }
    );
  }

  filterData(tipo: any){
    if(tipo == 'apellidos'){
      this.info = true;
      this.loadData = true;
      this._clienteService.fetchClients(tipo, this.lastNameFilter, this.token).subscribe(
        response =>{
          if(response.data.length == 0){
            setTimeout(() => {
              this.clientes = [];
              this.loadData = false;
              this.info = null;
            },4000);
          }else{
            this.clientes = response.data;
            this.loadData = false;
            this.info = true;
          }
        },
        error =>{
          console.log(error);
        }
      );
    }else if(tipo == 'email'){
      this.loadData = true;
      this._clienteService.fetchClients(tipo, this.emailFilter, this.token).subscribe(
        response =>{
          if(response.data.length == 0){
            setTimeout(() => {
              this.clientes = [];
              this.loadData = false;
              this.info = null;
            },4000);
          }else{
            this.clientes = response.data;
            this.loadData = false;
            this.info = true;
          }
        },
        error =>{
          console.log(error);
        }
      );
    }
  }

  deleteClient(id){
    this._clienteService.deleteClient(id, this.token).subscribe(
      response => {        
        iziToast.success({
          title: 'Usuario Eliminado:',
          position: 'topRight',
          message: 'El usuario fue eliminado exitosamente'//error.message
        });

        $('#delete-'+id).modal('hide');
        $('.modal-backdrop').removeClass('show');
        this.initData();
      },
      error =>{
        console.log(error);
      }
    );
  }

}

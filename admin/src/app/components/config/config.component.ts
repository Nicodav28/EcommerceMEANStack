import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/service/admin.service';

declare var iziToast: any;
declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css']
})

export class ConfigComponent implements OnInit {
  public token: any;
  public configData: any = {};

  public tittleCategory: any = '';
  public iconCategory: any = '';

  constructor(
    private _adminService: AdminService,
    private _router: Router
    ) { 
      this.token = _adminService.getToken();
    }

  ngOnInit(): void {
    this._adminService.fetchConfigData(this.token).subscribe(
      response => {
        console.log(response.data);
        this.configData = response.data;
      },
      error => {
        if(error.status == 403 || error.status == 500){
          iziToast.error({
          title: 'Error:',
          class: 'text-danger',
          position: 'topRight',
          message: 'La expirado la sesión o no cuenta con los permisos para acceder al modulo, será redireccionado al inicio de sesión'//error.message
          });

          console.log(error);

          setTimeout(() => {
            localStorage.removeItem('token');
            localStorage.removeItem('_id');
            this._router.navigate(['/login']);
          }, 3000);
      }
      }
    );
  }

}

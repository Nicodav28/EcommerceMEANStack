import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClienteService } from 'src/app/services/cliente.service';

declare var iziToast: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public userData: any = {};
  public userResponse: any = {};
  public token: any;

  constructor(
    private _clientService: ClienteService,
    private _router: Router
  ) { 
    this.token = localStorage.getItem('token');
    if(this.token){
      iziToast.error({
        title: 'Error:',
        position: 'topRight',
        message: 'Ya has iniciado sesión con anterioridad.'
      });
      this._router.navigate(['/']);
    }
  }

  ngOnInit(): void {
  }

  loginMethod(loginForm: any){
    if(loginForm.valid) {
      let data = {
        email: this.userData.email,
        password: this.userData.password
      }

      this._clientService.clientLogin(data).subscribe(
        response => {
          if(response.data == undefined){
            iziToast.error({
              title: 'Error iniciando sesión:',
              position: 'topRight',
              message: response.message
            });
          }else{
            this.userResponse = response.data;
            localStorage.setItem('token', response.token);
            localStorage.setItem('_id', response.data._id);
            
            iziToast.success({
              title: 'Inicio de sesión exitoso:',
              position: 'topRight',
              message: 'Ha iniciado sesión con exito'
            });
            this._router.navigate(['/']);
          }
        },
        error => {
          console.log(error);
          iziToast.error({
            title: 'Error iniciando sesión:',
            position: 'topRight',
            message: 'Ocurrio un error intente iniciar sesión nuevamente.'
          });
        }
      );
    }else{
      iziToast.error({
        title: 'Error iniciando sesión:',
        position: 'topRight',
        message: 'Los datos ingresados no son validos'
      }); 
    }
  }

}

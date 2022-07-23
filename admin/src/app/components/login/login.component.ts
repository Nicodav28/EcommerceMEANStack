import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/service/admin.service';
import { Router } from '@angular/router'; 

declare var jQuery: any;
declare var $: any;
declare var iziToast: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  public user: any = {};
  public userStorage: any = {};
  public token: any = '';

  constructor(
    private _adminService: AdminService,
    private _router: Router
  ) {
    this.token = this._adminService.getToken();
  }

  ngOnInit(): void {
    if(this.token){
      this._router.navigate(['/']);
    }else{
      this._router.navigate(['login']);
    }
  }

  login(loginForm: any) {
    if (loginForm.valid) {
      // console.log(this.user);

      let data = {
        email: this.user.email,
        password: this.user.password
      }
      this._adminService.loginAdmin(data).subscribe(
        (response: any) => {
          if  (response.data == undefined) {
              iziToast.error({
              title: 'Error:',
              class: 'text-danger',
              position: 'topRight',
              message: response.message
            });
          }else{
            this.userStorage = response.data;
            localStorage.setItem('token', response.token);
            localStorage.setItem('_id', response.data._id);

            this._router.navigate(['/']);
          }
        },
        (error: any) => {
          console.log(error);
        }
      );
    } else {
      iziToast.error({
        title: 'Error:',
        class: 'text-danger',
        position: 'topRight',
        message: 'Los datos del formulario no son validos, intentelo <br>de nuevo o contactese con un administrador.'
      });
    }
  }

}

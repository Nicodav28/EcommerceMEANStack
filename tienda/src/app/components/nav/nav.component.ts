import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClienteService } from 'src/app/services/cliente.service';

declare var iziToast: any;
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  public token: any = undefined;
  public id: any;
  public userData: any = undefined;
  public userLc: any = {};
  public categories: any = {};
  
  constructor(
    private _clientService: ClienteService,
    private _router: Router
  ) { 
    this.token = localStorage.getItem('token');
    this.id = localStorage.getItem('_id');

    if(this.token != undefined) {
      this._clientService.fetchClientIdGuest(this.id, this.token).subscribe(
        response => {
          this.userData = response.data;
          localStorage.setItem('user_data', JSON.stringify(this.userData));
        },
        error => {
          console.log(error);
          this.userData = undefined;
        }
      );
    }

    this.initData();
  }

  ngOnInit(): void {
  }

  ngDoCheck(){
    if(localStorage.getItem('user_data') && this.token != undefined){
      this.userLc = JSON.parse(localStorage.getItem('user_data') || '{}');
    }else{
      this.userLc = undefined;
    }
  }

  logoutGuest(){
    iziToast.info({
      title: 'Sesión cerrada:',
      position: 'bottomRight',
      message: 'Se ha cerrado la sesión con exito'
    });
    localStorage.clear();
    this._router.navigate(['/']);
  }

  initData() {
    this._clientService.fetchCategories().subscribe(
      response => {
        this.categories = response.data;
      },
      error => {
        console.log(error);
      }
    );
  }

}

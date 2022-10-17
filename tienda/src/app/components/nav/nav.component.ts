import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClienteService } from 'src/app/services/cliente.service';
import { global } from 'src/app/services/global';
import { io } from "socket.io-client";

declare var iziToast: any;
declare var $: any;
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
  public cartStat = false;
  public cartArr: Array<any> = [];
  public url: any;
  public subTotal: any = 0;
  public priceFormat: any;
  public val;
  public socket: any = io('http://localhost:4201');
  
  constructor(
    private _clientService: ClienteService,
    private _router: Router
  ) { 
    this.token = localStorage.getItem('token');
    this.id = localStorage.getItem('_id');
    this.url = global.url;

    if(this.token != undefined) {
      this._clientService.fetchClientIdGuest(this.id, this.token).subscribe(
        response => {
          this.userData = response.data;
          localStorage.setItem('user_data', JSON.stringify(this.userData));
          this.getClientCart();

        },
        error => {
          this.userData = undefined;
          localStorage.clear();
          iziToast.info({
            title: 'Sesión cerrada:',
            position: 'topRight',
            message: 'Ha ocurrido un error o su sesión ha expirado, inicie sesión nuevamente.'
          });
          this._router.navigate(['/login']);
        }
      );
    }

    this.initData();
  }

  ngOnInit(): void {
    this.socket.on('newCart', function(data){
      this.getClientCart();
    }.bind(this));


    this.socket.on('newCartAdd', function(data){
      this.getClientCart();
    }.bind(this));
  }

  ngDoCheck(){
    if(localStorage.getItem('user_data') && this.token != undefined){
      this.userLc = JSON.parse(localStorage.getItem('user_data') || '{}');
    }else{
      this.userLc = undefined;
    }
  }

  getClientCart(){
    
    this._clientService.fetchClientCart(this.id, this.token).subscribe(
      response => {
        this.cartArr = response.data;
        this.cartCalculate();
      }
    );
  }

  logoutGuest(){
    iziToast.info({
      title: 'Sesión cerrada:',
      position: 'topRight',
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

  cartStatFunc(){

    if(!this.cartStat){

      this.cartStat = true;
      $('#cart').addClass('show');
    }else{

      this.cartStat = false;
      $('#cart').removeClass('show');
    } 

  }

  cartCalculate() {
    let internationalNumberFormat = new Intl.NumberFormat('en-US');
    this.cartArr.forEach(element => {
      this.subTotal = this.subTotal + (parseInt(element.producto.precio) * element.cantidad)
      this.val = internationalNumberFormat.format(this.subTotal);
    });
  }

  deleteItem(id){
    this._clientService.delClientCart(id, this.token).subscribe(
      response => {
        iziToast.success({
          title: 'Producto Elminado',
          position: 'topRight',
          message: 'El producto ha sido quitado del carrito exitosamente.'
        });
        
        this.socket.emit('cartDelete', {data: response.data});
      }
    );
  }

}

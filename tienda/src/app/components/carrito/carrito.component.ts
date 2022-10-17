import { Component, OnInit } from '@angular/core';
import { ClienteService } from 'src/app/services/cliente.service';
import { global } from 'src/app/services/global';
import { io } from "socket.io-client";

declare var iziToast: any;
@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {
  
  public id: any;
  public cartArr: Array<any> = [];
  public token: any;
  public url: any;
  public subTotal: any = 0;
  public val;
  public totalPayment: any;
  public socket: any = io('http://localhost:4201');

  constructor(
    private _clientService: ClienteService
  ) { 
    this.id = localStorage.getItem('_id');
    this.token = localStorage.getItem('token');
    this.url = global.url;

    this.initData();
  }

  ngOnInit(): void {
  }

  initData(){
    this._clientService.fetchClientCart(this.id, this.token).subscribe(
      response => {
        this.cartArr = response.data;
        this.cartCalculate();
      }
    )
  }

  cartCalculate() {
    let internationalNumberFormat = new Intl.NumberFormat('en-US');
    this.cartArr.forEach(element => {
      // let operation = this.subTotal + element.producto.precio;
      
      this.subTotal = this.subTotal + (parseInt(element.producto.precio) * element.cantidad)
      this.val = internationalNumberFormat.format(this.subTotal);
    });

    this.totalPayment = this.val;
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

        this.initData();

      }
    );
  }

}

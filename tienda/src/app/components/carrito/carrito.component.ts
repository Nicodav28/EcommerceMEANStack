import { Component, OnInit } from '@angular/core';
import { ClienteService } from 'src/app/services/cliente.service';
import { global } from 'src/app/services/global';

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

  constructor(
    private _clientService: ClienteService
  ) { 
    this.id = localStorage.getItem('_id');
    this.token = localStorage.getItem('token');
    this.url = global.url;

    this._clientService.fetchClientCart(this.id, this.token).subscribe(
      response => {
        this.cartArr = response.data;
        this.cartCalculate();
      }
    )
  }

  ngOnInit(): void {
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

}

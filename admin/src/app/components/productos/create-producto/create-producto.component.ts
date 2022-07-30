import { Component, OnInit } from '@angular/core';
declare var iziToast: any;


@Component({
  selector: 'app-create-producto',
  templateUrl: './create-producto.component.html',
  styleUrls: ['./create-producto.component.css']
})
export class CreateProductoComponent implements OnInit {

  producto: any = {};

  constructor() { }

  ngOnInit(): void {
  }

  itemRegister(itemRegisterForm){
    if(itemRegisterForm.valid){
      console.log(this.producto);
      iziToast.success({
        title: 'Registro Exitoso:',
        position: 'topRight',
        message: this.producto
      }); 
    }else{
      iziToast.error({
        title: 'Error realizando registro:',
        position: 'topRight',
        message: 'Hubo un error realizando el registro del producto'
      }); 
    }
  }
}

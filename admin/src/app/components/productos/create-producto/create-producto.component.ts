import { Component, OnInit } from '@angular/core';
declare var iziToast: any;
declare var jQuery: any;
declare var $: any;


@Component({
  selector: 'app-create-producto',
  templateUrl: './create-producto.component.html',
  styleUrls: ['./create-producto.component.css']
})
export class CreateProductoComponent implements OnInit {

  producto: any = {};
  public file: File = undefined;
  public imgSelected: any | ArrayBuffer = 'assets/img/01.jpg';

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

  fileChangeEvent(event:any):void{
    var fileTemp;

    if(event.target.files && event.target.files[0]){
      fileTemp = <File>event.target.files[0];
    }else{
      iziToast.error({
        title: 'Error:',
        position: 'topRight',
        message: 'Hubo un error cargando la imagen'
      }); 
      $('#inputPortada').text('Seleccionar imagen');
      this.imgSelected = 'assets/img/01.jpg';
      this.file = undefined;
    }

    if(fileTemp.size <= 4000000){
      if(fileTemp.type == 'image/png' || fileTemp.type == 'image/webp' || fileTemp.type == 'image/jpg' || fileTemp.type == 'image/jpeg' || fileTemp.type == 'image/gif'){
        const fileReader = new FileReader();
        fileReader.onload = e => this.imgSelected = fileReader.result;
        // console.log(this.imgSelected);
        fileReader.readAsDataURL(fileTemp);

        $('#inputPortada').text(fileTemp.name)
        this.file = fileTemp;

      }else{
        iziToast.error({
          title: 'Error:',
          position: 'topRight',
          message: 'La imagen no puede ser cargada, esta cargando un formato de archivo no permitido.'
        }); 
        $('#inputPortada').text('Seleccionar imagen');
        this.imgSelected = 'assets/img/01.jpg';
        this.file = undefined;
      }
    }else{
      iziToast.error({
        title: 'Error:',
        position: 'topRight',
        message: 'La imagen no puede ser cargada, supera el peso permitido de 4MB.'
      });
      $('#inputPortada').text('Seleccionar imagen');
      this.imgSelected = 'assets/img/01.jpg';
      this.file = undefined;
    }

    console.log(this.file);
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/service/admin.service';
import { ProductoService } from 'src/app/service/producto.service';
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
  public config: any = {};
  public token: any;
  public loadBtn: boolean = false;
  public configGlobal:any = {};

  constructor(
    private _productoService: ProductoService,
    private _adminService: AdminService,
    private _router: Router
  ) {
    this.token = this._adminService.getToken();
    this.config = {
      heigth: 500
    }
   }

  ngOnInit(): void {
    this._adminService.fetchCategories().subscribe(
      response => {
        this.configGlobal = response.data;
      },
      error => {
        console.log(error);
      }
    );
  }

  itemRegister(itemRegisterForm){
    if(itemRegisterForm.valid){
      if(this.file == undefined){
        iziToast.error({
          title: 'Error realizando registro:',
          position: 'topRight',
          message: 'Debe cargar una portada para registrar el producto'
        }); 
      }else{
        this.loadBtn = true;
        this._productoService.productRegister(this.producto, this.file, this.token).subscribe(
          response =>{
            console.log(response);
            iziToast.success({
              title: 'Registro Exitoso:',
              position: 'topRight',
              message: 'El producto ha sido registrado de manera exitosa'
            }); 
            this.loadBtn = false;
            this._router.navigate(['/panel/productos']);
          },
          error =>{
            console.log(error);
            this.loadBtn = false;
          }
        );
      }
    }else{
      iziToast.error({
        title: 'Error:',
        position: 'topRight',
        message: 'Los datos ingresados en el formulario no son validos'
      }); 
      this.loadBtn = false;
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

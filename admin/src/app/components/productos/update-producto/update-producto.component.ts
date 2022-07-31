import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/service/admin.service';
import { global } from 'src/app/service/global';
import { ProductoService } from 'src/app/service/producto.service';
declare var iziToast: any;
declare var jQuery: any;
declare var $: any;


@Component({
  selector: 'app-update-producto',
  templateUrl: './update-producto.component.html',
  styleUrls: ['./update-producto.component.css']
})
export class UpdateProductoComponent implements OnInit {

  public producto: any = {};
  public config: any = {};
  public imgSelected: String | ArrayBuffer;
  public loadBtn: boolean = false;
  public id: string;
  public token: any;
  public url: any;
  public file: File = undefined;

  constructor(
    private _productoService: ProductoService,
    private _route: ActivatedRoute,
    private _adminService: AdminService,
    private _router: Router
  ) {
    this.config = {
      height: 500
    };
    this.token = this._adminService.getToken();
    this.url = global.url;
  }

  ngOnInit(): void {
    this._route.params.subscribe(
      params => {
        this.id = params['id'];
        this._productoService.fetchProductsId(this.id, this.token).subscribe(
          response => {
            if (response.data == undefined) {
              this.producto = undefined;
            } else {
              this.producto = response.data;
              this.imgSelected = this.url + 'obtenerImagen/' + this.producto.portada;
            }
          },
          error => {
            console.log(error);
          }
        );
      }
    )
  }

  updateItem(updateProductForm) {
    if (updateProductForm.valid) {

      var data: any = {};
      if(this.file != undefined){
        data.portada = this.file;
      }

      data.titulo = this.producto.titulo;
      data.stock = this.producto.stock;
      data.precio = this.producto.precio;
      data.categoria = this.producto.categoria;
      data.contenido = this.producto.contenido;
      data.descripcion = this.producto.descripcion;

      this.loadBtn = true;
      this._productoService.updateProductData(data, this.id, this.token).subscribe(
        response => {
          console.log(response);
          console.log(this.producto);
          console.log(this.file);

          iziToast.success({
            title: 'Registro Exitoso:',
            position: 'topRight',
            message: 'La información ha sido actualizada de manera exitosa'
          });

          this.loadBtn = false;
          
          this._router.navigate(['/panel/productos']);
        },
        error => {
          console.log(error);
          iziToast.error({
            title: 'Error realizando registro:',
            position: 'topRight',
            message: 'Hubo un error actualizando la información'
          });
          this.loadBtn = false;
        }
      );
    } else {
      iziToast.error({
        title: 'Error realizando registro:',
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

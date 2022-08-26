import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from 'src/app/service/admin.service';
import { global } from 'src/app/service/global';
import { ProductoService } from 'src/app/service/producto.service';
import { v4 as uuidv4} from 'uuid';

declare var iziToast: any;
declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-galeria-producto',
  templateUrl: './galeria-producto.component.html',
  styleUrls: ['./galeria-producto.component.css']
})
export class GaleriaProductoComponent implements OnInit {
  public producto: any = {};
  public id: any;
  public token: any;
  public file: File = undefined;
  public loadBtn: boolean = false;
  public url: any;
  public loadBtnDel: boolean = false;

  constructor(
    private _route: ActivatedRoute,
    private _productoService: ProductoService,
    private _adminService: AdminService
  ) {
    this.token = this._adminService.getToken();
    this.url = global.url;
   }

  ngOnInit(): void {
    this._route.params.subscribe(
      params => {
        this.id = params['id'];
        this.initData();
      }
    );
  }

  initData(){
    this._productoService.fetchProductsId(this.id, this.token).subscribe(
      response => {
        if (response.data == undefined) {
          this.producto = undefined;
        } else {
          this.producto = response.data;
        }
        // console.log(this.producto);
      },
      error => {
        console.log(error);
      }
    );
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

    }

    if(fileTemp.size <= 4000000){
      if(fileTemp.type == 'image/png' || fileTemp.type == 'image/webp' || fileTemp.type == 'image/jpg' || fileTemp.type == 'image/jpeg' || fileTemp.type == 'image/gif'){ 

        this.file = fileTemp;

      }else{
        iziToast.error({
          title: 'Error:',
          position: 'topRight',
          message: 'La imagen no puede ser cargada, esta cargando un formato de archivo no permitido.'
        }); 
        $('#inputImage').val('');
        this.file = undefined;
      }
    }else{
      iziToast.error({
        title: 'Error:',
        position: 'topRight',
        message: 'La imagen no puede ser cargada, supera el peso permitido de 4MB.'
      });
      $('#inputImage').val('');
      this.file = undefined;
    }

    // console.log(this.file);
  }

  uploadImage(){
    if(this.file != undefined){
      this.loadBtn = true;
      let data = {
        imagen: this.file,
        _id: uuidv4()
      } 
      this._productoService.uploadProductGallery(this.id, data, this.token).subscribe(
        response => {
          console.log(response);
          iziToast.success({
            title: 'Exito:',
            position: 'topRight',
            message: 'Imagen cargada exitosamente'
          });

          $('#inputImage').val('');
          this.file = undefined;
          this.initData();
          this.loadBtn = false;
        },
        error => {
          console.log(error)
        }
      );
    }else{
      iziToast.error({
        title: 'Error:',
        position: 'topRight',
        message: 'Debe cargar al menos una imagen.'
      });
    }
  }


  delImage(id){
    this.loadBtnDel = true;
    this._productoService.deleteProductGallery(this.id, {_id:id}, this.token).subscribe(
      response => {
        iziToast.success({
          title: 'Exito:',
          position: 'topRight',
          message: 'Imagen <strong>eliminada</strong> exitosamente'
        });

        $('#delete-'+id).modal('hide');
        $('.modal-backdrop').removeClass('show');
        this.initData();
        this.loadBtnDel = false;
      },
      error => {
        console.log(error);
        this.loadBtnDel = false;
      }
    );
  }

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/service/admin.service';
import { global } from 'src/app/service/global';
import { v4 as uuidv4 } from 'uuid';

declare var iziToast: any;
declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css']
})

export class ConfigComponent implements OnInit {
  public token: any;
  public configData: any = {};
  public tittleCategory: any = '';
  public iconCategory: any = '';
  public idTemp: any = "62f9cb1ae2d64bbb13c3ab00";
  public imgSelected: String | ArrayBuffer;
  public file: File = undefined;
  public url: any;



  constructor(
    private _adminService: AdminService,
    private _router: Router
    ) { 
      this.token = _adminService.getToken();
    }

  ngOnInit(): void {
    this.url = global.url;
    this._adminService.fetchConfigData(this.token).subscribe(
      response => {
        // console.log(response.data);
        this.configData = response.data;
        this.imgSelected = this.url+'fetchConfigImage/'+this.configData.logo;
      },
      error => {
        if(error.status == 403 || error.status == 500){
          iziToast.error({
            title: 'Error:',
            class: 'text-danger',
            position: 'topRight',
            message: 'La expirado la sesión o no cuenta con los permisos para acceder al modulo, será redireccionado al inicio de sesión'//error.message
          });

          console.log(error);

          setTimeout(() => {
            localStorage.removeItem('token');
            localStorage.removeItem('_id');
            this._router.navigate(['/login']);
          }, 3000);
      }
      }
    );
  }

  addCategory(){
    if(this.tittleCategory && this.iconCategory){
      this.configData.categorias.push({ 
        titulo: this.tittleCategory,
        icono: this.iconCategory,
        _id: uuidv4()
      });

      this.tittleCategory = '';
      this.iconCategory = '';
    }else{
      iziToast.error({
        title: 'Error:',
        class: 'text-danger',
        position: 'topRight',
        message: 'Los campos de creación de categoria no pueden estar vacios'//error.message
        });
    }
  }

  updateConfigData(configForm){
    if(configForm.valid){
      let data = {
        titulo: configForm.value.titulo,
        serie: configForm.value.serie,
        correlativo: configForm.value.correlativo,
        categorias: this.configData.categorias,
        logo: this.file
      }
      console.log(data);
      this._adminService.updateConfig(data, this.idTemp, this.token).subscribe(
        response => {
          // console.log(response);
          iziToast.success({
            title: 'Registro Exitoso:',
            class: 'text-danger',
            position: 'topRight',
            message: 'La configuración ha sido actualizada exitosamente.'//error.message
          });
        },
        error => {
          // console.log(error);
          iziToast.error({
            title: 'Error:',
            class: 'text-danger',
            position: 'topRight',
            message: 'Ha expirado la sesión o no cuenta con los permisos para acceder al modulo, será redireccionado al inicio de sesión'//error.message
          });
        }
      );
    }else{
      iziToast.error({
        title: 'Error:',
        class: 'text-danger',
        position: 'topRight',
        message: 'Los campos no estan correctamente diligenciados'//error.message
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
        $('.cs-file-drop-icon').addClass('cs-file-drop-preview img-thumbnail rounded');
        $('.cs-file-drop-icon').removeClass('cs-file-drop-icon cxi-upload');
        fileReader.readAsDataURL(fileTemp);
        $('#inputPortada').text(fileTemp.name)
        this.file = fileTemp;
        
        console.log(this.file);
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
  }

  ngDoCheck():void {
    $('.cs-file-drop-preview').html("<img src="+this.imgSelected+">");
    // console.log(this.file);
  }

  deleteCategory(idx){
    this.configData.categorias.splice(idx, 1);
  }

  getIcon(){
    let icon = $("#icon").val();
    $("#modalDefault .close").click()
    this.iconCategory = icon;
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClienteService } from 'src/app/services/cliente.service';
import { global } from 'src/app/services/global';
import { GuestService } from 'src/app/services/guest.service';
import { io } from "socket.io-client";

declare var tns;
declare var lightGallery;
declare var iziToast: any;

@Component({
  selector: 'app-show-producto',
  templateUrl: './show-producto.component.html',
  styleUrls: ['./show-producto.component.css']
})
export class ShowProductoComponent implements OnInit {

  public slug: any;
  public guestProduct: any = {};
  public url: string;
  public recoProducts: Array<any> = [];
  public categoria: any;
  public dataCart: any = {
    variedad: '',
    cantidad: 1
  };
  public token: any;
  public loadBtn: boolean =  false;
  public socket: any = io('http://localhost:4201');


  constructor(
    private _route: ActivatedRoute,
    private _guestService: GuestService,
    private _clienteService: ClienteService
  ) {
    this._route.params.subscribe(
      params => {
        this.slug = params['slug'];

        this._guestService.fetchProductsDetails(this.slug).subscribe(
          response => {
            //@ts-ignore
            this.guestProduct = response.data;
            this.categoria = this.guestProduct.categoria;

            this._guestService.fetchProductsRecommended(this.categoria).subscribe(
              response => {
                //@ts-ignore
                this.recoProducts = response.data;
              }
            );
          }
        );
      }
    );

    this.token = localStorage.getItem('token');
  }

  ngOnInit(): void {

    setTimeout(() => {

      this.url = global.url;

      tns({
        container: '.cs-carousel-inner',
        controlsText: ['<i class="cxi-arrow-left"></i>', '<i class="cxi-arrow-right"></i>'],
        navPosition: "top",
        controlsPosition: "top",
        mouseDrag: !0,
        speed: 600,
        autoplayHoverPause: !0,
        autoplayButtonOutput: !1,
        navContainer: "#cs-thumbnails",
        navAsThumbnails: true,
        gutter: 15,
      });

      var e = document.querySelectorAll(".cs-gallery");
      if (e.length) {
        for (var t = 0; t < e.length; t++) {
          lightGallery(e[t], { selector: ".cs-gallery-item", download: !1, videojs: !0, youtubePlayerParams: { modestbranding: 1, showinfo: 0, rel: 0 }, vimeoPlayerParams: { byline: 0, portrait: 0 } });
        }
      }

      tns({
        container: '.cs-carousel-inner-two',
        controlsText: ['<i class="cxi-arrow-left"></i>', '<i class="cxi-arrow-right"></i>'],
        navPosition: "top",
        controlsPosition: "top",
        mouseDrag: !0,
        speed: 600,
        autoplayHoverPause: !0,
        autoplayButtonOutput: !1,
        nav: false,
        controlsContainer: "#custom-controls-related",
        responsive: {
          0: {
            items: 1,
            gutter: 20
          },
          480: {
            items: 2,
            gutter: 24
          },
          700: {
            items: 3,
            gutter: 24
          },
          1100: {
            items: 4,
            gutter: 30
          }
        }
      });

    }, 500);

  }

  addCartProduct(){
    console.log(this.guestProduct.stock);
    if(this.dataCart.variedad){
      if(this.dataCart.cantidad >= 1){
        if(this.dataCart.cantidad <= this.guestProduct.stock){
          let data = {
            producto: this.guestProduct._id,
            cliente: localStorage.getItem("_id"),
            cantidad: this.dataCart.cantidad,
            variedad: this.dataCart.variedad
          }
  
          this.loadBtn = true;
  
          this._clienteService.addClientCart(data, this.token).subscribe(
            response => {
              if(response.data == undefined) {
                iziToast.error({
                  title: 'Error:',
                  position: 'topRight',
                  message: 'Este producto ya fue ingresado al carrito de compras'
                });
              }else{
                iziToast.success({
                  title: 'Exito:',
                  position: 'topRight',
                  message: 'El producto ha sido agregado correctamente al carrito'
                });
                this.socket.emit('addCart', {data: true});
              }
              this.loadBtn = false;
            }
          );
        }else{
          iziToast.error({
            title: 'Error:',
            position: 'topRight',
            message: 'La maxima cantidad disponible es de : <strong><u>' + this.guestProduct.stock + '</u></strong>'
          });
        }
      }else{
        iziToast.error({
          title: 'Error:',
          position: 'topRight',
          message: 'La cantidad ingresada no es valida'
        });
      }
    }else{
      iziToast.error({
        title: 'Error:',
        position: 'topRight',
        message: 'Debe seleccionar una variedad de producto'
      });
    }
  }



}

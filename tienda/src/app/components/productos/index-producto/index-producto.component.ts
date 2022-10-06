import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ClienteService } from 'src/app/services/cliente.service';
import { global } from 'src/app/services/global';

declare var noUiSlider: any;
declare var $: any;

@Component({
  selector: 'app-index-producto',
  templateUrl: './index-producto.component.html',
  styleUrls: ['./index-producto.component.css']
})

export class IndexProductoComponent implements OnInit {

  public categories: any = {};
  public filterCategory = "";
  public products: Array<any> = [];
  public filtro: any = "";
  public loadData = true;
  public url: string;
  public categoryFilter = "todos";
  public routeCategory: any;
  public min: number = 0;
  public max: number = 6000000;
  public page: number = 1;
  public pageSize: number = 12;
  public sortBy: any = 'Defecto';

  constructor(
    private _clienteService: ClienteService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {
    this.initData();
    this.url = global.url;
  }

  ngOnInit(): void {
    this.priceSlider();
  }

  initData() {
    this._clienteService.fetchCategories().subscribe(
      response => {
        this.categories = response.data;
      }
    );

    this._route.params.subscribe(
      params => {
        this.routeCategory = params['categoria'];

        if (this.routeCategory) {
          this._clienteService.fetchProducts('').subscribe(
            response => {
              //@ts-ignore
              this.products = response.data;
              this.products = this.products.filter(product => product.categoria.toLowerCase() == this.routeCategory);
              this.loadData = false;
            }
          );
        } else {
          this._clienteService.fetchProducts('').subscribe(
            response => {
              //@ts-ignore
              this.products = response.data;
              this.loadData = false;
            }
          );
        }
      }
    );
  }

  priceSlider(){
    var slider: any = document.getElementById('slider');

    noUiSlider.create(slider, {
      start: [0, 6000000],
      connect: true,
      range: {
        'min': this.min,
        'max': this.max
      },
      tooltips: [true, true],
      pips: {
        mode: 'count',
        values: 6,

      }
    })

    slider.noUiSlider.on('update', function (values: any) {

      $('.cs-range-slider-value-min').val(values[0]);
      $('.cs-range-slider-value-max').val(values[1]);
    });
    $('.noUi-tooltip').css('font-size', '11px');
  }

  filterCategories() {
    if (this.filterCategory) {
      var search = new RegExp(this.filterCategory, 'i');
      this.categories.categorias = this.categories.categorias.filter(
        (item: { titulo: string; }) => search.test(item.titulo)
      );
    } else {
      this.initData();
    }
  }

  filterProduct() {
    this._clienteService.fetchProducts(this.filtro).subscribe(
      response => {
        //@ts-ignore
        this.products = response.data;
        this.loadData = false;
      },
      error => {

      }
    );

  }

  priceFilter() {
    this._clienteService.fetchProducts(this.filtro).subscribe(
      response => {
        //@ts-ignore
        this.products = response.data;

        let min = parseInt($('.cs-range-slider-value-min').val());
        let max = parseInt($('.cs-range-slider-value-max').val());

        this.products = this.products.filter((product) => {
          return product.precio >= min && product.precio <= max;
        });

        this.loadData = false;

      }
    );

  }

  searchByCategory() {
    if (this.categoryFilter == 'todos') {
      this._clienteService.fetchProducts(this.filtro).subscribe(
        response => {
          //@ts-ignore
          this.products = response.data;
          this.loadData = false;
        }
      );
    } else {

      this._clienteService.fetchProducts(this.filtro).subscribe(
        response => {
          //@ts-ignore
          this.products = response.data;
          this.products = this.products.filter(product => product.categoria == this.categoryFilter);

          this.loadData = false;
        }
      );
    }
  }

  resetProducts() {
    this._router.navigate(['productos']);
    this.filtro = '';
    this.categoryFilter = "todos";
    this._clienteService.fetchProducts('').subscribe(
      response => {
        //@ts-ignore
        this.products = response.data;
        this.loadData = false;
      }
    );
  }

  orderItemsBy(){
    if(this.sortBy == 'Defecto'){
      this._clienteService.fetchProducts('').subscribe(
        response => {
          //@ts-ignore
          this.products = response.data;
          this.loadData = false;
        }
      );
    }else if(this.sortBy == 'Popularidad'){
      this.products.sort(function(a: any, b: any){
        if(a.nventas < b.nventas){
          return 1;
        }else if(a.nventas > b.nvevtas){
          return -1;
        }else{
          return 0;
        }
      });
    }else if(this.sortBy == 'hlprecio'){
      this.products.sort(function(a: any, b: any){
        if(a.precio < b.precio){
          return 1;
        }else if(a.precio > b.precio){
          return -1;
        }else{
          return 0;
        }
      });
    }else if(this.sortBy == 'lhprecio'){
      this.products.sort(function(a: any, b: any){
        if(a.precio > b.precio){
          return 1;
        }else if(a.precio < b.precio){
          return -1;
        }else{
          return 0;
        }
      });
    }else if(this.sortBy == 'azOrder'){
      this.products.sort(function(a: any, b: any){
        if(a.titulo > b.titulo){
          return 1;
        }else if(a.titulo < b.titulo){
          return -1;
        }else{
          return 0;
        }
      });
    }else if(this.sortBy == 'zaOrder'){
      this.products.sort(function(a: any, b: any){
        if(a.titulo < b.titulo){
          return 1;
        }else if(a.titulo > b.titulo){
          return -1;
        }else{
          return 0;
        }
      });
    }


  }

}

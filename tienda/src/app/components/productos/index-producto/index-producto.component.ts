import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ClienteService } from 'src/app/services/cliente.service';
import { global } from 'src/app/services/global';

declare var noUiSlider: any;
declare var $:any;

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

  constructor(
    private _clienteService: ClienteService
  ) { 
    this.initData();
    this.url = global.url;
  }

  ngOnInit(): void {

    var slider : any = document.getElementById('slider');

    noUiSlider.create(slider, {
        start: [0, 6000000],
        connect: true,
        range: {
            'min': 0,
            'max': 6000000
        },
        tooltips: [true,true],
        pips: {
          mode: 'count', 
          values: 6,
          
        }
    })

    slider.noUiSlider.on('update', function (values:any) {

        $('.cs-range-slider-value-min').val(values[0]);
        $('.cs-range-slider-value-max').val(values[1]);
    });
    $('.noUi-tooltip').css('font-size','11px');

  }

  initData() {
    this._clienteService.fetchCategories().subscribe(
      response => {
        this.categories = response.data;
      },
      error => {
        console.log(error);
      }
    );

    this._clienteService.fetchProducts(this.filtro).subscribe(
        response => {
          //@ts-ignore
          this.products = response.data;
          this.loadData =  false;
        },
        error => {

        }
    );
  }

  filterCategories(){
    if(this.filterCategory){
      var search = new RegExp(this.filterCategory, 'i');
      this.categories.categorias = this.categories.categorias.filter(
        (        item: { titulo: string; }) => search.test(item.titulo)
      );
    }else{
      this.initData();
    }
  }

  filterProduct(){
    this._clienteService.fetchProducts(this.filtro).subscribe(
      response => {
        //@ts-ignore
        this.products = response.data;
        this.loadData =  false;
      },
      error => {

      }
    );

  }

  priceFilter(){
    this._clienteService.fetchProducts(this.filtro).subscribe(
      response => {
        //@ts-ignore
        this.products = response.data;

        console.log(this.products);
        
        let min = parseInt($('.cs-range-slider-value-min').val());
        let max = parseInt($('.cs-range-slider-value-max').val());
    
        this.products = this.products.filter((product) => {
          return product.precio >= min && product.precio <= max;
        });

      }
  );
   
  }

  searchByCategory(){
    console.log(this.categoryFilter);
    if(this.categoryFilter == 'todos'){
      this._clienteService.fetchProducts(this.filtro).subscribe(
        response => {
          //@ts-ignore
          this.products = response.data;
          this.loadData =  false;
        }
      );
    }else{

      this._clienteService.fetchProducts(this.filtro).subscribe(
        response => {
          //@ts-ignore
          this.products = response.data;
          this.products = this.products.filter((product) => {
            return product.categoria == this.categoryFilter;
          });
        }
      );
    }
  }

}

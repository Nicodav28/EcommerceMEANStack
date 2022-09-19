import { Component, OnInit } from '@angular/core';
import { ClienteService } from 'src/app/services/cliente.service';

declare var noUiSlider: any;
declare var $:any;
@Component({
  selector: 'app-index-producto',
  templateUrl: './index-producto.component.html',
  styleUrls: ['./index-producto.component.css']
})
export class IndexProductoComponent implements OnInit {
  
  public categories: any = {};
  constructor(
    private _clienteService: ClienteService
  ) { 
    this._clienteService.fetchCategories().subscribe(
      response => {
        this.categories = response.data;
        console.log(this.categories)
      },
      error => {
        console.log(error);
      }
    );
  }

  ngOnInit(): void {

    var slider : any = document.getElementById('slider');

    noUiSlider.create(slider, {
        start: [0, 1000],
        connect: true,
        range: {
            'min': 0,
            'max': 1000
        },
        tooltips: [true,true],
        pips: {
          mode: 'count', 
          values: 5,
          
        }
    })

    slider.noUiSlider.on('update', function (values:any) {

        $('.cs-range-slider-value-min').val(values[0]);
        $('.cs-range-slider-value-max').val(values[1]);
    });
    $('.noUi-tooltip').css('font-size','11px');

  }

}

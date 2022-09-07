import { Component, OnInit } from '@angular/core';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  
  public token: any = undefined;
  public id: any;
  public userData: any = undefined;
  public userLc: any = {};

  constructor(
    private _clientService: ClienteService
  ) { 
    this.token = localStorage.getItem('token');
    this.id = localStorage.getItem('_id');

    if(this.token != undefined) {
      this._clientService.fetchClientIdGuest(this.id, this.token).subscribe(
        response => {
          this.userData = response.data;
          localStorage.setItem('user_data', JSON.stringify(this.userData));
        },
        error => {
          console.log(error);
          this.userData = undefined;
        }
      );
    }
  }

  ngOnInit(): void {
  }

  ngDoCheck(){
    if(localStorage.getItem('user_data') && this.token != undefined){
      this.userLc = JSON.parse(localStorage.getItem('user_data') || '{}');
    }else{
      this.userLc = undefined;
    }
  }

}

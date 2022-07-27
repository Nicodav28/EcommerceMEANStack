import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from 'src/app/service/admin.service';
import { ClienteService } from 'src/app/service/cliente.service';

@Component({
  selector: 'app-edit-cliente',
  templateUrl: './edit-cliente.component.html',
  styleUrls: ['./edit-cliente.component.css']
})
export class EditClienteComponent implements OnInit {

  public clientData: any = {};
  public id: any;
  public token: any;

  constructor(
    private _route: ActivatedRoute,
    private _clienteService: ClienteService,
    private _adminService: AdminService
  ) {
    this.token = _adminService.getToken();
   }

  ngOnInit(): void {
    this._route.params.subscribe(
      params=>{
        this.id = params['id'];
        this._clienteService.fetchClientId(this.id, this.token).subscribe(
          response => {
            console.log(response);
            if(response.data == undefined){

            }else{
              this.clientData = response.data;
            }
          },
          error => {
            console.log(error);
          }
        );
      }
    )
  }

  clientUpdate(updateForm: any){

  }
}

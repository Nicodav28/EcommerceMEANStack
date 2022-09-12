import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ClienteService } from '../services/cliente.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private _clientService: ClienteService,
    private _router: Router
  ){

  }
  canActivate():any{
    if(!this._clientService.checkAuth()){
      this._router.navigate(['/login']);
      return false;
    }
    
    return true;
  }
  
}

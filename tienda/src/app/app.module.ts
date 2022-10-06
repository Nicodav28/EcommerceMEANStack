import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { routing } from './app.routing';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { NavComponent } from './components/nav/nav.component';
import { FooteerComponent } from './components/footeer/footeer.component';
import { LoginComponent } from './components/login/login.component';
import { PerfilComponent } from './components/usuario/perfil/perfil.component';
import { SidebarComponent } from './components/usuario/sidebar/sidebar.component';
import { IndexProductoComponent } from './components/productos/index-producto/index-producto.component';
import {NgbPaginationModule, NgbAlertModule} from '@ng-bootstrap/ng-bootstrap';
import { ShowProductoComponent } from './components/productos/show-producto/show-producto.component';

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    NavComponent,
    FooteerComponent,
    LoginComponent,
    PerfilComponent,
    SidebarComponent,
    IndexProductoComponent,
    ShowProductoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    routing,
    NgbPaginationModule, 
    NgbAlertModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

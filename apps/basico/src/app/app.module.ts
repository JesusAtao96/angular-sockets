import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { environment } from '../environments/environment';

// Sockets
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
const config: SocketIoConfig = { url: environment.wsUrl, options: {} };


import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import { ChatComponent } from './components/chat/chat.component';
import { ListaUsuariosComponent } from './components/lista-usuarios/lista-usuarios.component';
import { LoginComponent } from './pages/login/login.component';
import { MensajesComponent } from './pages/mensajes/mensajes.component';

import { AppRoutingModule } from './app-routing.module';
import { PaginaUnoComponent } from './pages/pagina-uno/pagina-uno.component';
import { PaginaDosComponent } from './pages/pagina-dos/pagina-dos.component';

@NgModule({
  declarations: [AppComponent, FooterComponent, ChatComponent, ListaUsuariosComponent, LoginComponent, MensajesComponent, PaginaUnoComponent, PaginaDosComponent],
  imports: [BrowserModule, SocketIoModule.forRoot(config), FormsModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

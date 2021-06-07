import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { WebsocketService } from '../../services/websocket.service';

@Component({
  selector: 'angular-sockets-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  nombre = '';

  constructor(private router: Router, public wsService: WebsocketService) {}

  ingresar() {
    console.log('Nombre', this.nombre);
    this.wsService.loginWS(this.nombre)
      .then(() => {
        this.router.navigateByUrl('/mensajes');
      });
  }

}

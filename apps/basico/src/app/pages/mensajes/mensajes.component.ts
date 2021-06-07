import { Component } from '@angular/core';
import { WebsocketService } from '../../services/websocket.service';

@Component({
  selector: 'angular-sockets-mensajes',
  templateUrl: './mensajes.component.html',
  styleUrls: ['./mensajes.component.scss']
})
export class MensajesComponent {

  constructor(public wsService: WebsocketService) { }

  salir() {
    this.wsService.logoutWS();
  }
}

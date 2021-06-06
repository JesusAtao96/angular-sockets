import { Component } from '@angular/core';
import { WebsocketService } from './services/websocket.service';

@Component({
  selector: 'angular-sockets-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  constructor(public wsService: WebsocketService) {}

}

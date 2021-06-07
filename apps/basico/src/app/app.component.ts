import { Component, OnInit } from '@angular/core';
import { WebsocketService } from './services/websocket.service';
import { ChatService } from './services/chat.service';
import { Router } from '@angular/router';

@Component({
  selector: 'angular-sockets-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  constructor(public wsService: WebsocketService, public chatService: ChatService, private router: Router) {}

  ngOnInit() {
    this.chatService.getMessagesPrivate().subscribe((msg) => {
      console.log('getMessagesPrivate', msg);
    });

    this.chatService.cambiarPagina().subscribe((data: any) => {
      switch (data.pagina) {
        case 'pagina-1':
          this.router.navigateByUrl('/pagina-uno');
          break;
        case 'pagina-2':
          this.router.navigateByUrl('/pagina-dos');
          break;
        default:
          this.router.navigateByUrl('/mensajes');
          break;
      }
    });
  }

}

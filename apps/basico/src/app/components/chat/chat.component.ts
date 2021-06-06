import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'angular-sockets-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatComponent implements OnInit, OnDestroy {
  texto!: string;
  mensajeSubscription: Subscription = new Subscription();
  elemento!: HTMLElement;

  mensajes: any[] = [];

  constructor(private chatService: ChatService, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.elemento = document.getElementById('chat-mensajes') as HTMLElement;
    this.mensajeSubscription = this.chatService.getMessages().subscribe(msg => {
      this.mensajes.push(msg);
      setTimeout(() => {
        this.elemento.scrollTop = this.elemento.scrollHeight;
      }, 50);
      this.cdr.markForCheck();
    });
  }

  ngOnDestroy() {
    this.mensajeSubscription.unsubscribe();
  }

  enviar() {
    if (this.texto.trim().length === 0) {
      this.texto = '';
      return;
    }

    this.chatService.sendMessage(this.texto);
    this.texto = '';
  }

}

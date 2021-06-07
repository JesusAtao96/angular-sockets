import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'angular-sockets-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.scss']
})
export class ListaUsuariosComponent implements OnInit {
  usuariosActivosObs!: Observable<any>;

  constructor(public chatService: ChatService) { }

  ngOnInit() {
    this.usuariosActivosObs = this.chatService.getUsuariosActivos();

    // Emitir el obtenerUsuarios
    this.chatService.emitirUsuariosActivos();
  }

  cambiarPagina(usuario: any, pagina: string) {
    this.chatService.emitirPagina(usuario, pagina);
  }

}

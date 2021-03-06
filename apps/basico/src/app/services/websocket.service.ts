import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Socket } from 'ngx-socket-io';
import { Usuario } from '../classes/usuario';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  public socketStatus = false;
  public usuario!: Usuario | null; // mejor si es private

  constructor(private router: Router,private socket: Socket) {
    this.cargarStorage();
    this.checkStatus();
  }

  checkStatus() {
    this.socket.on('connect', () => {
      console.log('Conectado al servidor');
      this.socketStatus = true;
      this.cargarStorage();
    });

    this.socket.on('disconnect', () => {
      console.log('Desconectado al servidor');
      this.socketStatus = false;
    });
  }

  emit(evento: string, payload?: any, callback?: (param: any) => void) {
    console.log('Emitiendo', evento);

    // emit('EVENTO', payload, callback)
    this.socket.emit(evento, payload, callback);
  }

  listen(evento: string) {
    return this.socket.fromEvent(evento);
  }

  loginWS(nombre: string) {
    return new Promise((resolve: (value?: any) => void, reject) => {
      this.emit('configurar-usuario', { nombre }, resp => {
        this.usuario = new Usuario(nombre);
        this.guardarStorage();

        resolve();
      });
    });
  }

  logoutWS() {
    this.usuario = null;
    localStorage.removeItem('usuario');

    const payload = { nombre: 'sin-nombre' }

    this.emit('configurar-usuario', payload, () => null);
    this.router.navigateByUrl('/login');
  }

  getUsuario() {
    return this.usuario;
  }

  guardarStorage() {
    localStorage.setItem('usuario', JSON.stringify(this.usuario));
  }

  cargarStorage() {
    if (localStorage.getItem('usuario')) {
      const usuario: Usuario = JSON.parse(localStorage.getItem('usuario') as string);
      this.usuario = new Usuario(usuario.nombre);
      this.loginWS(this.usuario.nombre);
    }
  }
}

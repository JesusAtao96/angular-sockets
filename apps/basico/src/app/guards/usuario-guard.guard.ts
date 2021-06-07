import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { WebsocketService } from '../services/websocket.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioGuard implements CanActivate {
  constructor(public router: Router, public wsService: WebsocketService) {}

  canActivate(): boolean {
    if (!this.wsService.getUsuario()) {
      this.router.navigateByUrl('/login');
      return false;
    }

    return true;
  }

}

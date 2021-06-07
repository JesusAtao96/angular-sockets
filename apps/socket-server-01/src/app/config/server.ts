import * as express from 'express';
import { Server as SocketServer, Socket } from 'socket.io';
import { Server as HttpServer } from 'http';

import * as socketActions from '../sockets/sockets';

import { environment } from '../../environments/environment';

export default class Server {
  private static _instance: Server;

  public app: express.Application;
  public port: number;

  public io: SocketServer;
  private httpServer: HttpServer;

  private constructor() {
    this.app = express();
    this.port = environment.port;

    this.httpServer = new HttpServer(this.app);
    this.io = new SocketServer(this.httpServer, {
      cors: {
        origin: "*", // https://example.com
      }
    });

    this.escucharSockets();
  }

  public static get instance() {
    return this._instance || (this._instance = new this());
  }

  private escucharSockets() {
    console.log('Escuchando conexiones - sockets');
    this.io.on('connection', (cliente: Socket) => {
      console.log(cliente.id ,'Cliente conectado');
      // Conectar cliente
      socketActions.conectarCliente(cliente);

      // Configurar Usuario
      socketActions.configurarUsuario(cliente, this.io);

      // Obtener Usuarios Activos
      socketActions.obtenerUsuarios(cliente, this.io);

      // Mensajes
      socketActions.mensaje(cliente, this.io);

      // Escuchar Cambio de página
      socketActions.cambioPagina(cliente, this.io);

      // Desconectar
      socketActions.desconectar(cliente, this.io);
    })
  }

  start(callback: () => void) {
    this.httpServer.listen(this.port, callback);
  }
}

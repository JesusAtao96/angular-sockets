import { Socket, Server } from 'socket.io';
import { UsuariosLista } from '../config/usuario-lista';
import { Usuario } from '../config/usuario';

export const usuariosConectados = new UsuariosLista();

export const conectarCliente = (cliente: Socket) => {
  const usuario = new Usuario(cliente.id);
  usuariosConectados.agregar(usuario);
}

export const desconectar = (cliente: Socket, io: Server) => {
  cliente.on('disconnect', () => {
    console.log('Cliente desconectado');
    usuariosConectados.borrarUsuario(cliente.id);
    io.emit('usuarios-activos', usuariosConectados.getLista());
  })
};

// Escuchar mensajes
export const mensaje = (cliente: Socket, io: Server) => {
  cliente.on('mensaje', (payload: { de: string, cuerpo: string }) => {
    console.log('Mensaje recibido', payload);

    io.emit('mensaje-nuevo', payload);
  })
}

// Configurar usuario
export const configurarUsuario = (cliente: Socket, io: Server) => {
  cliente.on('configurar-usuario', (payload: { nombre: string }, callback: (data: any) => void) => {

    usuariosConectados.actualizarNombre(cliente.id, payload.nombre);

    io.emit('usuarios-activos', usuariosConectados.getLista());

    callback({
      ok: true,
      mensaje: `Usuario ${ payload.nombre }, configurado`
    });
  })
}

// Obtener usuarios
export const obtenerUsuarios = (cliente: Socket, io: Server) => {
  cliente.on('obtener-usuarios', () => {
    io.to(cliente.id).emit('usuarios-activos', usuariosConectados.getLista());
  })
}

// Escuchar cambio de pagina
export const cambioPagina = (cliente: Socket, io: Server) => {
  cliente.on('emitir-pagina', (payload: { usuario: Usuario, pagina: string }) => {
    console.log('Emitir pagina', payload);

    io.to(payload.usuario.id).emit('cambiar-pagina', payload);
  })
}

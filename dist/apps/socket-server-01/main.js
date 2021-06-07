(function(e, a) { for(var i in a) e[i] = a[i]; }(exports, /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./apps/socket-server-01/src/app/config/server.ts":
/*!********************************************************!*\
  !*** ./apps/socket-server-01/src/app/config/server.ts ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const express = __webpack_require__(/*! express */ "express");
const socket_io_1 = __webpack_require__(/*! socket.io */ "socket.io");
const http_1 = __webpack_require__(/*! http */ "http");
const socketActions = __webpack_require__(/*! ../sockets/sockets */ "./apps/socket-server-01/src/app/sockets/sockets.ts");
const environment_1 = __webpack_require__(/*! ../../environments/environment */ "./apps/socket-server-01/src/environments/environment.ts");
class Server {
    constructor() {
        this.app = express();
        this.port = environment_1.environment.port;
        this.httpServer = new http_1.Server(this.app);
        this.io = new socket_io_1.Server(this.httpServer, {
            cors: {
                origin: "*", // https://example.com
            }
        });
        this.escucharSockets();
    }
    static get instance() {
        return this._instance || (this._instance = new this());
    }
    escucharSockets() {
        console.log('Escuchando conexiones - sockets');
        this.io.on('connection', (cliente) => {
            console.log(cliente.id, 'Cliente conectado');
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
        });
    }
    start(callback) {
        this.httpServer.listen(this.port, callback);
    }
}
exports.default = Server;


/***/ }),

/***/ "./apps/socket-server-01/src/app/config/usuario-lista.ts":
/*!***************************************************************!*\
  !*** ./apps/socket-server-01/src/app/config/usuario-lista.ts ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuariosLista = void 0;
class UsuariosLista {
    constructor() {
        this.lista = [];
    }
    // constructor() {}
    // Agregar un usuario
    agregar(usuario) {
        this.lista.push(usuario);
        console.log('this.lista', this.lista);
        return usuario;
    }
    actualizarNombre(id, nombre) {
        for (const usuario of this.lista) {
            if (usuario.id === id) {
                usuario.nombre = nombre;
                break;
            }
        }
        console.log('Actualizando usuario', this.lista);
    }
    // Obtener lista de usuarios
    getLista() {
        return this.lista.filter(usuario => usuario.nombre !== 'sin-nombre');
    }
    // obtener usuario
    getUsuario(id) {
        return this.lista.find(usuario => usuario.id === id);
    }
    // Obtener usuarios en una sala en particular
    getUsuariosEnSala(sala) {
        return this.lista.filter(usuario => usuario.sala === sala);
    }
    // Borrar usuario
    borrarUsuario(id) {
        const tempUsuario = this.getUsuario(id);
        this.lista = this.lista.filter(usuario => usuario.id !== id);
        console.log('borrarUsuario', this.lista);
        return tempUsuario;
    }
}
exports.UsuariosLista = UsuariosLista;


/***/ }),

/***/ "./apps/socket-server-01/src/app/config/usuario.ts":
/*!*********************************************************!*\
  !*** ./apps/socket-server-01/src/app/config/usuario.ts ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Usuario = void 0;
class Usuario {
    constructor(id) {
        this.id = id;
        this.nombre = 'sin-nombre';
        this.sala = 'sin-sala';
    }
}
exports.Usuario = Usuario;


/***/ }),

/***/ "./apps/socket-server-01/src/app/routes/router.ts":
/*!********************************************************!*\
  !*** ./apps/socket-server-01/src/app/routes/router.ts ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __webpack_require__(/*! express */ "express");
const server_1 = __webpack_require__(/*! ../config/server */ "./apps/socket-server-01/src/app/config/server.ts");
const sockets_1 = __webpack_require__(/*! ../sockets/sockets */ "./apps/socket-server-01/src/app/sockets/sockets.ts");
exports.router = express_1.Router();
exports.router.get('/mensajes', (req, res) => {
    res.json({
        ok: true,
        mensaje: 'Todo esta bien!!!'
    });
});
exports.router.post('/mensajes', (req, res) => {
    const { cuerpo, de } = req.body;
    const payload = {
        de,
        cuerpo
    };
    const server = server_1.default.instance;
    server.io.emit('mensaje-nuevo', payload);
    res.json({
        ok: true,
        cuerpo,
        de
    });
});
exports.router.post('/mensajes/:id', (req, res) => {
    const { cuerpo, de } = req.body;
    const { id } = req.params;
    const payload = {
        de,
        cuerpo
    };
    const server = server_1.default.instance;
    server.io.in(id).emit('mensaje-privado', payload);
    res.json({
        ok: true,
        cuerpo,
        de,
        id
    });
});
// Servicio para obtener todos los IDs de los usuarios
exports.router.get('/usuarios', (req, res) => {
    const server = server_1.default.instance;
    server.io.allSockets().then((clientes) => {
        res.json({
            ok: true,
            // clientes
            clientes: Array.from(clientes)
        });
    }).catch((err) => {
        res.json({
            ok: false,
            err
        });
    });
});
// Obtener usuarios y sus nombres
exports.router.get('/usuarios/detalle', (req, res) => {
    res.json({
        ok: true,
        clientes: sockets_1.usuariosConectados.getLista()
    });
});
exports.default = exports.router;


/***/ }),

/***/ "./apps/socket-server-01/src/app/sockets/sockets.ts":
/*!**********************************************************!*\
  !*** ./apps/socket-server-01/src/app/sockets/sockets.ts ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.cambioPagina = exports.obtenerUsuarios = exports.configurarUsuario = exports.mensaje = exports.desconectar = exports.conectarCliente = exports.usuariosConectados = void 0;
const usuario_lista_1 = __webpack_require__(/*! ../config/usuario-lista */ "./apps/socket-server-01/src/app/config/usuario-lista.ts");
const usuario_1 = __webpack_require__(/*! ../config/usuario */ "./apps/socket-server-01/src/app/config/usuario.ts");
exports.usuariosConectados = new usuario_lista_1.UsuariosLista();
const conectarCliente = (cliente) => {
    const usuario = new usuario_1.Usuario(cliente.id);
    exports.usuariosConectados.agregar(usuario);
};
exports.conectarCliente = conectarCliente;
const desconectar = (cliente, io) => {
    cliente.on('disconnect', () => {
        console.log('Cliente desconectado');
        exports.usuariosConectados.borrarUsuario(cliente.id);
        io.emit('usuarios-activos', exports.usuariosConectados.getLista());
    });
};
exports.desconectar = desconectar;
// Escuchar mensajes
const mensaje = (cliente, io) => {
    cliente.on('mensaje', (payload) => {
        console.log('Mensaje recibido', payload);
        io.emit('mensaje-nuevo', payload);
    });
};
exports.mensaje = mensaje;
// Configurar usuario
const configurarUsuario = (cliente, io) => {
    cliente.on('configurar-usuario', (payload, callback) => {
        exports.usuariosConectados.actualizarNombre(cliente.id, payload.nombre);
        io.emit('usuarios-activos', exports.usuariosConectados.getLista());
        callback({
            ok: true,
            mensaje: `Usuario ${payload.nombre}, configurado`
        });
    });
};
exports.configurarUsuario = configurarUsuario;
// Obtener usuarios
const obtenerUsuarios = (cliente, io) => {
    cliente.on('obtener-usuarios', () => {
        io.to(cliente.id).emit('usuarios-activos', exports.usuariosConectados.getLista());
    });
};
exports.obtenerUsuarios = obtenerUsuarios;
// Escuchar cambio de pagina
const cambioPagina = (cliente, io) => {
    cliente.on('emitir-pagina', (payload) => {
        console.log('Emitir pagina', payload);
        io.to(payload.usuario.id).emit('cambiar-pagina', payload);
    });
};
exports.cambioPagina = cambioPagina;


/***/ }),

/***/ "./apps/socket-server-01/src/environments/environment.ts":
/*!***************************************************************!*\
  !*** ./apps/socket-server-01/src/environments/environment.ts ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.environment = void 0;
exports.environment = {
    production: false,
    port: Number(process.env.PORT) || 5000
};


/***/ }),

/***/ "./apps/socket-server-01/src/main.ts":
/*!*******************************************!*\
  !*** ./apps/socket-server-01/src/main.ts ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const express = __webpack_require__(/*! express */ "express");
const server_1 = __webpack_require__(/*! ./app/config/server */ "./apps/socket-server-01/src/app/config/server.ts");
const router_1 = __webpack_require__(/*! ./app/routes/router */ "./apps/socket-server-01/src/app/routes/router.ts");
const cors = __webpack_require__(/*! cors */ "cors");
const server = server_1.default.instance;
server.app.use(express.urlencoded({ extended: true }));
server.app.use(express.json());
// CORS
server.app.use(cors({ origin: true, credentials: true }));
// Rutas de servicios
server.app.use('/', router_1.router);
server.start(() => {
    console.log(`Servidor corriendo en el puerto ${server.port}`);
});
server.app.on('error', console.error);
/* app.get('/api', (req, res) => {
  res.send({ message: 'Welcome to socket-server-01!' });
});

const port = process.env.port || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error); */


/***/ }),

/***/ 0:
/*!*************************************************!*\
  !*** multi ./apps/socket-server-01/src/main.ts ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\Proyectos\udemy\angular-sockets\angular-sockets\apps\socket-server-01\src\main.ts */"./apps/socket-server-01/src/main.ts");


/***/ }),

/***/ "cors":
/*!***********************!*\
  !*** external "cors" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("cors");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("http");

/***/ }),

/***/ "socket.io":
/*!****************************!*\
  !*** external "socket.io" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("socket.io");

/***/ })

/******/ })));
//# sourceMappingURL=main.js.map
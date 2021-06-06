/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import * as express from 'express';
import Server from './app/config/server';
import { router } from './app/routes/router';
import * as cors from 'cors';

const server = Server.instance;
server.app.use(express.urlencoded({ extended: true }));
server.app.use(express.json());

// CORS
server.app.use(cors({ origin: true, credentials: true }));

// Rutas de servicios
server.app.use('/', router);

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

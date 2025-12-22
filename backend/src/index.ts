import { createServer } from 'http';
import { Server } from 'socket.io';
import app from './app.js';
import { config } from './config/index.js';
import { setupPedidoSocket } from './sockets/pedido.socket.js';

const server = createServer(app);

const io = new Server(server, {
  cors: config.cors,
});

// Setup Socket.IO handlers
setupPedidoSocket(io);

server.listen(config.port, () => {
  console.log(`Servidor corriendo en http://localhost:${config.port}`);
  console.log(`Swagger UI disponible en http://localhost:${config.port}/api-docs`);
});

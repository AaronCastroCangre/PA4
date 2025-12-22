const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

app.use(cors());
app.use(express.json());

let pedidos = [];
let pedidoIdCounter = 1;
function leerMesas() {
  try {
    const data = fs.readFileSync(path.join(__dirname, 'mesas.json'), 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error al leer mesas:', error);
    return [];
  }
}

app.get('/api/pedidos', (req, res) => {
  res.json(pedidos);
});

app.get('/api/mesas', (req, res) => {
  const mesas = leerMesas();
  res.json(mesas);
});

io.on('connection', (socket) => {
  console.log('Cliente conectado:', socket.id);

  socket.emit('pedidos-iniciales', pedidos);

  socket.on('nuevo-pedido', (data) => {
    const mesas = leerMesas();
    const mesa = mesas.find(m => m.numeroMesa === parseInt(data.mesa));
    
    const nuevoPedido = {
      id: pedidoIdCounter++,
      mesa: data.mesa,
      nombreCliente: mesa ? mesa.cliente : 'Cliente',
      platos: data.platos,
      estado: 'Pendiente',
      mozoNombre: data.mozoNombre || 'Mozo',
      fecha: new Date().toISOString()
    };

    pedidos.push(nuevoPedido);
    io.emit('pedido-creado', nuevoPedido);
    console.log('Nuevo pedido creado:', nuevoPedido);
  });

  socket.on('cambiar-estado', (data) => {
    const pedido = pedidos.find(p => p.id === data.pedidoId);
    
    if (pedido) {
      pedido.estado = data.nuevoEstado;
      io.emit('estado-actualizado', {
        pedidoId: data.pedidoId,
        nuevoEstado: data.nuevoEstado,
        pedido: pedido
      });
      console.log(`Pedido ${data.pedidoId} actualizado a: ${data.nuevoEstado}`);
    }
  });

  socket.on('disconnect', () => {
    console.log('Cliente desconectado:', socket.id);
  });
});

const PORT = process.env.PORT || 3006;
server.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
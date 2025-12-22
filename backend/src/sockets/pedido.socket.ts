import type { Server, Socket } from 'socket.io';
import { nuevoPedidoSchema, cambiarEstadoSchema } from '../schemas/index.js';
import { pedidoService } from '../services/pedido.service.js';
import type { NuevoPedidoInput, CambiarEstadoInput } from '../types/index.js';

export function setupPedidoSocket(io: Server): void {
  io.on('connection', (socket: Socket) => {
    console.log('Cliente conectado:', socket.id);

    // Send initial pedidos
    socket.emit('pedidos-iniciales', pedidoService.getAll());

    // Handle new pedido
    socket.on('nuevo-pedido', (data: unknown) => {
      const result = nuevoPedidoSchema.safeParse(data);

      if (!result.success) {
        socket.emit('error', {
          event: 'nuevo-pedido',
          message: 'Datos inválidos',
          details: result.error.errors,
        });
        return;
      }

      const input: NuevoPedidoInput = result.data;
      const pedido = pedidoService.create(input);

      io.emit('pedido-creado', pedido);
      console.log('Nuevo pedido creado:', pedido);
    });

    // Handle estado change
    socket.on('cambiar-estado', (data: unknown) => {
      const result = cambiarEstadoSchema.safeParse(data);

      if (!result.success) {
        socket.emit('error', {
          event: 'cambiar-estado',
          message: 'Datos inválidos',
          details: result.error.errors,
        });
        return;
      }

      const input: CambiarEstadoInput = result.data;
      const pedido = pedidoService.updateEstado(input.pedidoId, input.nuevoEstado);

      if (!pedido) {
        socket.emit('error', {
          event: 'cambiar-estado',
          message: 'Pedido no encontrado',
        });
        return;
      }

      io.emit('estado-actualizado', {
        pedidoId: input.pedidoId,
        nuevoEstado: input.nuevoEstado,
        pedido,
      });

      console.log(`Pedido ${input.pedidoId} actualizado a: ${input.nuevoEstado}`);
    });

    socket.on('disconnect', () => {
      console.log('Cliente desconectado:', socket.id);
    });
  });
}

import { pedidoRepository } from '../repositories/pedido.repository.js';
import { mesaService } from './mesa.service.js';
import type { Pedido, NuevoPedidoInput, EstadoPedido } from '../types/index.js';

class PedidoService {
  getAll(): Pedido[] {
    return pedidoRepository.getAll();
  }

  getById(id: number): Pedido | undefined {
    return pedidoRepository.getById(id);
  }

  create(input: NuevoPedidoInput): Pedido {
    const mesaNumero = parseInt(input.mesa, 10);
    const nombreCliente = mesaService.getClienteByMesa(mesaNumero);
    return pedidoRepository.create(input, nombreCliente);
  }

  updateEstado(id: number, estado: EstadoPedido): Pedido | undefined {
    return pedidoRepository.updateEstado(id, estado);
  }

  delete(id: number): boolean {
    return pedidoRepository.delete(id);
  }
}

export const pedidoService = new PedidoService();

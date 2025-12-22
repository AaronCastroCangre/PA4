import type { Pedido, EstadoPedido, NuevoPedidoInput } from '../types/index.js';

class PedidoRepository {
  private pedidos: Pedido[] = [];
  private idCounter = 1;

  getAll(): Pedido[] {
    return [...this.pedidos];
  }

  getById(id: number): Pedido | undefined {
    return this.pedidos.find((p) => p.id === id);
  }

  create(input: NuevoPedidoInput, nombreCliente: string): Pedido {
    const pedido: Pedido = {
      id: this.idCounter++,
      mesa: input.mesa,
      nombreCliente,
      platos: input.platos,
      estado: 'Pendiente',
      mozoNombre: input.mozoNombre || 'Mozo',
      fecha: new Date().toISOString(),
    };

    this.pedidos.push(pedido);
    return pedido;
  }

  updateEstado(id: number, estado: EstadoPedido): Pedido | undefined {
    const pedido = this.pedidos.find((p) => p.id === id);
    if (pedido) {
      pedido.estado = estado;
    }
    return pedido;
  }

  delete(id: number): boolean {
    const index = this.pedidos.findIndex((p) => p.id === id);
    if (index !== -1) {
      this.pedidos.splice(index, 1);
      return true;
    }
    return false;
  }
}

export const pedidoRepository = new PedidoRepository();

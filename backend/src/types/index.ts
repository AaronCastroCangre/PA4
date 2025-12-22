export type EstadoPedido = 'Pendiente' | 'En Preparación' | 'Listo para Servir';

export interface Pedido {
  id: number;
  mesa: string;
  nombreCliente: string;
  platos: string[];
  estado: EstadoPedido;
  mozoNombre: string;
  fecha: string;
}

export interface Mesa {
  id: number;
  numeroMesa: number;
  cliente: string;
  capacidad: number;
  estado: 'ocupada' | 'disponible';
}

export interface NuevoPedidoInput {
  mesa: string;
  platos: string[];
  mozoNombre?: string;
}

export interface CambiarEstadoInput {
  pedidoId: number;
  nuevoEstado: EstadoPedido;
}

export interface EstadoActualizadoResponse {
  pedidoId: number;
  nuevoEstado: EstadoPedido;
  pedido: Pedido;
}

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

export interface NuevoPedidoData {
  mesa: string;
  platos: string[];
  mozoNombre: string;
}

export interface CambiarEstadoData {
  pedidoId: number;
  nuevoEstado: EstadoPedido;
}

export interface EstadoActualizadoData {
  pedidoId: number;
  nuevoEstado: EstadoPedido;
  pedido: Pedido;
}

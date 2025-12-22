import type { Pedido, EstadoPedido } from '../types';

interface PedidoCardProps {
  pedido: Pedido;
  showActions?: boolean;
  onCambiarEstado?: (pedidoId: number, nuevoEstado: EstadoPedido) => void;
}

const estadoColors: Record<EstadoPedido, string> = {
  'Pendiente': 'bg-yellow-100 text-yellow-800 border-yellow-300',
  'En Preparación': 'bg-blue-100 text-blue-800 border-blue-300',
  'Listo para Servir': 'bg-green-100 text-green-800 border-green-300',
};

const estadoBadgeColors: Record<EstadoPedido, string> = {
  'Pendiente': 'bg-yellow-500',
  'En Preparación': 'bg-blue-500',
  'Listo para Servir': 'bg-green-500',
};

export function PedidoCard({ pedido, showActions = false, onCambiarEstado }: PedidoCardProps) {
  return (
    <div className={`rounded-lg border-2 p-4 ${estadoColors[pedido.estado]}`}>
      <div className="flex items-center justify-between mb-3">
        <span className="text-lg font-bold">Mesa {pedido.mesa}</span>
        <span
          className={`px-3 py-1 rounded-full text-white text-sm font-medium ${
            estadoBadgeColors[pedido.estado]
          }`}
        >
          {pedido.estado}
        </span>
      </div>

      {pedido.nombreCliente && (
        <p className="text-sm mb-2">
          <span className="font-medium">Cliente:</span> {pedido.nombreCliente}
        </p>
      )}

      <div className="mb-3">
        <span className="font-medium text-sm">Platos:</span>
        <ul className="list-disc list-inside mt-1">
          {pedido.platos.map((plato, index) => (
            <li key={index} className="text-sm">
              {plato}
            </li>
          ))}
        </ul>
      </div>

      <p className="text-xs text-gray-600 mb-3">
        Pedido #{pedido.id} | Mozo: {pedido.mozoNombre}
      </p>

      {showActions && onCambiarEstado && (
        <div className="flex gap-2 mt-3 pt-3 border-t border-current border-opacity-20">
          {pedido.estado === 'Pendiente' && (
            <button
              onClick={() => onCambiarEstado(pedido.id, 'En Preparación')}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md text-sm font-medium transition-colors"
            >
              Aceptar / En Preparación
            </button>
          )}
          {pedido.estado === 'En Preparación' && (
            <button
              onClick={() => onCambiarEstado(pedido.id, 'Listo para Servir')}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md text-sm font-medium transition-colors"
            >
              Marcar como Listo
            </button>
          )}
          {pedido.estado === 'Listo para Servir' && (
            <span className="flex-1 text-center py-2 px-4 text-green-700 font-medium">
              ✓ Listo
            </span>
          )}
        </div>
      )}
    </div>
  );
}

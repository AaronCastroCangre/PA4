import type { Pedido, EstadoPedido } from '../types';

interface PedidoCardProps {
  pedido: Pedido;
  showActions?: boolean;
  onCambiarEstado?: (pedidoId: number, nuevoEstado: EstadoPedido) => void;
}

const estadoConfig: Record<EstadoPedido, { bg: string; gradient: string; badge: string; border: string }> = {
  'Pendiente': {
    bg: 'bg-retro-yellow/20',
    gradient: 'bg-gradient-retro-yellow',
    badge: 'bg-gradient-retro-yellow',
    border: 'border-retro-yellow',
  },
  'En Preparación': {
    bg: 'bg-retro-blue/20',
    gradient: 'bg-gradient-retro-blue',
    badge: 'bg-gradient-retro-blue',
    border: 'border-retro-blue',
  },
  'Listo para Servir': {
    bg: 'bg-retro-green/20',
    gradient: 'bg-gradient-retro-green',
    badge: 'bg-gradient-retro-green',
    border: 'border-retro-green',
  },
};

export function PedidoCard({ pedido, showActions = false, onCambiarEstado }: PedidoCardProps) {
  const config = estadoConfig[pedido.estado];

  return (
    <div
      className={`rounded-lg border-2 border-retro-black p-4 ${config.bg} shadow-retro transition-all duration-100 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-retro-lg animate-pop-in`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="bg-retro-white border-2 border-retro-black rounded-lg px-3 py-1 text-lg font-bold uppercase shadow-retro-sm">
            Mesa {pedido.mesa}
          </span>
        </div>
        <span
          className={`${config.badge} text-retro-white px-4 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wide border-2 border-retro-black shadow-retro-sm`}
        >
          {pedido.estado}
        </span>
      </div>

      {/* Cliente */}
      {pedido.nombreCliente && (
        <div className="mb-3 flex items-center gap-2">
          <span className="bg-retro-purple/20 text-retro-purple-dark px-2 py-1 rounded text-xs font-bold uppercase border border-retro-purple">
            Cliente
          </span>
          <span className="text-sm font-medium text-retro-black">{pedido.nombreCliente}</span>
        </div>
      )}

      {/* Platos */}
      <div className="mb-4">
        <span className="text-xs font-bold uppercase tracking-wide text-retro-gray mb-2 block">
          Platos
        </span>
        <div className="flex flex-wrap gap-2">
          {pedido.platos.map((plato, index) => (
            <span
              key={index}
              className="bg-retro-white border-2 border-retro-black rounded-lg px-3 py-1.5 text-sm font-medium shadow-retro-sm"
            >
              {plato}
            </span>
          ))}
        </div>
      </div>

      {/* Meta info */}
      <div className="flex items-center gap-3 text-xs text-retro-gray mb-4">
        <span className="bg-retro-cream px-2 py-1 rounded border border-retro-gray/30">
          #{pedido.id}
        </span>
        <span className="bg-retro-cream px-2 py-1 rounded border border-retro-gray/30">
          Mozo: {pedido.mozoNombre}
        </span>
      </div>

      {/* Actions */}
      {showActions && onCambiarEstado && (
        <div className="pt-4 border-t-2 border-retro-black/20">
          {pedido.estado === 'Pendiente' && (
            <button
              onClick={() => onCambiarEstado(pedido.id, 'En Preparación')}
              className="w-full bg-gradient-retro-blue text-retro-white py-3 px-4 rounded-lg text-sm font-bold uppercase tracking-wide border-2 border-retro-black shadow-retro transition-all duration-100 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-retro-lg active:translate-x-[3px] active:translate-y-[3px] active:shadow-none"
            >
              Aceptar / En Preparación
            </button>
          )}
          {pedido.estado === 'En Preparación' && (
            <button
              onClick={() => onCambiarEstado(pedido.id, 'Listo para Servir')}
              className="w-full bg-gradient-retro-green text-retro-white py-3 px-4 rounded-lg text-sm font-bold uppercase tracking-wide border-2 border-retro-black shadow-retro transition-all duration-100 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-retro-lg active:translate-x-[3px] active:translate-y-[3px] active:shadow-none"
            >
              Marcar como Listo
            </button>
          )}
          {pedido.estado === 'Listo para Servir' && (
            <div className="flex items-center justify-center gap-2 py-3 px-4 bg-retro-green/20 rounded-lg border-2 border-retro-green">
              <svg className="w-5 h-5 text-retro-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-sm font-bold uppercase text-retro-green-dark">Listo para Servir</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

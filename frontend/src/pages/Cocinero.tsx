import { Layout } from '../components/Layout';
import { PedidoCard } from '../components/PedidoCard';
import { useSocketContext } from '../context/SocketContext';
import type { EstadoPedido } from '../types';

export function Cocinero() {
  const { pedidos, cambiarEstado } = useSocketContext();

  const handleCambiarEstado = (pedidoId: number, nuevoEstado: EstadoPedido) => {
    cambiarEstado({ pedidoId, nuevoEstado });
  };

  const pedidosPendientes = pedidos.filter(p => p.estado === 'Pendiente');
  const pedidosEnPreparacion = pedidos.filter(p => p.estado === 'En Preparación');
  const pedidosListos = pedidos.filter(p => p.estado === 'Listo para Servir');

  const ColumnHeader = ({
    title,
    count,
    gradient,
    dotColor
  }: {
    title: string;
    count: number;
    gradient: string;
    dotColor: string;
  }) => (
    <div className="flex items-center gap-3 mb-6">
      <div className={`w-4 h-4 ${dotColor} rounded-full border-2 border-retro-black shadow-retro-sm`} />
      <h2 className="text-lg font-bold uppercase tracking-wide text-retro-black">
        {title}
      </h2>
      <span className={`ml-auto ${gradient} text-retro-white px-3 py-1 rounded-lg text-sm font-bold border-2 border-retro-black shadow-retro-sm`}>
        {count}
      </span>
    </div>
  );

  const EmptyState = ({ message }: { message: string }) => (
    <div className="text-center py-8 bg-retro-cream/50 rounded-lg border-2 border-dashed border-retro-gray/30">
      <div className="w-12 h-12 mx-auto mb-3 bg-retro-gray/10 rounded-full flex items-center justify-center">
        <svg className="w-6 h-6 text-retro-gray" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
        </svg>
      </div>
      <p className="text-retro-gray font-medium text-sm">{message}</p>
    </div>
  );

  return (
    <Layout title="Panel del Cocinero">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pendientes */}
        <div className="bg-retro-white border-3 border-retro-black rounded-xl shadow-retro-lg p-5">
          <ColumnHeader
            title="Pendientes"
            count={pedidosPendientes.length}
            gradient="bg-gradient-retro-yellow"
            dotColor="bg-retro-yellow"
          />
          <div className="space-y-4 max-h-[calc(100vh-280px)] overflow-y-auto pr-1">
            {pedidosPendientes.length === 0 ? (
              <EmptyState message="No hay pedidos pendientes" />
            ) : (
              pedidosPendientes.map(pedido => (
                <PedidoCard
                  key={pedido.id}
                  pedido={pedido}
                  showActions
                  onCambiarEstado={handleCambiarEstado}
                />
              ))
            )}
          </div>
        </div>

        {/* En Preparación */}
        <div className="bg-retro-white border-3 border-retro-black rounded-xl shadow-retro-lg p-5">
          <ColumnHeader
            title="En Preparación"
            count={pedidosEnPreparacion.length}
            gradient="bg-gradient-retro-blue"
            dotColor="bg-retro-blue"
          />
          <div className="space-y-4 max-h-[calc(100vh-280px)] overflow-y-auto pr-1">
            {pedidosEnPreparacion.length === 0 ? (
              <EmptyState message="No hay pedidos en preparación" />
            ) : (
              pedidosEnPreparacion.map(pedido => (
                <PedidoCard
                  key={pedido.id}
                  pedido={pedido}
                  showActions
                  onCambiarEstado={handleCambiarEstado}
                />
              ))
            )}
          </div>
        </div>

        {/* Listos */}
        <div className="bg-retro-white border-3 border-retro-black rounded-xl shadow-retro-lg p-5">
          <ColumnHeader
            title="Listos"
            count={pedidosListos.length}
            gradient="bg-gradient-retro-green"
            dotColor="bg-retro-green"
          />
          <div className="space-y-4 max-h-[calc(100vh-280px)] overflow-y-auto pr-1">
            {pedidosListos.length === 0 ? (
              <EmptyState message="No hay pedidos listos" />
            ) : (
              pedidosListos.map(pedido => (
                <PedidoCard
                  key={pedido.id}
                  pedido={pedido}
                  showActions
                  onCambiarEstado={handleCambiarEstado}
                />
              ))
            )}
          </div>
        </div>
      </div>

      {/* Stats bar */}
      <div className="mt-8 bg-retro-white border-3 border-retro-black rounded-xl shadow-retro p-4">
        <div className="flex items-center justify-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-gradient-retro-yellow rounded-full border border-retro-black"></div>
            <span className="text-sm font-medium text-retro-black">
              <span className="font-bold">{pedidosPendientes.length}</span> Pendientes
            </span>
          </div>
          <div className="w-px h-6 bg-retro-gray/30"></div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-gradient-retro-blue rounded-full border border-retro-black"></div>
            <span className="text-sm font-medium text-retro-black">
              <span className="font-bold">{pedidosEnPreparacion.length}</span> En Preparación
            </span>
          </div>
          <div className="w-px h-6 bg-retro-gray/30"></div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-gradient-retro-green rounded-full border border-retro-black"></div>
            <span className="text-sm font-medium text-retro-black">
              <span className="font-bold">{pedidosListos.length}</span> Listos
            </span>
          </div>
          <div className="w-px h-6 bg-retro-gray/30"></div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold uppercase text-retro-gray">
              Total: {pedidos.length}
            </span>
          </div>
        </div>
      </div>
    </Layout>
  );
}

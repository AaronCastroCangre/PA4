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

  return (
    <Layout title="Panel del Cocinero">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div>
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <span className="w-3 h-3 bg-yellow-500 rounded-full" />
            Pendientes ({pedidosPendientes.length})
          </h2>
          <div className="space-y-4">
            {pedidosPendientes.length === 0 ? (
              <p className="text-gray-500 bg-white rounded-lg p-4 shadow">
                No hay pedidos pendientes
              </p>
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

        <div>
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <span className="w-3 h-3 bg-blue-500 rounded-full" />
            En Preparación ({pedidosEnPreparacion.length})
          </h2>
          <div className="space-y-4">
            {pedidosEnPreparacion.length === 0 ? (
              <p className="text-gray-500 bg-white rounded-lg p-4 shadow">
                No hay pedidos en preparación
              </p>
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

        <div>
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <span className="w-3 h-3 bg-green-500 rounded-full" />
            Listos ({pedidosListos.length})
          </h2>
          <div className="space-y-4">
            {pedidosListos.length === 0 ? (
              <p className="text-gray-500 bg-white rounded-lg p-4 shadow">
                No hay pedidos listos
              </p>
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
    </Layout>
  );
}

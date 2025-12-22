import { useState, useEffect, type FormEvent } from 'react';
import { Layout } from '../components/Layout';
import { PedidoCard } from '../components/PedidoCard';
import { useSocketContext } from '../context/SocketContext';
import type { Mesa } from '../types';

const PLATOS = [
  'Hamburguesa',
  'Ensalada',
  'Pizza',
  'Pasta Carbonara',
  'Refresco',
  'Café',
];

export function Mozo() {
  const { pedidos, enviarPedido } = useSocketContext();
  const [mesas, setMesas] = useState<Mesa[]>([]);
  const [mesaSeleccionada, setMesaSeleccionada] = useState('');
  const [platosSeleccionados, setPlatosSeleccionados] = useState<string[]>([]);

  useEffect(() => {
    fetch('http://localhost:3006/api/mesas')
      .then(res => res.json())
      .then(data => setMesas(data))
      .catch(err => console.error('Error al cargar mesas:', err));
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!mesaSeleccionada || platosSeleccionados.length === 0) {
      alert('Debes seleccionar una mesa y al menos un plato');
      return;
    }

    enviarPedido({
      mesa: mesaSeleccionada,
      platos: platosSeleccionados,
      mozoNombre: 'Mozo Principal',
    });

    setMesaSeleccionada('');
    setPlatosSeleccionados([]);
  };

  const togglePlato = (plato: string) => {
    setPlatosSeleccionados(prev =>
      prev.includes(plato)
        ? prev.filter(p => p !== plato)
        : [...prev, plato]
    );
  };

  return (
    <Layout title="Panel del Mozo">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold mb-4">Nuevo Pedido</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Número de Mesa
              </label>
              <select
                value={mesaSeleccionada}
                onChange={e => setMesaSeleccionada(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Seleccionar mesa</option>
                {mesas.map(mesa => (
                  <option key={mesa.id} value={mesa.numeroMesa}>
                    Mesa {mesa.numeroMesa} {mesa.cliente && `- ${mesa.cliente}`}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Seleccionar Platos
              </label>
              <div className="grid grid-cols-2 gap-2">
                {PLATOS.map(plato => (
                  <label
                    key={plato}
                    className={`flex items-center gap-2 p-3 rounded-md border-2 cursor-pointer transition-colors ${
                      platosSeleccionados.includes(plato)
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={platosSeleccionados.includes(plato)}
                      onChange={() => togglePlato(plato)}
                      className="sr-only"
                    />
                    <span className="text-sm">{plato}</span>
                  </label>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md font-medium transition-colors"
            >
              Enviar Pedido
            </button>
          </form>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold mb-4">Mis Pedidos</h2>
          {pedidos.length === 0 ? (
            <p className="text-gray-500">No tienes pedidos activos</p>
          ) : (
            <div className="space-y-4">
              {pedidos.map(pedido => (
                <PedidoCard key={pedido.id} pedido={pedido} />
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Formulario */}
        <div className="bg-retro-white border-3 border-retro-black rounded-xl shadow-retro-lg p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-retro-blue rounded-lg border-2 border-retro-black shadow-retro-sm flex items-center justify-center">
              <svg className="w-5 h-5 text-retro-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <h2 className="text-xl font-bold uppercase tracking-wide text-retro-black">
              Nuevo Pedido
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Mesa selector */}
            <div>
              <label className="block text-sm font-bold uppercase tracking-wide text-retro-black mb-2">
                Número de Mesa
              </label>
              <select
                value={mesaSeleccionada}
                onChange={e => setMesaSeleccionada(e.target.value)}
                className="w-full border-2 border-retro-black rounded-lg px-4 py-3 bg-retro-white text-retro-black font-medium shadow-retro focus:shadow-retro-lg focus:-translate-x-0.5 focus:-translate-y-0.5 transition-all focus:outline-none"
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

            {/* Platos grid */}
            <div>
              <label className="block text-sm font-bold uppercase tracking-wide text-retro-black mb-3">
                Seleccionar Platos
              </label>
              <div className="grid grid-cols-2 gap-3">
                {PLATOS.map(plato => (
                  <label
                    key={plato}
                    className={`flex items-center gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all duration-100 ${
                      platosSeleccionados.includes(plato)
                        ? 'border-retro-blue bg-retro-blue/10 shadow-retro-blue -translate-x-0.5 -translate-y-0.5'
                        : 'border-retro-black bg-retro-white shadow-retro-sm hover:shadow-retro hover:-translate-x-0.5 hover:-translate-y-0.5'
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                        platosSeleccionados.includes(plato)
                          ? 'bg-gradient-retro-blue border-retro-blue'
                          : 'border-retro-black bg-retro-white'
                      }`}
                    >
                      {platosSeleccionados.includes(plato) && (
                        <svg className="w-3 h-3 text-retro-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                    <input
                      type="checkbox"
                      checked={platosSeleccionados.includes(plato)}
                      onChange={() => togglePlato(plato)}
                      className="sr-only"
                    />
                    <span className="text-sm font-medium text-retro-black">{plato}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              className="w-full bg-gradient-retro-blue text-retro-white py-4 rounded-lg font-bold uppercase tracking-wide text-sm border-2 border-retro-black shadow-retro transition-all duration-100 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-retro-lg active:translate-x-[3px] active:translate-y-[3px] active:shadow-none"
            >
              Enviar Pedido
            </button>
          </form>
        </div>

        {/* Mis Pedidos */}
        <div className="bg-retro-white border-3 border-retro-black rounded-xl shadow-retro-lg p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-retro-purple rounded-lg border-2 border-retro-black shadow-retro-sm flex items-center justify-center">
              <svg className="w-5 h-5 text-retro-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h2 className="text-xl font-bold uppercase tracking-wide text-retro-black">
              Mis Pedidos
            </h2>
            <span className="ml-auto bg-retro-purple/20 text-retro-purple-dark px-3 py-1 rounded-lg text-sm font-bold border border-retro-purple">
              {pedidos.length}
            </span>
          </div>

          {pedidos.length === 0 ? (
            <div className="text-center py-12 bg-retro-cream/50 rounded-lg border-2 border-dashed border-retro-gray/30">
              <div className="w-16 h-16 mx-auto mb-4 bg-retro-gray/10 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-retro-gray" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <p className="text-retro-gray font-medium">No tienes pedidos activos</p>
            </div>
          ) : (
            <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
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

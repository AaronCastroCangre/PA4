import { Link } from 'react-router-dom';
import { Layout } from '../components/Layout';

export function Home() {
  return (
    <Layout title="Sistema de Pedidos">
      <div className="text-center py-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Bienvenido al Sistema de Pedidos
        </h2>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          Gestiona los pedidos de tu restaurante en tiempo real. Selecciona tu rol
          para comenzar.
        </p>
        <div className="flex justify-center gap-6">
          <Link
            to="/mozo"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg text-lg font-medium transition-colors shadow-lg"
          >
            Panel del Mozo
          </Link>
          <Link
            to="/cocinero"
            className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-lg text-lg font-medium transition-colors shadow-lg"
          >
            Panel del Cocinero
          </Link>
        </div>
      </div>
    </Layout>
  );
}

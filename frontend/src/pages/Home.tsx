import { Link } from 'react-router-dom';
import { Layout } from '../components/Layout';

export function Home() {
  return (
    <Layout title="Sistema de Pedidos">
      <div className="text-center py-16">
        {/* Hero Section */}
        <div className="mb-12">
          <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-wide text-retro-black mb-6 drop-shadow-[3px_3px_0px_rgba(139,92,246,0.3)]">
            Bienvenido al Sistema de Pedidos
          </h2>
          <p className="text-lg text-retro-gray max-w-lg mx-auto font-medium">
            Gestiona los pedidos de tu restaurante en tiempo real. Selecciona tu rol para comenzar.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="flex flex-col md:flex-row justify-center gap-8 max-w-3xl mx-auto">
          {/* Mozo Card */}
          <Link
            to="/mozo"
            className="group flex-1 bg-retro-white border-4 border-retro-black rounded-2xl p-8 shadow-retro-xl transition-all duration-150 hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_var(--color-retro-black)]"
          >
            <div className="w-20 h-20 mx-auto mb-6 bg-gradient-retro-ocean rounded-xl border-3 border-retro-black shadow-retro flex items-center justify-center group-hover:scale-110 transition-transform">
              <svg className="w-10 h-10 text-retro-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold uppercase tracking-wide text-retro-black mb-3">
              Panel del Mozo
            </h3>
            <p className="text-retro-gray text-sm mb-6">
              Crea y gestiona pedidos para las mesas del restaurante
            </p>
            <div className="inline-flex items-center gap-2 bg-gradient-retro-blue text-retro-white px-6 py-3 rounded-lg font-bold uppercase text-sm border-2 border-retro-black shadow-retro group-hover:shadow-retro-lg transition-all">
              <span>Entrar</span>
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Link>

          {/* Cocinero Card */}
          <Link
            to="/cocinero"
            className="group flex-1 bg-retro-white border-4 border-retro-black rounded-2xl p-8 shadow-retro-xl transition-all duration-150 hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_var(--color-retro-black)]"
          >
            <div className="w-20 h-20 mx-auto mb-6 bg-gradient-retro-sunset rounded-xl border-3 border-retro-black shadow-retro flex items-center justify-center group-hover:scale-110 transition-transform">
              <svg className="w-10 h-10 text-retro-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold uppercase tracking-wide text-retro-black mb-3">
              Panel del Cocinero
            </h3>
            <p className="text-retro-gray text-sm mb-6">
              Recibe y actualiza el estado de los pedidos en cocina
            </p>
            <div className="inline-flex items-center gap-2 bg-gradient-retro-orange text-retro-white px-6 py-3 rounded-lg font-bold uppercase text-sm border-2 border-retro-black shadow-retro group-hover:shadow-retro-lg transition-all">
              <span>Entrar</span>
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Link>
        </div>

        {/* Decorative elements */}
        <div className="mt-16 flex justify-center gap-4">
          <div className="w-4 h-4 bg-gradient-retro-pink rounded-full border-2 border-retro-black shadow-retro-sm"></div>
          <div className="w-4 h-4 bg-gradient-retro-yellow rounded-full border-2 border-retro-black shadow-retro-sm"></div>
          <div className="w-4 h-4 bg-gradient-retro-cyan rounded-full border-2 border-retro-black shadow-retro-sm"></div>
          <div className="w-4 h-4 bg-gradient-retro-green rounded-full border-2 border-retro-black shadow-retro-sm"></div>
          <div className="w-4 h-4 bg-gradient-retro-purple rounded-full border-2 border-retro-black shadow-retro-sm"></div>
        </div>
      </div>
    </Layout>
  );
}

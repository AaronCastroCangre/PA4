import { Link, useLocation } from 'react-router-dom';
import type { ReactNode } from 'react';
import { useSocketContext } from '../context/SocketContext';
import { Notification } from './Notification';

interface LayoutProps {
  children: ReactNode;
  title: string;
}

export function Layout({ children, title }: LayoutProps) {
  const location = useLocation();
  const { isConnected } = useSocketContext();

  return (
    <div className="min-h-screen bg-retro-cream">
      {/* Header with gradient */}
      <header className="bg-gradient-retro-sunset border-b-4 border-retro-black">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold uppercase tracking-wide text-retro-white drop-shadow-[2px_2px_0px_rgba(0,0,0,0.8)]">
                {title}
              </h1>
              <div className="flex items-center gap-2 bg-retro-white/90 px-3 py-1.5 rounded-lg border-2 border-retro-black shadow-retro-sm">
                <span
                  className={`w-3 h-3 rounded-full border-2 border-retro-black ${
                    isConnected ? 'bg-retro-green' : 'bg-retro-red'
                  }`}
                />
                <span className="text-xs font-bold uppercase text-retro-black">
                  {isConnected ? 'Conectado' : 'Desconectado'}
                </span>
              </div>
            </div>
            <nav className="flex gap-2">
              <Link
                to="/"
                className={`px-4 py-2 rounded-lg text-sm font-bold uppercase tracking-wide border-2 border-retro-black transition-all duration-100 ${
                  location.pathname === '/'
                    ? 'bg-retro-white text-retro-black shadow-retro translate-x-0 translate-y-0'
                    : 'bg-retro-white/20 text-retro-white hover:bg-retro-white/40 shadow-retro-sm hover:shadow-retro hover:-translate-x-0.5 hover:-translate-y-0.5'
                }`}
              >
                Inicio
              </Link>
              <Link
                to="/mozo"
                className={`px-4 py-2 rounded-lg text-sm font-bold uppercase tracking-wide border-2 border-retro-black transition-all duration-100 ${
                  location.pathname === '/mozo'
                    ? 'bg-retro-white text-retro-black shadow-retro translate-x-0 translate-y-0'
                    : 'bg-retro-white/20 text-retro-white hover:bg-retro-white/40 shadow-retro-sm hover:shadow-retro hover:-translate-x-0.5 hover:-translate-y-0.5'
                }`}
              >
                Mozo
              </Link>
              <Link
                to="/cocinero"
                className={`px-4 py-2 rounded-lg text-sm font-bold uppercase tracking-wide border-2 border-retro-black transition-all duration-100 ${
                  location.pathname === '/cocinero'
                    ? 'bg-retro-white text-retro-black shadow-retro translate-x-0 translate-y-0'
                    : 'bg-retro-white/20 text-retro-white hover:bg-retro-white/40 shadow-retro-sm hover:shadow-retro hover:-translate-x-0.5 hover:-translate-y-0.5'
                }`}
              >
                Cocinero
              </Link>
            </nav>
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {children}
      </main>
      <Notification />
    </div>
  );
}

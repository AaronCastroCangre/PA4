import { createContext, useContext, type ReactNode } from 'react';
import { useSocket } from '../hooks/useSocket';
import type { Pedido, NuevoPedidoData, CambiarEstadoData } from '../types';

interface SocketContextValue {
  isConnected: boolean;
  pedidos: Pedido[];
  notification: string | null;
  enviarPedido: (data: NuevoPedidoData) => void;
  cambiarEstado: (data: CambiarEstadoData) => void;
  clearNotification: () => void;
}

const SocketContext = createContext<SocketContextValue | null>(null);

export function SocketProvider({ children }: { children: ReactNode }) {
  const socketData = useSocket();

  return (
    <SocketContext.Provider value={socketData}>
      {children}
    </SocketContext.Provider>
  );
}

export function useSocketContext() {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error('useSocketContext must be used within a SocketProvider');
  }
  return context;
}

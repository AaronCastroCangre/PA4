import { useEffect, useRef, useState, useCallback } from 'react';
import { io, Socket } from 'socket.io-client';
import type { Pedido, NuevoPedidoData, CambiarEstadoData, EstadoActualizadoData } from '../types';

const SOCKET_URL = 'http://localhost:3006';

export function useSocket() {
  const socketRef = useRef<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [notification, setNotification] = useState<string | null>(null);

  useEffect(() => {
    socketRef.current = io(SOCKET_URL);

    socketRef.current.on('connect', () => {
      console.log('Conectado al servidor');
      setIsConnected(true);
    });

    socketRef.current.on('disconnect', () => {
      console.log('Desconectado del servidor');
      setIsConnected(false);
    });

    socketRef.current.on('pedidos-iniciales', (pedidosIniciales: Pedido[]) => {
      setPedidos(pedidosIniciales);
    });

    socketRef.current.on('pedido-creado', (pedido: Pedido) => {
      setPedidos(prev => [...prev, pedido]);
      setNotification(`Nuevo pedido de Mesa ${pedido.mesa}`);
    });

    socketRef.current.on('estado-actualizado', (data: EstadoActualizadoData) => {
      setPedidos(prev =>
        prev.map(p => (p.id === data.pedidoId ? { ...p, estado: data.nuevoEstado } : p))
      );
      if (data.nuevoEstado === 'Listo para Servir') {
        setNotification(`Pedido de Mesa ${data.pedido.mesa} está listo!`);
      }
    });

    return () => {
      socketRef.current?.disconnect();
    };
  }, []);

  const enviarPedido = useCallback((data: NuevoPedidoData) => {
    socketRef.current?.emit('nuevo-pedido', data);
  }, []);

  const cambiarEstado = useCallback((data: CambiarEstadoData) => {
    socketRef.current?.emit('cambiar-estado', data);
  }, []);

  const clearNotification = useCallback(() => {
    setNotification(null);
  }, []);

  return {
    isConnected,
    pedidos,
    notification,
    enviarPedido,
    cambiarEstado,
    clearNotification,
  };
}

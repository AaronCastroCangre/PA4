import { useEffect } from 'react';
import { useSocketContext } from '../context/SocketContext';

export function Notification() {
  const { notification, clearNotification } = useSocketContext();

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        clearNotification();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [notification, clearNotification]);

  if (!notification) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 animate-pulse">
      <div className="bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg">
        {notification}
      </div>
    </div>
  );
}

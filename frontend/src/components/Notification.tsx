import { useEffect } from 'react';
import { useSocketContext } from '../context/SocketContext';

export function Notification() {
  const { notification, clearNotification } = useSocketContext();

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        clearNotification();
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [notification, clearNotification]);

  if (!notification) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-slide-in-right">
      <div className="flex items-center gap-3 bg-gradient-retro-green text-retro-white px-6 py-4 rounded-xl border-3 border-retro-black shadow-retro-lg">
        <div className="w-8 h-8 bg-retro-white/20 rounded-lg flex items-center justify-center">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <span className="font-bold text-sm uppercase tracking-wide">{notification}</span>
        <button
          onClick={clearNotification}
          className="ml-2 p-1 hover:bg-retro-white/20 rounded transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}

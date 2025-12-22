# Arquitectura del Frontend

El frontend está construido con React 18, TypeScript y Vite, utilizando Tailwind CSS v4 para estilos y React Router v6 para navegación.

## Estructura de Carpetas

```
frontend/
├── package.json           # Dependencias y scripts
├── vite.config.ts         # Configuración de Vite
├── tsconfig.json          # Configuración de TypeScript
├── tailwind.config.js     # Configuración de Tailwind (v4)
├── index.html             # HTML principal
└── src/
    ├── main.tsx           # Punto de entrada
    ├── App.tsx            # Componente raíz con rutas
    ├── index.css          # Estilos globales (Tailwind)
    ├── vite-env.d.ts      # Tipos de Vite
    ├── types/             # Interfaces TypeScript
    ├── hooks/             # Custom hooks
    ├── context/           # React Context providers
    ├── components/        # Componentes reutilizables
    └── pages/             # Páginas/vistas
```

## Arquitectura de Componentes

```
┌─────────────────────────────────────────────────────────┐
│                        App.tsx                           │
│  ┌─────────────────────────────────────────────────┐    │
│  │              BrowserRouter                       │    │
│  │  ┌─────────────────────────────────────────┐    │    │
│  │  │           SocketProvider                 │    │    │
│  │  │  ┌─────────────────────────────────┐    │    │    │
│  │  │  │            Routes               │    │    │    │
│  │  │  │  • / → Home                     │    │    │    │
│  │  │  │  • /mozo → Mozo                 │    │    │    │
│  │  │  │  • /cocinero → Cocinero         │    │    │    │
│  │  │  └─────────────────────────────────┘    │    │    │
│  │  └─────────────────────────────────────────┘    │    │
│  └─────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────┘
```

## Flujo de Datos

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│   useSocket  │────►│SocketContext│────►│   Pages/     │
│    (Hook)    │     │  (Provider)  │     │ Components   │
└──────────────┘     └──────────────┘     └──────────────┘
       │                    │
       │                    │
       ▼                    ▼
┌──────────────┐     ┌──────────────┐
│  Socket.IO   │     │    State     │
│   Server     │     │  (pedidos,   │
│              │     │ notification)│
└──────────────┘     └──────────────┘
```

## Componentes Principales

### App.tsx - Componente Raíz

```tsx
function App() {
  return (
    <BrowserRouter>
      <SocketProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/mozo" element={<Mozo />} />
          <Route path="/cocinero" element={<Cocinero />} />
        </Routes>
      </SocketProvider>
    </BrowserRouter>
  );
}
```

### Context - SocketContext

Provee el estado global de Socket.IO a toda la aplicación.

```tsx
// context/SocketContext.tsx
interface SocketContextValue {
  isConnected: boolean;
  pedidos: Pedido[];
  notification: string | null;
  enviarPedido: (data: NuevoPedidoData) => void;
  cambiarEstado: (data: CambiarEstadoData) => void;
  clearNotification: () => void;
}

export function SocketProvider({ children }: { children: ReactNode }) {
  const socketData = useSocket();
  return (
    <SocketContext.Provider value={socketData}>
      {children}
    </SocketContext.Provider>
  );
}

// Uso en componentes
const { pedidos, enviarPedido } = useSocketContext();
```

### Hook - useSocket

Custom hook que maneja la conexión Socket.IO y el estado de pedidos.

```tsx
// hooks/useSocket.ts
export function useSocket() {
  const socketRef = useRef<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [notification, setNotification] = useState<string | null>(null);

  useEffect(() => {
    socketRef.current = io(SOCKET_URL);

    socketRef.current.on('connect', () => setIsConnected(true));
    socketRef.current.on('pedidos-iniciales', (data) => setPedidos(data));
    socketRef.current.on('pedido-creado', (pedido) => {
      setPedidos(prev => [...prev, pedido]);
      setNotification(`Nuevo pedido de Mesa ${pedido.mesa}`);
    });
    // ... más eventos

    return () => socketRef.current?.disconnect();
  }, []);

  const enviarPedido = useCallback((data: NuevoPedidoData) => {
    socketRef.current?.emit('nuevo-pedido', data);
  }, []);

  return { isConnected, pedidos, notification, enviarPedido, ... };
}
```

## Páginas

### Home.tsx

Página de inicio con enlaces a los paneles.

```tsx
export function Home() {
  return (
    <Layout title="Sistema de Pedidos">
      <div className="text-center py-12">
        <h2>Bienvenido al Sistema de Pedidos</h2>
        <div className="flex justify-center gap-6">
          <Link to="/mozo">Panel del Mozo</Link>
          <Link to="/cocinero">Panel del Cocinero</Link>
        </div>
      </div>
    </Layout>
  );
}
```

### Mozo.tsx

Panel para crear pedidos.

```tsx
export function Mozo() {
  const { pedidos, enviarPedido } = useSocketContext();
  const [mesaSeleccionada, setMesaSeleccionada] = useState('');
  const [platosSeleccionados, setPlatosSeleccionados] = useState<string[]>([]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    enviarPedido({
      mesa: mesaSeleccionada,
      platos: platosSeleccionados,
      mozoNombre: 'Mozo Principal',
    });
    // Reset form
  };

  return (
    <Layout title="Panel del Mozo">
      {/* Formulario de pedido */}
      {/* Lista de pedidos */}
    </Layout>
  );
}
```

### Cocinero.tsx

Panel para gestionar pedidos con vista Kanban.

```tsx
export function Cocinero() {
  const { pedidos, cambiarEstado } = useSocketContext();

  const pedidosPendientes = pedidos.filter(p => p.estado === 'Pendiente');
  const pedidosEnPreparacion = pedidos.filter(p => p.estado === 'En Preparación');
  const pedidosListos = pedidos.filter(p => p.estado === 'Listo para Servir');

  const handleCambiarEstado = (pedidoId: number, nuevoEstado: EstadoPedido) => {
    cambiarEstado({ pedidoId, nuevoEstado });
  };

  return (
    <Layout title="Panel del Cocinero">
      <div className="grid grid-cols-3 gap-6">
        {/* Columna Pendientes */}
        {/* Columna En Preparación */}
        {/* Columna Listos */}
      </div>
    </Layout>
  );
}
```

## Componentes Reutilizables

### Layout.tsx

Wrapper con header y navegación.

```tsx
interface LayoutProps {
  children: ReactNode;
  title: string;
}

export function Layout({ children, title }: LayoutProps) {
  const { isConnected } = useSocketContext();

  return (
    <div className="min-h-screen bg-gray-100">
      <header>
        <h1>{title}</h1>
        <span>{isConnected ? 'Conectado' : 'Desconectado'}</span>
        <nav>
          <Link to="/">Inicio</Link>
          <Link to="/mozo">Mozo</Link>
          <Link to="/cocinero">Cocinero</Link>
        </nav>
      </header>
      <main>{children}</main>
      <Notification />
    </div>
  );
}
```

### PedidoCard.tsx

Tarjeta de pedido reutilizable.

```tsx
interface PedidoCardProps {
  pedido: Pedido;
  showActions?: boolean;
  onCambiarEstado?: (pedidoId: number, nuevoEstado: EstadoPedido) => void;
}

export function PedidoCard({ pedido, showActions, onCambiarEstado }: PedidoCardProps) {
  return (
    <div className={`rounded-lg border-2 p-4 ${estadoColors[pedido.estado]}`}>
      <div className="flex justify-between">
        <span>Mesa {pedido.mesa}</span>
        <span className="badge">{pedido.estado}</span>
      </div>
      <p>Cliente: {pedido.nombreCliente}</p>
      <ul>
        {pedido.platos.map((plato, i) => <li key={i}>{plato}</li>)}
      </ul>
      {showActions && (
        <div className="flex gap-2">
          {/* Botones de acción según estado */}
        </div>
      )}
    </div>
  );
}
```

### Notification.tsx

Toast de notificaciones con auto-dismiss.

```tsx
export function Notification() {
  const { notification, clearNotification } = useSocketContext();

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(clearNotification, 3000);
      return () => clearTimeout(timer);
    }
  }, [notification, clearNotification]);

  if (!notification) return null;

  return (
    <div className="fixed bottom-4 right-4 bg-green-600 text-white px-6 py-3 rounded-lg">
      {notification}
    </div>
  );
}
```

## Tipos TypeScript

```typescript
// types/index.ts
export type EstadoPedido = 'Pendiente' | 'En Preparación' | 'Listo para Servir';

export interface Pedido {
  id: number;
  mesa: string;
  nombreCliente: string;
  platos: string[];
  estado: EstadoPedido;
  mozoNombre: string;
  fecha: string;
}

export interface NuevoPedidoData {
  mesa: string;
  platos: string[];
  mozoNombre: string;
}

export interface CambiarEstadoData {
  pedidoId: number;
  nuevoEstado: EstadoPedido;
}
```

## Estilos con Tailwind CSS v4

El proyecto usa Tailwind CSS v4 con la nueva sintaxis de importación:

```css
/* index.css */
@import "tailwindcss";
```

Tailwind v4 usa el plugin de Vite en lugar de PostCSS:

```typescript
// vite.config.ts
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
})
```

## Proxy de Desarrollo

Vite está configurado para hacer proxy de las peticiones al backend:

```typescript
// vite.config.ts
export default defineConfig({
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:3006',
        changeOrigin: true,
      },
      '/socket.io': {
        target: 'http://localhost:3006',
        changeOrigin: true,
        ws: true,
      },
    },
  },
})
```

## Extender el Frontend

### Agregar una Nueva Página

1. Crear componente en `src/pages/NuevaPagina.tsx`
2. Agregar ruta en `src/App.tsx`
3. Agregar enlace en `src/components/Layout.tsx`

### Agregar un Nuevo Componente

1. Crear archivo en `src/components/NuevoComponente.tsx`
2. Definir props interface si es necesario
3. Importar y usar en las páginas

### Agregar Nuevo Estado Global

1. Extender `SocketContextValue` en `src/context/SocketContext.tsx`
2. Agregar estado y funciones en `src/hooks/useSocket.ts`
3. Consumir con `useSocketContext()` en componentes

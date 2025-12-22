# Arquitectura del Backend

El backend está construido con Node.js y TypeScript, siguiendo una arquitectura en capas para mantener una separación clara de responsabilidades.

## Estructura de Carpetas

```
backend/
├── package.json          # Dependencias y scripts
├── tsconfig.json         # Configuración de TypeScript
├── data/
│   └── mesas.json        # Datos estáticos de mesas
└── src/
    ├── index.ts          # Punto de entrada
    ├── app.ts            # Configuración de Express
    ├── config/           # Configuración del entorno
    ├── types/            # Interfaces TypeScript
    ├── schemas/          # Esquemas de validación Zod
    ├── repositories/     # Capa de acceso a datos
    ├── services/         # Capa de lógica de negocio
    ├── controllers/      # Manejadores HTTP
    ├── routes/           # Definición de rutas
    ├── sockets/          # Manejadores de Socket.IO
    ├── middlewares/      # Middlewares de Express
    └── swagger/          # Configuración de Swagger
```

## Arquitectura en Capas

```
┌─────────────────────────────────────────────────────────┐
│                    CAPA DE PRESENTACIÓN                  │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────┐  │
│  │   Routes    │  │ Controllers │  │ Socket Handlers │  │
│  └──────┬──────┘  └──────┬──────┘  └────────┬────────┘  │
│         │                │                   │           │
│         └────────────────┼───────────────────┘           │
│                          ▼                               │
│  ┌─────────────────────────────────────────────────┐    │
│  │              Validation Middleware (Zod)         │    │
│  └─────────────────────────┬───────────────────────┘    │
└────────────────────────────┼────────────────────────────┘
                             ▼
┌─────────────────────────────────────────────────────────┐
│                  CAPA DE NEGOCIO                         │
│  ┌─────────────────────────────────────────────────┐    │
│  │                   Services                       │    │
│  │  • PedidoService: Lógica de pedidos             │    │
│  │  • MesaService: Lógica de mesas                 │    │
│  └─────────────────────────┬───────────────────────┘    │
└────────────────────────────┼────────────────────────────┘
                             ▼
┌─────────────────────────────────────────────────────────┐
│                   CAPA DE DATOS                          │
│  ┌─────────────────────────────────────────────────┐    │
│  │                 Repositories                     │    │
│  │  • PedidoRepository: Almacenamiento en memoria  │    │
│  │  • MesaRepository: Lectura de archivo JSON      │    │
│  └─────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────┘
```

## Descripción de Capas

### 1. Capa de Presentación

#### Routes (`src/routes/`)
Define los endpoints HTTP y la documentación Swagger.

```typescript
// pedido.routes.ts
router.get('/', pedidoController.getAll.bind(pedidoController));
router.post('/', validateBody(nuevoPedidoSchema), pedidoController.create.bind(pedidoController));
```

#### Controllers (`src/controllers/`)
Manejan las peticiones HTTP, extraen datos y devuelven respuestas.

```typescript
// pedido.controller.ts
class PedidoController {
  getAll(_req: Request, res: Response): void {
    const pedidos = pedidoService.getAll();
    res.json(pedidos);
  }

  create(req: Request<unknown, unknown, NuevoPedidoSchema>, res: Response): void {
    const pedido = pedidoService.create(req.body);
    res.status(201).json(pedido);
  }
}
```

#### Socket Handlers (`src/sockets/`)
Manejan eventos de Socket.IO con validación.

```typescript
// pedido.socket.ts
socket.on('nuevo-pedido', (data: unknown) => {
  const result = nuevoPedidoSchema.safeParse(data);
  if (!result.success) {
    socket.emit('error', { message: 'Datos inválidos' });
    return;
  }
  const pedido = pedidoService.create(result.data);
  io.emit('pedido-creado', pedido);
});
```

### 2. Capa de Negocio

#### Services (`src/services/`)
Contienen la lógica de negocio y coordinan entre repositorios.

```typescript
// pedido.service.ts
class PedidoService {
  create(input: NuevoPedidoInput): Pedido {
    const mesaNumero = parseInt(input.mesa, 10);
    const nombreCliente = mesaService.getClienteByMesa(mesaNumero);
    return pedidoRepository.create(input, nombreCliente);
  }
}
```

### 3. Capa de Datos

#### Repositories (`src/repositories/`)
Abstraen el acceso a datos. Actualmente usan almacenamiento en memoria.

```typescript
// pedido.repository.ts
class PedidoRepository {
  private pedidos: Pedido[] = [];
  private idCounter = 1;

  create(input: NuevoPedidoInput, nombreCliente: string): Pedido {
    const pedido: Pedido = {
      id: this.idCounter++,
      mesa: input.mesa,
      nombreCliente,
      platos: input.platos,
      estado: 'Pendiente',
      mozoNombre: input.mozoNombre || 'Mozo',
      fecha: new Date().toISOString(),
    };
    this.pedidos.push(pedido);
    return pedido;
  }
}
```

## Validación con Zod

### Esquemas (`src/schemas/`)

```typescript
// index.ts
export const nuevoPedidoSchema = z.object({
  mesa: z.string().min(1, 'Mesa es requerida'),
  platos: z.array(z.string().min(1)).min(1, 'Debe incluir al menos un plato'),
  mozoNombre: z.string().optional(),
});

export const cambiarEstadoSchema = z.object({
  pedidoId: z.number().positive('ID de pedido debe ser positivo'),
  nuevoEstado: z.enum(['Pendiente', 'En Preparación', 'Listo para Servir']),
});
```

### Middleware de Validación (`src/middlewares/`)

```typescript
// validation.ts
export const validateBody = <T>(schema: ZodSchema<T>) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      req.body = schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({
          error: 'Validation Error',
          details: error.errors.map((e) => ({
            field: e.path.join('.'),
            message: e.message,
          })),
        });
        return;
      }
      next(error);
    }
  };
};
```

## Tipos TypeScript

### Interfaces (`src/types/`)

```typescript
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

export interface Mesa {
  id: number;
  numeroMesa: number;
  cliente: string;
  capacidad: number;
  estado: 'ocupada' | 'disponible';
}
```

## Configuración de Swagger

La documentación de la API está disponible en `/api-docs` y se genera automáticamente a partir de los comentarios JSDoc en los archivos de rutas.

```typescript
// routes/pedido.routes.ts
/**
 * @swagger
 * /api/pedidos:
 *   post:
 *     summary: Crear un nuevo pedido
 *     tags: [Pedidos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NuevoPedido'
 *     responses:
 *       201:
 *         description: Pedido creado
 */
router.post('/', validateBody(nuevoPedidoSchema), pedidoController.create);
```

## Eventos Socket.IO

### Eventos del Cliente → Servidor

| Evento | Datos | Descripción |
|--------|-------|-------------|
| `nuevo-pedido` | `{ mesa, platos, mozoNombre? }` | Crea un nuevo pedido |
| `cambiar-estado` | `{ pedidoId, nuevoEstado }` | Actualiza el estado de un pedido |

### Eventos del Servidor → Cliente

| Evento | Datos | Descripción |
|--------|-------|-------------|
| `pedidos-iniciales` | `Pedido[]` | Lista inicial de pedidos al conectar |
| `pedido-creado` | `Pedido` | Notifica nuevo pedido a todos |
| `estado-actualizado` | `{ pedidoId, nuevoEstado, pedido }` | Notifica cambio de estado |
| `error` | `{ event, message, details? }` | Error de validación |

## Extender el Backend

### Agregar una Nueva Entidad

1. **Crear tipo** en `src/types/index.ts`
2. **Crear esquema Zod** en `src/schemas/index.ts`
3. **Crear repository** en `src/repositories/`
4. **Crear service** en `src/services/`
5. **Crear controller** en `src/controllers/`
6. **Crear rutas** en `src/routes/`
7. **Registrar rutas** en `src/routes/index.ts`

### Agregar Persistencia (Base de Datos)

Para migrar de almacenamiento en memoria a una base de datos:

1. Instalar driver de base de datos (ej: `pg`, `mysql2`, `prisma`)
2. Modificar los repositories para usar la base de datos
3. El resto de las capas permanece igual (Services, Controllers, Routes)

Esta es la ventaja de la arquitectura en capas: solo necesitas modificar la capa de datos.

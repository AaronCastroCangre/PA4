# API Reference

Documentación de la API REST y eventos Socket.IO.

> **Nota**: La documentación interactiva de Swagger está disponible en http://localhost:3006/api-docs

## Base URL

```
http://localhost:3006
```

## Endpoints REST

### Pedidos

#### Obtener todos los pedidos

```http
GET /api/pedidos
```

**Respuesta** `200 OK`
```json
[
  {
    "id": 1,
    "mesa": "1",
    "nombreCliente": "Juan Pérez",
    "platos": ["Hamburguesa", "Refresco"],
    "estado": "Pendiente",
    "mozoNombre": "Mozo Principal",
    "fecha": "2024-01-15T10:30:00.000Z"
  }
]
```

---

#### Obtener pedido por ID

```http
GET /api/pedidos/:id
```

**Parámetros**
| Nombre | Tipo | Descripción |
|--------|------|-------------|
| `id` | number | ID del pedido |

**Respuesta** `200 OK`
```json
{
  "id": 1,
  "mesa": "1",
  "nombreCliente": "Juan Pérez",
  "platos": ["Hamburguesa", "Refresco"],
  "estado": "Pendiente",
  "mozoNombre": "Mozo Principal",
  "fecha": "2024-01-15T10:30:00.000Z"
}
```

**Respuesta** `404 Not Found`
```json
{
  "error": "Pedido no encontrado"
}
```

---

#### Crear pedido

```http
POST /api/pedidos
```

**Body**
```json
{
  "mesa": "1",
  "platos": ["Hamburguesa", "Refresco"],
  "mozoNombre": "Mozo Principal"  // opcional
}
```

**Validación**
| Campo | Reglas |
|-------|--------|
| `mesa` | Requerido, string no vacío |
| `platos` | Requerido, array con al menos 1 elemento |
| `mozoNombre` | Opcional, string |

**Respuesta** `201 Created`
```json
{
  "id": 1,
  "mesa": "1",
  "nombreCliente": "Juan Pérez",
  "platos": ["Hamburguesa", "Refresco"],
  "estado": "Pendiente",
  "mozoNombre": "Mozo Principal",
  "fecha": "2024-01-15T10:30:00.000Z"
}
```

**Respuesta** `400 Bad Request`
```json
{
  "error": "Validation Error",
  "details": [
    {
      "field": "platos",
      "message": "Debe incluir al menos un plato"
    }
  ]
}
```

---

#### Eliminar pedido

```http
DELETE /api/pedidos/:id
```

**Parámetros**
| Nombre | Tipo | Descripción |
|--------|------|-------------|
| `id` | number | ID del pedido |

**Respuesta** `204 No Content`

**Respuesta** `404 Not Found`
```json
{
  "error": "Pedido no encontrado"
}
```

---

### Mesas

#### Obtener todas las mesas

```http
GET /api/mesas
```

**Respuesta** `200 OK`
```json
[
  {
    "id": 1,
    "numeroMesa": 1,
    "cliente": "Juan Pérez",
    "capacidad": 4,
    "estado": "ocupada"
  },
  {
    "id": 2,
    "numeroMesa": 2,
    "cliente": "",
    "capacidad": 2,
    "estado": "disponible"
  }
]
```

---

### Health Check

#### Verificar estado del servidor

```http
GET /health
```

**Respuesta** `200 OK`
```json
{
  "status": "ok"
}
```

---

## Eventos Socket.IO

### Conexión

```javascript
import { io } from 'socket.io-client';

const socket = io('http://localhost:3006');

socket.on('connect', () => {
  console.log('Conectado:', socket.id);
});
```

### Eventos del Cliente → Servidor

#### nuevo-pedido

Crea un nuevo pedido.

```javascript
socket.emit('nuevo-pedido', {
  mesa: '1',
  platos: ['Hamburguesa', 'Refresco'],
  mozoNombre: 'Mozo Principal'  // opcional
});
```

**Validación**
| Campo | Reglas |
|-------|--------|
| `mesa` | Requerido, string no vacío |
| `platos` | Requerido, array con al menos 1 elemento |
| `mozoNombre` | Opcional, string |

---

#### cambiar-estado

Actualiza el estado de un pedido.

```javascript
socket.emit('cambiar-estado', {
  pedidoId: 1,
  nuevoEstado: 'En Preparación'
});
```

**Validación**
| Campo | Reglas |
|-------|--------|
| `pedidoId` | Requerido, número positivo |
| `nuevoEstado` | Requerido, uno de: `Pendiente`, `En Preparación`, `Listo para Servir` |

---

### Eventos del Servidor → Cliente

#### pedidos-iniciales

Se emite al conectar. Contiene todos los pedidos actuales.

```javascript
socket.on('pedidos-iniciales', (pedidos) => {
  console.log('Pedidos actuales:', pedidos);
  // pedidos: Pedido[]
});
```

---

#### pedido-creado

Se emite a todos los clientes cuando se crea un pedido.

```javascript
socket.on('pedido-creado', (pedido) => {
  console.log('Nuevo pedido:', pedido);
  // pedido: Pedido
});
```

**Datos recibidos**
```json
{
  "id": 1,
  "mesa": "1",
  "nombreCliente": "Juan Pérez",
  "platos": ["Hamburguesa", "Refresco"],
  "estado": "Pendiente",
  "mozoNombre": "Mozo Principal",
  "fecha": "2024-01-15T10:30:00.000Z"
}
```

---

#### estado-actualizado

Se emite a todos los clientes cuando cambia el estado de un pedido.

```javascript
socket.on('estado-actualizado', (data) => {
  console.log('Estado actualizado:', data);
  // data: { pedidoId, nuevoEstado, pedido }
});
```

**Datos recibidos**
```json
{
  "pedidoId": 1,
  "nuevoEstado": "En Preparación",
  "pedido": {
    "id": 1,
    "mesa": "1",
    "nombreCliente": "Juan Pérez",
    "platos": ["Hamburguesa", "Refresco"],
    "estado": "En Preparación",
    "mozoNombre": "Mozo Principal",
    "fecha": "2024-01-15T10:30:00.000Z"
  }
}
```

---

#### error

Se emite al cliente que envió datos inválidos.

```javascript
socket.on('error', (error) => {
  console.error('Error:', error);
  // error: { event, message, details? }
});
```

**Ejemplo de error**
```json
{
  "event": "nuevo-pedido",
  "message": "Datos inválidos",
  "details": [
    {
      "code": "too_small",
      "minimum": 1,
      "type": "array",
      "inclusive": true,
      "exact": false,
      "message": "Debe incluir al menos un plato",
      "path": ["platos"]
    }
  ]
}
```

---

## Tipos de Datos

### Pedido

```typescript
interface Pedido {
  id: number;
  mesa: string;
  nombreCliente: string;
  platos: string[];
  estado: 'Pendiente' | 'En Preparación' | 'Listo para Servir';
  mozoNombre: string;
  fecha: string;  // ISO 8601
}
```

### Mesa

```typescript
interface Mesa {
  id: number;
  numeroMesa: number;
  cliente: string;
  capacidad: number;
  estado: 'ocupada' | 'disponible';
}
```

### ValidationError

```typescript
interface ValidationError {
  error: string;
  details: Array<{
    field: string;
    message: string;
  }>;
}
```

---

## Ejemplos de Uso

### JavaScript/Node.js

```javascript
import { io } from 'socket.io-client';

const socket = io('http://localhost:3006');

// Escuchar pedidos iniciales
socket.on('pedidos-iniciales', (pedidos) => {
  console.log('Pedidos:', pedidos);
});

// Crear pedido
socket.emit('nuevo-pedido', {
  mesa: '1',
  platos: ['Pizza', 'Café'],
  mozoNombre: 'Juan'
});

// Escuchar nuevo pedido
socket.on('pedido-creado', (pedido) => {
  console.log('Pedido creado:', pedido);
});

// Cambiar estado
socket.emit('cambiar-estado', {
  pedidoId: 1,
  nuevoEstado: 'En Preparación'
});

// Manejar errores
socket.on('error', (error) => {
  console.error('Error:', error.message);
});
```

### cURL (REST API)

```bash
# Obtener pedidos
curl http://localhost:3006/api/pedidos

# Crear pedido
curl -X POST http://localhost:3006/api/pedidos \
  -H "Content-Type: application/json" \
  -d '{"mesa": "1", "platos": ["Pizza", "Café"]}'

# Obtener mesas
curl http://localhost:3006/api/mesas

# Eliminar pedido
curl -X DELETE http://localhost:3006/api/pedidos/1
```

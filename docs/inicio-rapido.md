# Inicio Rápido

Guía para poner en marcha el proyecto de forma local.

## Requisitos Previos

- Node.js v18 o superior
- npm v9 o superior

## Instalación

### 1. Clonar el repositorio

```bash
git clone <url-del-repositorio>
cd chat-application-kitchen
```

### 2. Instalar dependencias del Backend

```bash
cd backend
npm install
```

### 3. Instalar dependencias del Frontend

```bash
cd ../frontend
npm install
```

## Ejecutar en Desarrollo

Necesitas dos terminales para ejecutar el proyecto completo.

### Terminal 1 - Backend

```bash
cd backend
npm run dev
```

El servidor se iniciará en `http://localhost:3006`

### Terminal 2 - Frontend

```bash
cd frontend
npm run dev
```

La aplicación se iniciará en `http://localhost:5173`

## URLs Importantes

| URL | Descripción |
|-----|-------------|
| http://localhost:5173 | Aplicación Frontend |
| http://localhost:5173/mozo | Panel del Mozo |
| http://localhost:5173/cocinero | Panel del Cocinero |
| http://localhost:3006/api-docs | Documentación Swagger |
| http://localhost:3006/health | Health Check |

## Comandos Disponibles

### Backend

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Inicia el servidor en modo desarrollo con hot reload |
| `npm run build` | Compila TypeScript a JavaScript |
| `npm start` | Inicia el servidor en modo producción |

### Frontend

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Inicia Vite en modo desarrollo |
| `npm run build` | Compila para producción |
| `npm run preview` | Preview de la build de producción |
| `npm run lint` | Ejecuta ESLint |

## Flujo de Uso Básico

1. Abre el **Panel del Mozo** (`/mozo`)
2. Selecciona una mesa y los platos deseados
3. Envía el pedido
4. Abre el **Panel del Cocinero** (`/cocinero`) en otra ventana
5. El pedido aparecerá en la columna "Pendientes"
6. Haz clic en "Aceptar / En Preparación" para cambiar el estado
7. Cuando esté listo, haz clic en "Marcar como Listo"
8. El mozo recibirá una notificación automática

## Variables de Entorno

### Backend

| Variable | Descripción | Default |
|----------|-------------|---------|
| `PORT` | Puerto del servidor | `3006` |

Ejemplo:
```bash
PORT=4000 npm run dev
```

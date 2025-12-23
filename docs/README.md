# Documentación del Sistema de Pedidos

Sistema de gestión de pedidos en tiempo real para restaurantes.

## Índice

1. [Inicio Rápido](./inicio-rapido.md)
2. [Arquitectura del Backend](./backend.md)
3. [Arquitectura del Frontend](./frontend.md)
4. [API Reference](./api.md)
5. [Diagramas (Mermaid)](./diagramas.md)

## Descripción General

Este sistema permite a los mozos crear pedidos para las mesas y a los cocineros gestionar el estado de los pedidos en tiempo real mediante WebSockets.

### Flujo Principal

```
┌─────────────┐         ┌─────────────┐         ┌─────────────┐
│    Mozo     │ ──────► │   Backend   │ ──────► │  Cocinero   │
│  (Frontend) │ Socket  │  (Node.js)  │ Socket  │  (Frontend) │
└─────────────┘         └─────────────┘         └─────────────┘
      │                       │                       │
      │   1. Crear pedido     │                       │
      │ ─────────────────────►│                       │
      │                       │   2. Notificar        │
      │                       │ ─────────────────────►│
      │                       │                       │
      │                       │   3. Cambiar estado   │
      │                       │ ◄─────────────────────│
      │   4. Actualizar UI    │                       │
      │ ◄─────────────────────│                       │
      │                       │                       │
```

### Stack Tecnológico

| Capa | Tecnologías |
|------|-------------|
| **Backend** | Node.js, TypeScript, Express 5, Socket.IO, Zod, Swagger |
| **Frontend** | React 18, TypeScript, Vite, Tailwind CSS v4, React Router v6 |
| **Comunicación** | REST API + WebSockets (Socket.IO) |

### Estados de un Pedido

```
┌───────────┐      ┌────────────────┐      ┌──────────────────┐
│ Pendiente │ ───► │ En Preparación │ ───► │ Listo para Servir│
└───────────┘      └────────────────┘      └──────────────────┘
```

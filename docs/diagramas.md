# Diagramas del Sistema

Diagramas Mermaid que explican los flujos y arquitectura del sistema.

## Índice

1. [Arquitectura General](#arquitectura-general)
2. [Flujo de Creación de Pedido](#flujo-de-creación-de-pedido)
3. [Flujo de Cambio de Estado](#flujo-de-cambio-de-estado)
4. [Arquitectura del Backend](#arquitectura-del-backend)
5. [Arquitectura del Frontend](#arquitectura-del-frontend)
6. [Máquina de Estados del Pedido](#máquina-de-estados-del-pedido)
7. [Comunicación Socket.IO](#comunicación-socketio)
8. [Flujo de Validación](#flujo-de-validación)

---

## Arquitectura General

```mermaid
flowchart TB
    subgraph Frontend["Frontend (React + Vite)"]
        direction TB
        Home["/  Home"]
        Mozo["/mozo  Panel Mozo"]
        Cocinero["/cocinero  Panel Cocinero"]
    end

    subgraph Backend["Backend (Node.js + TypeScript)"]
        direction TB
        Express["Express Server"]
        SocketIO["Socket.IO Server"]
        Swagger["Swagger UI\n/api-docs"]

        subgraph API["REST API"]
            GetPedidos["GET /api/pedidos"]
            PostPedidos["POST /api/pedidos"]
            GetMesas["GET /api/mesas"]
        end
    end

    subgraph Data["Capa de Datos"]
        Memory[("Memoria\n(Pedidos)")]
        JSON[("mesas.json")]
    end

    Frontend <-->|"Socket.IO\nWebSocket"| SocketIO
    Frontend <-->|"HTTP\nREST"| Express
    Express --> API
    API --> Memory
    API --> JSON
    SocketIO --> Memory
```

---

## Flujo de Creación de Pedido

```mermaid
sequenceDiagram
    autonumber
    participant M as Mozo (Frontend)
    participant S as Socket.IO Server
    participant V as Validación (Zod)
    participant PS as PedidoService
    participant PR as PedidoRepository
    participant MR as MesaRepository
    participant C as Cocinero (Frontend)

    M->>S: emit('nuevo-pedido', {mesa, platos, mozoNombre})
    S->>V: safeParse(data)

    alt Validación Fallida
        V-->>S: error
        S-->>M: emit('error', {message, details})
    else Validación Exitosa
        V-->>S: data validada
        S->>PS: create(input)
        PS->>MR: getByNumero(mesa)
        MR-->>PS: Mesa con cliente
        PS->>PR: create(input, nombreCliente)
        PR-->>PS: Pedido creado
        PS-->>S: Pedido
        S-->>M: emit('pedido-creado', pedido)
        S-->>C: emit('pedido-creado', pedido)
    end
```

---

## Flujo de Cambio de Estado

```mermaid
sequenceDiagram
    autonumber
    participant C as Cocinero (Frontend)
    participant S as Socket.IO Server
    participant V as Validación (Zod)
    participant PS as PedidoService
    participant PR as PedidoRepository
    participant M as Mozo (Frontend)

    C->>S: emit('cambiar-estado', {pedidoId, nuevoEstado})
    S->>V: safeParse(data)

    alt Validación Fallida
        V-->>S: error
        S-->>C: emit('error', {message, details})
    else Validación Exitosa
        V-->>S: data validada
        S->>PS: updateEstado(id, estado)
        PS->>PR: updateEstado(id, estado)

        alt Pedido No Encontrado
            PR-->>PS: undefined
            PS-->>S: undefined
            S-->>C: emit('error', {message: 'Pedido no encontrado'})
        else Pedido Encontrado
            PR-->>PS: Pedido actualizado
            PS-->>S: Pedido
            S-->>C: emit('estado-actualizado', {pedidoId, nuevoEstado, pedido})
            S-->>M: emit('estado-actualizado', {pedidoId, nuevoEstado, pedido})
        end
    end
```

---

## Arquitectura del Backend

```mermaid
flowchart TB
    subgraph Presentation["Capa de Presentación"]
        Routes["Routes\n(Express Router)"]
        Controllers["Controllers"]
        Sockets["Socket Handlers"]
        Middleware["Validation Middleware\n(Zod)"]
    end

    subgraph Business["Capa de Negocio"]
        PedidoService["PedidoService"]
        MesaService["MesaService"]
    end

    subgraph DataLayer["Capa de Datos"]
        PedidoRepo["PedidoRepository\n(In-Memory)"]
        MesaRepo["MesaRepository\n(JSON File)"]
    end

    subgraph Storage["Almacenamiento"]
        Memory[("Array en Memoria")]
        JSONFile[("mesas.json")]
    end

    Routes --> Middleware
    Middleware --> Controllers
    Sockets --> Middleware
    Controllers --> PedidoService
    Controllers --> MesaService
    Sockets --> PedidoService

    PedidoService --> PedidoRepo
    PedidoService --> MesaService
    MesaService --> MesaRepo

    PedidoRepo --> Memory
    MesaRepo --> JSONFile
```

---

## Arquitectura del Frontend

```mermaid
flowchart TB
    subgraph App["App.tsx"]
        Router["BrowserRouter"]
        Provider["SocketProvider"]
    end

    subgraph Context["Context Layer"]
        SocketContext["SocketContext"]
        UseSocket["useSocket Hook"]
    end

    subgraph Pages["Páginas"]
        HomePage["Home.tsx\n/"]
        MozoPage["Mozo.tsx\n/mozo"]
        CocineroPage["Cocinero.tsx\n/cocinero"]
    end

    subgraph Components["Componentes"]
        Layout["Layout"]
        Notification["Notification"]
        PedidoCard["PedidoCard"]
    end

    subgraph External["Servicios Externos"]
        SocketServer["Socket.IO Server"]
        RESTAPI["REST API"]
    end

    Router --> Provider
    Provider --> SocketContext
    SocketContext --> UseSocket
    UseSocket <--> SocketServer

    Provider --> HomePage
    Provider --> MozoPage
    Provider --> CocineroPage

    HomePage --> Layout
    MozoPage --> Layout
    MozoPage --> PedidoCard
    MozoPage <--> RESTAPI
    CocineroPage --> Layout
    CocineroPage --> PedidoCard

    Layout --> Notification
```

---

## Máquina de Estados del Pedido

```mermaid
stateDiagram-v2
    [*] --> Pendiente: Crear Pedido

    Pendiente --> EnPreparacion: Cocinero acepta
    EnPreparacion --> ListoParaServir: Cocinero termina
    ListoParaServir --> [*]: Mozo sirve

    Pendiente: 🟡 Pendiente
    Pendiente: Esperando que el cocinero acepte

    EnPreparacion: 🔵 En Preparación
    EnPreparacion: El cocinero está preparando

    ListoParaServir: 🟢 Listo para Servir
    ListoParaServir: Esperando que el mozo recoja
```

---

## Comunicación Socket.IO

```mermaid
flowchart LR
    subgraph Clients["Clientes"]
        Mozo["Mozo\n(Browser)"]
        Cocinero["Cocinero\n(Browser)"]
        OtrosClientes["Otros\nClientes..."]
    end

    subgraph Server["Servidor Socket.IO"]
        IO["io (Server)"]
    end

    subgraph Events["Eventos"]
        direction TB
        E1["nuevo-pedido"]
        E2["cambiar-estado"]
        E3["pedido-creado"]
        E4["estado-actualizado"]
        E5["pedidos-iniciales"]
        E6["error"]
    end

    Mozo -->|"emit"| E1
    Cocinero -->|"emit"| E2

    E1 --> IO
    E2 --> IO

    IO -->|"broadcast"| E3
    IO -->|"broadcast"| E4
    IO -->|"on connect"| E5
    IO -->|"on error"| E6

    E3 --> Mozo
    E3 --> Cocinero
    E3 --> OtrosClientes

    E4 --> Mozo
    E4 --> Cocinero
    E4 --> OtrosClientes

    E5 -->|"solo al cliente\nque conecta"| Mozo
    E6 -->|"solo al cliente\ncon error"| Mozo
```

---

## Flujo de Validación

```mermaid
flowchart TD
    subgraph Input["Entrada de Datos"]
        HTTP["HTTP Request\n(body)"]
        Socket["Socket Event\n(data)"]
    end

    subgraph Validation["Validación con Zod"]
        Schema["Zod Schema"]
        Parse["schema.safeParse(data)"]

        subgraph Result["Resultado"]
            Success["✅ success: true\ndata: parsed"]
            Error["❌ success: false\nerror: ZodError"]
        end
    end

    subgraph Response["Respuesta"]
        Continue["Continuar con\nlógica de negocio"]
        ErrorResponse["Responder con\nerror 400"]
        SocketError["Emitir evento\n'error'"]
    end

    HTTP --> Schema
    Socket --> Schema
    Schema --> Parse
    Parse --> Success
    Parse --> Error

    Success --> Continue
    Error -->|"HTTP"| ErrorResponse
    Error -->|"Socket"| SocketError
```

---

## Flujo Completo de un Pedido

```mermaid
flowchart TB
    subgraph MozoPanel["Panel del Mozo"]
        M1["1. Seleccionar Mesa"]
        M2["2. Seleccionar Platos"]
        M3["3. Enviar Pedido"]
        M4["4. Ver Estado"]
        M5["5. Recibir Notificación"]
    end

    subgraph Backend["Backend"]
        B1["Validar Datos"]
        B2["Crear Pedido"]
        B3["Broadcast a todos"]
        B4["Actualizar Estado"]
        B5["Broadcast actualización"]
    end

    subgraph CocineroPanel["Panel del Cocinero"]
        C1["Ver Pedido Nuevo"]
        C2["Aceptar Pedido"]
        C3["Marcar como Listo"]
    end

    M1 --> M2 --> M3
    M3 -->|"emit nuevo-pedido"| B1
    B1 --> B2 --> B3
    B3 -->|"emit pedido-creado"| C1
    B3 -->|"emit pedido-creado"| M4

    C1 --> C2
    C2 -->|"emit cambiar-estado"| B4
    B4 --> B5
    B5 -->|"emit estado-actualizado"| M4

    C2 --> C3
    C3 -->|"emit cambiar-estado"| B4
    B5 -->|"Listo para Servir"| M5

    style M5 fill:#90EE90
    style C3 fill:#90EE90
```

---

## Estructura de Datos

```mermaid
erDiagram
    PEDIDO {
        number id PK
        string mesa FK
        string nombreCliente
        array platos
        enum estado
        string mozoNombre
        datetime fecha
    }

    MESA {
        number id PK
        number numeroMesa UK
        string cliente
        number capacidad
        enum estado
    }

    MESA ||--o{ PEDIDO : "tiene"
```

---

## Cómo Visualizar los Diagramas

### Opción 1: GitHub
GitHub renderiza automáticamente los bloques de código Mermaid en archivos Markdown.

### Opción 2: VS Code
Instala la extensión "Markdown Preview Mermaid Support" o "Mermaid Markdown Syntax Highlighting".

### Opción 3: Mermaid Live Editor
Copia el código Mermaid y pégalo en [mermaid.live](https://mermaid.live)

### Opción 4: Documentación Web
Usa herramientas como Docusaurus, VitePress o MkDocs que soportan Mermaid nativamente.

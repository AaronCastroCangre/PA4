const socket = io('http://localhost:3006');

let todosPedidos = [];

socket.on('connect', () => {
    console.log('Conectado al servidor');
});

socket.on('pedidos-iniciales', (pedidos) => {
    todosPedidos = pedidos;
    renderizarPedidos();
});

socket.on('pedido-creado', (pedido) => {
    todosPedidos.push(pedido);
    renderizarPedidos();
    mostrarNotificacion(`Nuevo pedido de Mesa ${pedido.mesa}`);
});

socket.on('estado-actualizado', (data) => {
    const pedido = todosPedidos.find(p => p.id === data.pedidoId);
    if (pedido) {
        pedido.estado = data.nuevoEstado;
        renderizarPedidos();
    }
});

function cambiarEstado(pedidoId, nuevoEstado) {
    socket.emit('cambiar-estado', {
        pedidoId: pedidoId,
        nuevoEstado: nuevoEstado
    });
}

function renderizarPedidos() {
    const lista = document.getElementById('listaPedidos');
    
    if (todosPedidos.length === 0) {
        lista.innerHTML = '<p style="color: #999;">No hay pedidos pendientes</p>';
        return;
    }
    
    lista.innerHTML = todosPedidos.map(pedido => {
        const estadoClass = pedido.estado.toLowerCase().replace(/\s+/g, '-');
        const estadoLabel = pedido.estado === 'Pendiente' ? 'pendiente' : 
                           pedido.estado === 'En Preparación' ? 'en-preparacion' : 'listo';
        
        const botonAceptar = pedido.estado === 'Pendiente' ? 
            `<button class="btn-aceptar" onclick="cambiarEstado(${pedido.id}, 'En Preparación')">
                Aceptar / En Preparación
            </button>` : 
            `<button class="btn-aceptar" disabled>En Preparación</button>`;
        
        const botonListo = pedido.estado === 'En Preparación' ? 
            `<button class="btn-listo" onclick="cambiarEstado(${pedido.id}, 'Listo para Servir')">
                Marcar como Listo
            </button>` : 
            pedido.estado === 'Listo para Servir' ?
            `<button class="btn-listo" disabled>✓ Listo</button>` :
            `<button class="btn-listo" disabled>Listo</button>`;
        
        return `
            <div class="pedido-card ${estadoClass}">
                <div class="pedido-header">
                    <span class="pedido-mesa">Mesa ${pedido.mesa}</span>
                    <span class="pedido-estado estado-${estadoLabel}">${pedido.estado}</span>
                </div>
                ${pedido.nombreCliente ? `<p style="color: #666; margin: 5px 0;"><strong>Cliente:</strong> ${pedido.nombreCliente}</p>` : ''}
                <div class="pedido-platos">
                    <strong>Platos:</strong>
                    <ul>
                        ${pedido.platos.map(plato => `<li>${plato}</li>`).join('')}
                    </ul>
                </div>
                <small style="color: #999;">
                    Pedido #${pedido.id} | Mozo: ${pedido.mozoNombre}
                </small>
                <div class="pedido-actions">
                    ${botonAceptar}
                    ${botonListo}
                </div>
            </div>
        `;
    }).join('');
}

function mostrarNotificacion(mensaje) {
    const notificacion = document.getElementById('notificacion');
    notificacion.textContent = mensaje;
    notificacion.classList.add('show');
    
    setTimeout(() => {
        notificacion.classList.remove('show');
    }, 3000);
}
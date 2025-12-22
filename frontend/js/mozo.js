const socket = io('http://localhost:3006');

let misPedidos = [];
let mesas = [];

socket.on('connect', () => {
    console.log('Conectado al servidor');
    cargarMesas();
});
async function cargarMesas() {
    try {
        const response = await fetch('http://localhost:3006/api/mesas');
        mesas = await response.json();
    } catch (error) {
        console.error('Error al cargar mesas:', error);
    }
}

socket.on('pedidos-iniciales', (pedidos) => {
    misPedidos = pedidos;
    renderizarPedidos();
});

socket.on('pedido-creado', (pedido) => {
    misPedidos.push(pedido);
    renderizarPedidos();
    mostrarNotificacion('Pedido enviado a la cocina');
});

socket.on('estado-actualizado', (data) => {
    const pedido = misPedidos.find(p => p.id === data.pedidoId);
    if (pedido) {
        pedido.estado = data.nuevoEstado;
        renderizarPedidos();
        
        if (data.nuevoEstado === 'Listo para Servir') {
            mostrarNotificacion(`¡Pedido de Mesa ${pedido.mesa} está listo!`);
        }
    }
});

document.getElementById('pedidoForm').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const mesa = document.getElementById('mesa').value;
    const platosCheckboxes = document.querySelectorAll('input[name="plato"]:checked');
    
    const platos = Array.from(platosCheckboxes).map(cb => cb.value);
    
    if (platos.length === 0) {
        alert('Debes seleccionar al menos un plato');
        return;
    }
    
    socket.emit('nuevo-pedido', {
        mesa: mesa,
        platos: platos,
        mozoNombre: 'Mozo Principal'
    });
    
    document.getElementById('pedidoForm').reset();
});

function renderizarPedidos() {
    const lista = document.getElementById('listaPedidos');
    
    if (misPedidos.length === 0) {
        lista.innerHTML = '<p style="color: #999;">No tienes pedidos activos</p>';
        return;
    }
    
    lista.innerHTML = misPedidos.map(pedido => {
        const estadoClass = pedido.estado.toLowerCase().replace(/\s+/g, '-');
        const estadoLabel = pedido.estado === 'Pendiente' ? 'pendiente' : 
                           pedido.estado === 'En Preparación' ? 'en-preparacion' : 'listo';
        
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
                <small style="color: #999;">Pedido #${pedido.id}</small>
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
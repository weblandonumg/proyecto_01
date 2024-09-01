document.addEventListener('DOMContentLoaded', () => {
    const productos = [
        { nombre: 'Teclado', precio: 50, imagen: 'teclado.jpg' },
        { nombre: 'Mouse', precio: 30, imagen: 'mouse.jpg' },
        { nombre: 'Silla', precio: 100, imagen: 'silla.jpg' },
        { nombre: 'Escritorio', precio: 150, imagen: 'escritorio.jpg' },
        { nombre: 'Audífonos', precio: 70, imagen: 'audifonos.jpg' },
        { nombre: 'Mousepad', precio: 20, imagen: 'mousepad.jpg' }
    ];

    const productoList = document.getElementById('producto-list');
    const carritoList = document.getElementById('carrito-list');
    const carrito = {};

    // Mostrar los productos
    productos.forEach(producto => {
        const div = document.createElement('div');
        div.className = 'producto';
        div.draggable = true;
        div.dataset.nombre = producto.nombre;
        div.dataset.precio = producto.precio;
        div.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <p>${producto.nombre}</p>
            <p>Precio: $${producto.precio}</p>
        `;
        div.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', `${producto.nombre},${producto.precio}`);
        });
        productoList.appendChild(div);
    });

    const actualizarCarrito = () => {
        carritoList.innerHTML = '';
        let total = 0;
        for (const [nombre, cantidad] of Object.entries(carrito)) {
            const producto = productos.find(p => p.nombre === nombre);
            const precio = producto ? producto.precio : 0;
            total += cantidad * precio;
            carritoList.innerHTML += `<p>${nombre} - Cantidad: ${cantidad} - Precio: $${precio} - Total: $${cantidad * precio}</p>`;
        }
        carritoList.innerHTML += `<h3>Total a pagar: $${total}</h3>`;
    };

    // Permitir arrastrar y soltar
    document.getElementById('carrito').addEventListener('dragover', (e) => {
        e.preventDefault();
    });

    document.getElementById('carrito').addEventListener('drop', (e) => {
        e.preventDefault();
        const data = e.dataTransfer.getData('text/plain').split(',');
        const nombreProducto = data[0];
        const precioProducto = parseFloat(data[1]);

        if (productos.some(p => p.nombre === nombreProducto)) {
            if (!carrito[nombreProducto]) {
                carrito[nombreProducto] = 1;
            } else {
                carrito[nombreProducto]++;
            }
        }
        actualizarCarrito();
    });

    document.getElementById('vaciar-carrito').addEventListener('click', () => {
        for (const key in carrito) {
            delete carrito[key];
        }
        actualizarCarrito();
    });

    document.getElementById('confirmar-compra').addEventListener('click', () => {
        localStorage.setItem('carrito', JSON.stringify(carrito));
        window.location.href = 'confirmar-compra.html';
    });
});

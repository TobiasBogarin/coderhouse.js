class CierreDeSesion {
    constructor(logoutButtonId, redirectUrl) {
        this.logoutButton = document.getElementById(logoutButtonId);
        this.redirectUrl = redirectUrl;
        
        // Inicializar los eventos
        this.init();
    }

    init() {
        // Asegurarnos de que el botón exista antes de añadir el listener
        if (this.logoutButton) {
            this.logoutButton.addEventListener('click', () => this.logout());
        } else {
            console.error('El botón de cerrar sesión no se encontró.');
        }
    }

    logout() {
        // Aplicar animación de desvanecimiento
        document.body.style.transition = 'opacity 1s';
        document.body.style.opacity = '0';

        // Esperar a que termine la animación antes de redirigir
        setTimeout(() => {
            window.location.href = this.redirectUrl; // Redirige a la página de inicio de sesión
        }, 1000); // Esperar 1000 ms = 1 segundo
    }
}
document.addEventListener('DOMContentLoaded', function() {
    // Crear instancia de CierreDeSesion
    const cierreDeSesion = new CierreDeSesion('logoutButton', '../Login.html');
    
    // Crear instancia de GestorDeProductos
    const productos = [
        { nombre: "1CH TTL Relay", descripcion: "1CH TTL Relay", imagen: "1CH-TTL-RELAY.png" },
        { nombre: "1S Bat Indicator 3.7V", descripcion: "1S Bat Indicator 3.7V", imagen: "1S-BAT-INDICATOR-3.7V.png" },
        { nombre: "2CH Solid State Relay", descripcion: "2CH Solid State Relay", imagen: "2CH-SOLIDSTATE-RELAY.png" },
        { nombre: "2CH TTL Relay", descripcion: "2CH TTL Relay", imagen: "2CH-TTL-RELAY.png" },
        { nombre: "3.5 Screen Shield", descripcion: "3.5 Screen Shield", imagen: "3.5-SCREEN-SHIELD.png" },
        { nombre: "3D Pen Noozle RP500A", descripcion: "3D Pen Noozle RP500A", imagen: "3D-PEN-NOOZLE-RP500A.png" },
        { nombre: "3DPen Hoyit003 5 Combo", descripcion: "3DPen Hoyit003 5 Combo", imagen: "3DPEN-HOYIT003-5-COMBO.png" },
        { nombre: "3D Printer A8", descripcion: "3D Printer A8", imagen: "3DPRINTER-A8.png" },
        { nombre: "3D Printer A8V2", descripcion: "3D Printer A8V2", imagen: "3DPRINTER-A8V2.png" },
        { nombre: "3D Printer Sirius", descripcion: "3D Printer Sirius", imagen: "3DPRINTER-SIRIUS.png" },
        { nombre: "3D Sound 3", descripcion: "3D Sound 3", imagen: "3DSOUND-3.png" }
    ];
    const gestorDeProductos = new GestorDeProductos('products-container', '../image', productos);

    // Asigna el callback
    gestorDeProductos.onQuantityChange = actualizarVistaCarrito;

    // Mostrar el carrito al hacer clic en "Preview"
    const previewButton = document.getElementById('previewButton');
    previewButton.addEventListener('click', toggleCarrito);

    // Función de búsqueda
    const searchInput = document.querySelector('.search-input');
    searchInput.addEventListener('input', () => {
        const query = searchInput.value.toLowerCase();
        filtrarProductos(query);
    });

    const searchButton = document.querySelector('.search-button');
    searchButton.addEventListener('click', () => {
        const query = searchInput.value.toLowerCase();
        filtrarProductos(query);
    });

    function toggleCarrito(event) {
        event.preventDefault(); // Evita el comportamiento por defecto del enlace

        const cartPreview = document.getElementById('cart-preview');

        // Alternar visibilidad del contenedor de carrito
        if (cartPreview.style.display === 'none' || cartPreview.style.display === '') {
            actualizarVistaCarrito();
            cartPreview.style.display = 'block';
        } else {
            cartPreview.style.display = 'none';
        }
    }

    function actualizarVistaCarrito() {
        const cartItems = document.getElementById('cart-items');
        const carrito = JSON.parse(localStorage.getItem('carrito')) || {};

        cartItems.innerHTML = ''; // Limpiar elementos anteriores

        if (Object.keys(carrito).length === 0) {
            cartItems.innerHTML = '<li>No hay productos en el carrito</li>';
        } else {
            for (const [nombre, cantidad] of Object.entries(carrito)) {
                const li = document.createElement('li');
                li.textContent = `${nombre}: ${cantidad}`;
                cartItems.appendChild(li);
            }
        }
    }

    function filtrarProductos(query) {
        const productCards = productsContainer.querySelectorAll('.card');

        productCards.forEach(card => {
            const title = card.querySelector('.card-title').textContent.toLowerCase();
            if (title.startsWith(query)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }
});




class GestorDeProductos {
    constructor(containerId, imageFolder, productos) {
        this.container = document.getElementById(containerId);
        this.imageFolder = imageFolder;
        this.productos = productos;
        this.onQuantityChange = null; // Define el callback para la actualización del carrito
        this.generarTarjetas();
    }

    generarTarjetas() {
        if (!this.container) {
            console.error('El contenedor para las tarjetas de productos no se encontró.');
            return;
        }

        this.productos.forEach(producto => {
            const tarjeta = this.crearTarjeta(producto);
            this.container.appendChild(tarjeta);
        });
    }

    crearTarjeta(producto) {
        const card = document.createElement('div');
        card.className = 'card';

        const img = document.createElement('img');
        img.src = `${this.imageFolder}/${producto.imagen}`;
        img.alt = producto.descripcion;

        const title = document.createElement('div');
        title.className = 'card-title';
        title.textContent = producto.nombre;

        const incrementButton = document.createElement('button');
        incrementButton.textContent = '+1';
        incrementButton.onclick = () => this.adjustItemQuantity(producto.nombre, 1);

        const decrementButton = document.createElement('button');
        decrementButton.textContent = '-1';
        decrementButton.onclick = () => this.adjustItemQuantity(producto.nombre, -1);

        const quantityDisplay = document.createElement('span');
        quantityDisplay.textContent = 'Cantidad: 0';
        quantityDisplay.id = `quantity-${producto.nombre}`;

        card.appendChild(img);
        card.appendChild(title);
        card.appendChild(decrementButton);
        card.appendChild(quantityDisplay);
        card.appendChild(incrementButton);

        return card;
    }

    adjustItemQuantity(productName, change) {
        const quantityDisplay = document.getElementById(`quantity-${productName}`);
        let currentQuantity = parseInt(quantityDisplay.textContent.replace('Cantidad: ', '')) || 0;
        currentQuantity = Math.max(0, currentQuantity + change);
        quantityDisplay.textContent = `Cantidad: ${currentQuantity}`;

        const carrito = this.obtenerCarrito();

        if (currentQuantity > 0) {
            carrito[productName] = currentQuantity;
        } else {
            delete carrito[productName];
        }

        localStorage.setItem('carrito', JSON.stringify(carrito));

        if (this.onQuantityChange) {
            this.onQuantityChange(); // Llama al callback para actualizar la vista del carrito
        }
    }


    obtenerCarrito() {
        // Recupera el carrito del localStorage y lo convierte a un objeto, o devuelve un objeto vacío si no existe
        const carritoGuardado = localStorage.getItem('carrito');
        return carritoGuardado ? JSON.parse(carritoGuardado) : {};
    }
}
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.querySelector('.search-input');
    const productsContainer = document.getElementById('products-container');

    // Función para filtrar productos
    function filtrarProductos(query) {
        const productCards = productsContainer.querySelectorAll('.card');

        productCards.forEach(card => {
            const title = card.querySelector('.card-title').textContent.toLowerCase();
            if (title.startsWith(query)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }

    // Filtrado al escribir en el campo de búsqueda
    searchInput.addEventListener('input', () => {
        const query = searchInput.value.toLowerCase();
        filtrarProductos(query);
    });

    // También podrías mantener el botón de búsqueda para un comportamiento diferente si es necesario
    const searchButton = document.querySelector('.search-button');
    searchButton.addEventListener('click', () => {
        const query = searchInput.value.toLowerCase();
        filtrarProductos(query);
    });
});

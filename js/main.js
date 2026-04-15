const URL = "./db/data.json";
const productosContainer = document.getElementById("contenedorProductos");
const carritoContainer = document.getElementById("carrito");
const totalCarrito = document.getElementById("totalCarrito");
const botonVaciar = document.getElementById("vaciarCarrito");
const botonPagar = document.getElementById("comprarCarrito");

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// Productos desde el JSON
const obtenerProductos = () => {
    fetch(URL)
        .then(response => response.json())
        .then(data => renderProductos(data))
        .catch(() => console.error("Error al cargar productos"));
};

// Lista de productos
const renderProductos = (lista) => {
    productosContainer.innerHTML = "";
    lista.forEach(prod => {
        const card = document.createElement("div");
        card.className = "card m-3";
        card.style.width = "18rem";
        card.innerHTML = `
            <div class="card-body">
                <img src="${prod.imagen}" class="card-img-top" alt="${prod.nombre}">
                <h5 class="card-title">${prod.nombre}</h5>
                <p class="card-text">Calidad Gamer Profesional</p>
                <div class="d-flex justify-content-between align-items-center">
                    <span class="fw-bold">$${prod.precio}</span>
                    <button class="btn btn-primary btn-sm btn-agregar" data-id="${prod.id}">Añadir</button>
                </div>
            </div>`;

        card.querySelector(".btn-agregar").onclick = () => agregarAlCarrito(prod);
        productosContainer.appendChild(card);
    });
};

const agregarAlCarrito = (producto) => {
    const existe = carrito.find(item => item.id === producto.id);

    if (existe) {
        existe.cantidad++;
    } else {
        carrito.push({ ...producto, cantidad: 1 });
    }

    // alerta de producto 
    Toastify({
        text: `${producto.nombre} agregado`,
        duration: 2000,
        gravity: "bottom",
        position: "right",
        style: { background: "linear-gradient(to right, #110401, #4b0d02)" }
    }).showToast();

    guardarYRenderizar();
};

// Sumas los productos al carrito
const renderCarrito = () => {
    carritoContainer.innerHTML = "";

    if (carrito.length === 0) {
        carritoContainer.innerHTML = "<p class='text-center'>El carrito está vacío</p>";
        totalCarrito.textContent = "Total: $0";
        return;
    }

    carrito.forEach(prod => {
        const item = document.createElement("div");
        item.className = "d-flex justify-content-between align-items-center mb-3 border-bottom pb-2";
        item.innerHTML = `
            <div class="ms-2 me-auto">
                <div class="fw-bold">${prod.nombre}</div>
                $${prod.precio} x ${prod.cantidad}
            </div>
            <div class="btn-group mx-2">
                <button class="btn btn-outline-secondary btn-sm" onclick="cambiarCantidad(${prod.id}, -1)">-</button>
                <button class="btn btn-outline-secondary btn-sm" onclick="cambiarCantidad(${prod.id}, 1)">+</button>
            </div>
            <button class="btn btn-danger btn-sm" onclick="eliminarProducto(${prod.id})">X</button>
        `;
        carritoContainer.appendChild(item);
    });

    actualizarTotal();
};

// REDUCE para el total 
const actualizarTotal = () => {
    const total = carrito.reduce((acc, prod) => acc + (prod.precio * prod.cantidad), 0);
    totalCarrito.textContent = `Total: $${total}`;
};

window.cambiarCantidad = (id, cambio) => {
    const prod = carrito.find(item => item.id === id);
    if (prod) {
        prod.cantidad += cambio;
        if (prod.cantidad < 1) eliminarProducto(id);
        else guardarYRenderizar();
    }
};

window.eliminarProducto = (id) => {
    carrito = carrito.filter(item => item.id !== id);
    guardarYRenderizar();
};

const guardarYRenderizar = () => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
    renderCarrito();
};

botonVaciar.onclick = () => {
    carrito = [];
    guardarYRenderizar();
};

botonPagar.onclick = () => {
    if (carrito.length === 0) {
        Swal.fire("Carrito vacío", "Agregá productos antes de pagar", "error");
    } else {
        window.location.href = "./paginas/pagos.html";
    }
};

// Inicio de la app
obtenerProductos();
renderCarrito();

// Bienvenida de la pagina
Toastify({
    text: "Bienvenidos a GameShop",
    duration: 3000,
    destination: "#",
    close: true,
    gravity: "top", // `top` or `bottom`
    position: "center", // `left`, `center` or `right`
    stopOnFocus: false, // Prevents dismissing of toast on hover
    style: {
        background: "linear-gradient(to right, #110401",
    },
    onClick: function () { } // Callback after click
}).showToast();
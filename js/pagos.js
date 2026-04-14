const listaResumen = document.getElementById("resumenCompra");
const formulario = document.getElementById("formFinal");


const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// resumen de compra 
const renderizarResumen = () => {
    if (carrito.length === 0) {
        listaResumen.innerHTML = `<li class="list-group-item">No hay productos en el carrito</li>`;
        return;
    }

    //carrito HTML
    let listaHtml = carrito.map(prod => `
        <li class="list-group-item d-flex justify-content-between align-items-center">
            ${prod.nombre} (x${prod.cantidad})
            <span>$${prod.precio * prod.cantidad}</span>
        </li>
    `).join("");

    //total con reduce
    const totalFinal = carrito.reduce((acc, prod) => acc + (prod.precio * prod.cantidad), 0);

    listaHtml += `
        <li class="list-group-item d-flex justify-content-between bg-primary text-white mt-2">
            <strong>TOTAL A PAGAR</strong>
            <strong>$${totalFinal}</strong>
        </li>
    `;

    listaResumen.innerHTML = listaHtml;
};

//comprobante final
const mostrarComprobante = (datos) => {
    const { nombre, direccion, email, pais } = datos;
    const total = carrito.reduce((acc, prod) => acc + (prod.precio * prod.cantidad), 0);

    //productos para el mensaje
    const productosComprados = carrito.map(p => `${p.nombre} x${p.cantidad}`).join(", ");

    Swal.fire({
        title: "¡Compra Confirmada!",
        html: `
            <div class="text-start">
                <p><strong>Cliente:</strong> ${nombre}</p>
                <p><strong>Envío a:</strong> ${direccion}, ${pais}</p>
                <p><strong>Contacto:</strong> ${email}</p>
                <hr>
                <p><strong>Productos:</strong> ${productosComprados}</p>
                <h4 class="text-center mt-3">Total pagado: $${total}</h4>
            </div>
        `,
        icon: "success",
        confirmButtonText: "Finalizar y Volver",
        confirmButtonColor: "#166110",
        allowOutsideClick: false
    }).then((result) => {
        if (result.isConfirmed) {
            localStorage.removeItem("carrito");
            window.location.href = "../index.html";
        }
    });
};
 
formulario.onsubmit = (event) => {
    event.preventDefault();

    //capturar valores
    const nombre = document.getElementById("nombre").value.trim();
    const pais = document.getElementById("pais").value;
    const direccion = document.getElementById("direccion").value.trim();
    const email = document.getElementById("email").value.trim();

    // validacion extra para evitar "juan123" 
    const regexNombre = /^[a-zA-Z\s]{3,30}$/;
    
    if (!regexNombre.test(nombre)) {
        Swal.fire("Error en Nombre", "Por favor ingresa un nombre válido (solo letras, min. 3)", "error");
        return;
    }

    // comprobante
    mostrarComprobante({ nombre, pais, direccion, email });
};

//ejecucion inicial
renderizarResumen();
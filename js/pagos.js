const URL = "./db/data.json"
const listaResumen = document.getElementById("resumenCompra");
const formulario = document.getElementById("formFinal");

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
let listaHtml = "";
let totalFinal = 0;

carrito.forEach(function(producto) {
    listaHtml = listaHtml + `
    <li class="list-group-item d-flex justify-content-between">
        ${producto.nombre} (x${producto.cantidad})
        <span>$${producto.precio * producto.cantidad}</span>
    </li>
    `;
    totalFinal = totalFinal + (producto.precio * producto.cantidad);
});

listaHtml = listaHtml + `
    <li class="list-group-item d-flex justify-content-between bg-primary text-white">
        <strong>TOTAL</strong>
        <strong>$${totalFinal}</strong>
    </li>
`;
formulario.onsubmit = function (event) {

    event.preventDefault();
    const nombreCliente = document.getElementById("nombre").value;

    Swal.fire({
        title: `¡Gracias por tu compra, ${nombreCliente}!`,
        text: "Tu pedido de GameShop ha sido procesado con éxito.",
        icon: "success",
        confirmButtonText: "Volver a la tienda",
        confirmButtonColor: "#166110"
    })
}

listaResumen.innerHTML = listaHtml;
console.log("El carrito detectado es:", carrito);
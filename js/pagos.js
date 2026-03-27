let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
const URL = "./db/data.json"
const listaResumen = document.getElementById("resumenCompra");

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

listaResumen.innerHTML = listaHtml;
console.log("El carrito detectado es:", carrito);
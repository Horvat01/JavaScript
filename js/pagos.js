let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const listaResumen = document.getElementById ("resumenCompra")

let listaHtml  ="";
let totalFinal = 0;
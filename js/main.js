// -PRIMERA ENTREGA-
// CONSTANTES
// const juegos = ["god of War", "fifa","battlefield","gtaV"];
// const precios =[80, 120, 150, 200];

// let dinero = 150;
// let gastado = 0;

// FUNCION MOSTRAR JUEGOS
// function mostrarJuegos(){
//     for (let i=0; i < juegos.length; i++){
//         console.log(i + " - " + juegos[i] + " $" + precios[i]);
//     }
// }

// FUNCION ELEGIR JUEGO
// function elegirJuego(){
//     return parseInt(prompt("Elegir juego (0-3)"));
// }

// FUNCION COMPRAR
// function comprarJuego(indice){

//     if (indice >= 0 && indice < juegos.length) {

//         if (dinero < precios[indice]) {
//             alert("Saldo insuficiente");
//         } 
//         else {
//             alert("Compra realizada");
//             dinero -= precios[indice];
//             gastado += precios[indice];
//             console.log("Gastaste: " + gastado);
//             console.log("Te queda: " + dinero);
//         }

//     } else {
//         alert("Opción inválida");
//     }
// }

// EJECUCIÓN
// mostrarJuegos();

// let eleccion = elegirJuego();

// comprarJuego(eleccion);

// confirm("¿Querés comprar otro juego?");

// juegos.push("Rocket League");
// console.log(juegos.join(" / "));
// console.log(juegos.includes("fifa"));

// -SEGUNDA ENTREGA-
const botonesComprar = document.querySelectorAll(".comprar");
const carritoDiv = document.querySelector(".carrito");
const contadorCarrito = document.querySelector(".contadorCarrito");
const botonVaciar = document.querySelector(".vaciarCarrito");

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

function actualizarCarrito() {
    carritoDiv.innerHTML = "";

    if (carrito.length === 0) {
        carritoDiv.innerHTML = "<p>El carrito está vacío</p>";
    } else {
        carrito.forEach(producto => {
            const p = document.createElement("p");
            p.textContent = producto.nombre + " - $" + producto.precio;
            carritoDiv.appendChild(p);
        });
    }

    contadorCarrito.textContent = carrito.length;
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

botonesComprar.forEach(boton => {
    boton.addEventListener("click", () => {
        const producto = {
            nombre: boton.dataset.nombre,
            precio: boton.dataset.precio
        };

        carrito.push(producto);
        actualizarCarrito();
    });
});

botonVaciar.addEventListener("click", () => {
    carrito = [];
    actualizarCarrito();
});

actualizarCarrito();
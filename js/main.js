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
// const botonesComprar = document.querySelectorAll(".comprar");
// const carritoDiv = document.querySelector("#carrito");
// const contadorCarrito = document.querySelector("#contadorCarrito");
// const botonVaciar = document.querySelector("#vaciarCarrito");
// const totalDiv = document.querySelector("#totalCarrito");

// let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
// console.log("Carrito inicial desde localStorage:", carrito);

// function actualizarCarrito() {
//     carritoDiv.innerHTML = "";

//     if (carrito.length === 0) {
//         carritoDiv.innerHTML = "<p>El carrito está vacío</p>";
//         totalDiv.textContent = "Total: $0"; 
//         console.log("Carrito vacío - Total: $0");
//     } else {
//         let total = 0; 
//         carrito.forEach((producto, index) => {
//             const p = document.createElement("p");
//             p.textContent = producto.nombre + " - $" + producto.precio;


//             total += producto.precio;


//             const btnEliminar = document.createElement("button");
//             btnEliminar.textContent = "Eliminar";
//             btnEliminar.classList.add("btn", "btn-sm", "btn-danger", "ms-2");
//             btnEliminar.addEventListener("click", () => {
//                 console.log(`Eliminando producto: ${producto.nombre}`);
//                 carrito.splice(index, 1);
//                 actualizarCarrito();
//             });

//             p.appendChild(btnEliminar);
//             carritoDiv.appendChild(p);
//         });


//         totalDiv.textContent = "Total: $" + total;
//         console.log("Total del carrito:", total);
//     }

//     contadorCarrito.textContent = carrito.length;
//     localStorage.setItem("carrito", JSON.stringify(carrito));
//     console.log("LocalStorage actualizado:", carrito);
// }

// botonesComprar.forEach(boton => {
//     boton.addEventListener("click", () => {
//         const producto = {
//             nombre: boton.dataset.nombre,
//             precio: Number(boton.dataset.precio)
//         };

//         console.log("Agregando producto:", producto);
//         carrito.push(producto);
//         actualizarCarrito();
//     });
// });

// botonVaciar.addEventListener("click", () => {
//     console.log("Vaciando carrito");
//     carrito = [];
//     actualizarCarrito();
// });

// actualizarCarrito();

// const productos = [
//     {
//         id: 1,
//         nombre: "Mouse Gamer RGB",
//         precio: 35

//     },
//     {
//         id: 2,
//         nombre: "Teclado Mecánico",
//         precio: 70

//     },
//     {
//         id: 3,
//         nombre: "Auriculares Gamer 7.1",
//         precio: 60

//     },
//     {
//         id: 4,
//         nombre: "Monitor Gamer 24",
//         precio: 220

//     },
//     {
//         id: 5,
//         nombre: "Joystick PC",
//         precio: 50

//     },
//     {
//         id: 6,
//         nombre: "Micrófono Condensador",
//         precio: 45

//     },
//     {
//         id: 7,
//         nombre: "Mousepad Gamer XL",
//         precio: 20

//     },

//     {
//         id: 8,
//         nombre: "Hub USB 3.0",
//         precio: 30

//     },
// ]

const URL = "./db/data.json"
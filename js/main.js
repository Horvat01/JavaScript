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

// -- TERCERA ENTREGA--
const URL = "./db/data.json"
const productosContainer = document.getElementById("contenedorProductos")
const carritoContainer = document.getElementById("carrito")
const totalCarrito = document.getElementById("totalCarrito")
const botonVaciar = document.getElementById("vaciarCarrito")

let carrito = JSON.parse(localStorage.getItem("carrito")) || []

obtenerProductos()
renderCarrito()

function obtenerProductos() {
    fetch(URL)
        .then(response => response.json())
        .then(data => {
            renderProductos(data)
        })
        .catch(err => console.log("Error desconocido"))
        .finally(() => console.log("finalizo la peticion"))
}

// function renderProductos(listraProductos) {
//     listraProductos.forEach(producto => {
//         const card = document.createElement("div")
//         card.innerHTML = `
//         <h2>Nombre: ${producto.id}</h2>
//         <h3>Nombre: ${producto.nombre}</h3>
//         <h4>Precio: ${producto.precio}</h4>
//         `
//         productosContainer.appendChild(card)
//     })
// }
obtenerProductos()

function renderProductos(listaProductos) {
    productosContainer.innerHTML = ""

    listaProductos.forEach(producto => {
        const card = document.createElement("div")
        card.className = "card m-3"
        card.style.width = "18rem"

        card.innerHTML = `
            <div class="card-body">
                <img src="${producto.imagen}" class= "card-img-top">
                <h5 class="card-title">${producto.nombre}</h5>
                <p class="card-text">Producto gamer de alta calidad</p>
                <button class="btn btn-primary comprar">Comprar</button>
                <button class="btn btn-success">$${producto.precio}</button>
            </div>
        `
        // BOTON COMRAR
        const botonComprar = card.querySelector(".comprar")

        botonComprar.onclick = () => {
            agregarAlCarrito(producto);
        };

        productosContainer.appendChild(card)
    })
}
// CARRITO
function agregarAlCarrito(producto) {

    const existe = carrito.find(function (item) {
        return item.id === producto.id
    })

    if (existe) {
        console.log("Sumando" + producto.nombre);
        existe.cantidad = existe.cantidad + 1
    } else {
        console.log("Agregando" + producto.nombre);

        producto.cantidad = 1
        carrito.push(producto)
    }

    localStorage.setItem("carrito", JSON.stringify(carrito))
    renderCarrito()
}

// SUMAR PRODUCTOS EN EL CARRITO
function renderCarrito() {
    carritoContainer.innerHTML = ""

    if (carrito.length === 0) {
        carritoContainer.innerHTML = "<p>El carrito esta vacio</p>"
        totalCarrito.textContent = "Total $0"
        return
    }

    carrito.forEach(function (prod, index) {
        const item = document.createElement("div")
        item.className = "d-flex justify-content-between mb-2 border-bottom pb-1"

        item.innerHTML = `
            <span>${prod.nombre} (x${prod.cantidad}) - $${prod.precio * prod.cantidad}</span>
            <button class="btn btn-danger btn-sm" onclick="eliminarDelCarrito(${index})">Eliminar</button>
        `
        carritoContainer.appendChild(item)
    })


    sumarTodo()
}

function sumarTodo() {
    let subtotal = 0

    carrito.forEach(function (p) {
        subtotal = subtotal + (p.precio * p.cantidad)
    })
    totalCarrito.textContent = "Total $" + subtotal
}

window.eliminarDelCarrito = function (index) {
    if (carrito[index].cantidad > 1) {
        carrito[index].cantidad = carrito[index].cantidad - 1
    } else {
        carrito.splice(index, 1)
    }

    localStorage.setItem("carrito", JSON.stringify(carrito))
    renderCarrito()
}
botonVaciar.onclick = function () {
    console.log("Vaciando todo.");
    carrito = []
    localStorage.removeItem("carrito")
    renderCarrito()
}

// function agregarAlCarrito (producto){
//     carrito.push(producto)
//     localStorage.setItem("carrito", JSON.stringify(carrito))
//     renderCarrito()
// }

// function renderCarrito (){
//     carritoContainer.innerHTML=""
//     if (carrito.length === 0){
//         carritoContainer.innerHTML = "<p> el carrito esta vacio"
//         totalCarrito.textContent = "Total 0"
//         return
//     }
//     carrito.forEach(producto => {
//         const item = document.createElement ("p")
//         item.textContent = producto.nombre + " - $" + producto.precio
//         carritoContainer.appendChild(item)
//     })
//     calcularTotal()
// }
// function agregarAlCarrito (producto){
//     carrito.push(producto)
//     localStorage.setItem("carrito", JSON.stringify(carrito))
//     renderCarrito()
// }

// function renderCarrito (){
//     carritoContainer.innerHTML=""
//     if (carrito.length === 0){
//         carritoContainer.innerHTML = "<p> el carrito esta vacio </p>"
//         totalCarrito.textContent = "Total 0"
//         return
//     }
//     carrito.forEach(producto => {
//         const item = document.createElement ("p")
//         item.textContent = producto.nombre + " - $" + producto.precio
//         carritoContainer.appendChild(item)
//     })
//     calcularTotal()


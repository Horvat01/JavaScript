const URL = "./db/data.json"
const productosContainer = document.getElementById("contenedorProductos")
const carritoContainer = document.getElementById("carrito")
const totalCarrito = document.getElementById("totalCarrito")
const botonVaciar = document.getElementById("vaciarCarrito")
const botonPagar = document.getElementById("comprarCarrito")

let carrito = JSON.parse(localStorage.getItem("carrito")) || []

obtenerProductos()
renderCarrito()

// fetch unico 
const obtenerProductos = () => {
    fetch(URL)
        .then(res => res.json())
        .then(data => renderProductos(data))
        .catch(() => console.log("Error al cargar productos"))
}

obtenerProductos()
renderCarrito()

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
                <button class="btn btn-primary comprar">Añadir al carrito</button>
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
botonPagar.onclick = function () {
    if (carrito.length === 0) {
        Swal.fire({
            icon: "error",
            title: "No Agregaste nada al carrito",
            text: "Vuelve a intentarlo!",
        });
    }
    else {
        let subtotal = 0

        carrito.forEach(function (p) {
            subtotal = subtotal + (p.precio * p.cantidad)
        })
        totalCarrito.textContent = "Total $" + subtotal
        Swal.fire({
            title: "Continuar con la compra?",
            icon: "success",
            draggable: true,
            confirmButtonText: "Ir a pagar", 
            showCancelButton: true,         
            cancelButtonText: "Seguir viendo"
            }).then(function (result) {
            
            if (result.isConfirmed) {
                
                window.location.href = "../paginas/pagos.html"; 
            } else {
            
                console.log("El usuario decidió quedarse en la tienda");
            }
        });
    }
  
}

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
  onClick: function(){} // Callback after click
}).showToast();


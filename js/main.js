// constantes
const juegos = ["god of War", "fifa","battlefield","gtaV"]
const precios =[80, 120, 150, 200];

let dinero = 150;
let gastado = 0;

let eleccion = parseInt(prompt("Elegir un juego (0-3)"));

if (eleccion >= 0 && eleccion < juegos.length) {

    if (dinero < precios[eleccion]) {
        alert("Saldo insuficiente");
    } 
    else {
        alert("Compra realizada");
        dinero -= precios[eleccion];
        gastado += precios[eleccion];
        console.log(gastado);
    }

} else {
    alert("Opción inválida");
}

for (let i=0; i < juegos.length; i++){
    console.log( juegos [i] + "$" + precios [i]);
}

juegos.push("Rocket League");
console.log(juegos. join(" / "));
console.log(juegos.includes("fifa"));
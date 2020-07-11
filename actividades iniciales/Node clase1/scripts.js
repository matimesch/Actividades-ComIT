//Ejemplo 1

// let b;

// let a = 456;

// console.log(a);

// a = a + 44;

// console.log(a);

// console.log(a%2);

// console.log(b);

// Ejemplo 2

// if (4>2){
//     console.log("Si");
//     console.log("Es verdadero");
// } else{
//     console.log("No");
//     console.log("Es fake");
// }

// Ejemplo 3

const edadSupuesta = 16;
const compraAlcohol = true;

console.log("Tomar el pedido");

if ((edadSupuesta < 18) && (compraAlcohol === true)){
    console.log("controlar documento");
    const edad = 20;
    if (edad < 18){
        console.log("Es menor, no se le puede vender alcohol");
    } else {
        console.log("Es mayor, puede comprar alcohol");
    }

} else{
    console.log("Entregar el pedido");
}





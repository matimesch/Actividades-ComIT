let array = [];
let string
let numero
let arrayDos = []
let acum


for (let i = 1; i <= 200; i++){
    if (i % 11 == 0){
        array.push(i);


    } 
   
}

console.log(array);

console.log(array.join(""));

string = array.join("");

for (let i = 0; i < string.length; i++) {
    numero = parseInt(string[i]);
    arrayDos.push(numero);
}

console.log(arrayDos)

for (let i = 0; i < arrayDos.length; i++) {
    acum = arrayDos[i] * i;
 
}
 
console.log(acum)

const saludo = "Hola me presento me llamo Matías también me puedes llamar esta noche :)";
// const saludo = "Holi como";
// const saludo = "HOLA";
// const saludo = "holas";
// const saludo = "saludados estais chavales, buscad la felicidad"

// 1)
console.log(saludo.indexOf(" "));

// 2)
console.log(saludo.length);

// 3)
if (saludo.length > 10){
    console.log("Tiene más de 10 letras");
}else{console.log("No tiene más de 10 letras")};

// 4)
console.log(saludo.slice(0,4));

// 5)
if (saludo == saludo.toUpperCase()){
    console.log("Está todo en mayúsculas");
}else if(saludo == saludo.toLowerCase()){
    console.log("Está todo en minúsculas");
} else{console.log("Está en mayúsculas  y minúsculas");}

// 6)
console.log(saludo.slice(saludo.lastIndexOf(" ") +1,saludo.length));

// 7)
// console.log(saludo.charAt(saludo.length/2));
if(saludo.charAt(saludo.length/2)==" "){
    console.log(saludo.charAt((saludo.length/2)+1));
}else{
    console.log(saludo.charAt(saludo.length/2));
}

// 8)
if(saludo.charAt(saludo.length/2) == "a" || saludo.charAt(saludo.length/2) == "e" || saludo.charAt(saludo.length/2) == "i" || saludo.charAt(saludo.length/2) == "o" || saludo.charAt(saludo.length/2) == "u"){
    console.log("La letra del medio es vocal");
}else{console.log("La letra del medio no es vocal")}; 

// 9)
// console.log(saludo.indexOf("?"));

if (saludo.indexOf("?")>= 0){
    console.log("Es una pregunta");
}else{console.log("No es una pregunta");}

// 10)
console.log(saludo.replace( "dad", "tud"));

// 11)

if(saludo.indexOf(" ") < 0 ){
    console.log(saludo.toUpperCase());
} else if(saludo.indexOf(" ") == saludo.lastIndexOf(" ")){
    console.log((saludo.slice(0,saludo.indexOf(" ")).toLocaleLowerCase())   + saludo.slice(saludo.indexOf(" ")+1,saludo.indexOf(" ")+2).toUpperCase() + saludo.slice(saludo.indexOf(" ")+2,saludo.length).toLowerCase())
}else(console.log(saludo.toLowerCase()))



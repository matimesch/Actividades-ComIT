// 1)
getListaPrimos(11);


function getNumerosPrimos(numero){

    for (let i = 2; i < numero ; i++) {
        if (numero % i == 0 || numero == 1){
            return false;
        } 
    }
    
    return numero;
}

function getListaPrimos(numero){
    for (let i = 2; i <= numero; i++) {

        if (getNumerosPrimos(i)){
            console.log(`el número ${i} es primo`)
        }
        
    }
}


const pets = [
    {
        name: "pipo",
        age: 13,
        kind: "perro"
    },
    {
        name: "tornillo",
        age: 9,
        kind: "gato"
    },
    {
        name: "braguitas",
        age: 8,
        kind: "perro"
    },
    {
        name: "tornillo",
        age: 6,
        kind: "pez"
    }


]

for (let i = 0; i < pets.length; i++) {
    // calculo año de nacimiento
    let birthYear = 2020 - pets[i].age;
    
    console.log(`${pets[i].name} nació en ${birthYear}`);
    
    // calculo expectativa de vida
    let expectancy = calculateLifeExpectancy(pets[i].kind);
    let expectedYear = 2020 + expectancy - pets[i].age;

    console.log(`esperamos que viva hasta ${expectedYear}`);

}

function calculateLifeExpectancy(kind){
// let kind = lo que recibí como parámetro
    let lifeExpectancy;

    switch (kind) {
        case "perro":
            lifeExpectancy = 15;
            break;
        case "gato":
            lifeExpectancy = 20;
            break;
        case "pez":
            lifeExpectancy = 16;
            break;
        default: undefined;
        break;
    }
    return lifeExpectancy;

}
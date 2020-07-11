const form = document.getElementById("form");
const inputName = document.getElementById("text");
const inputAge = document.getElementById("age");
const container = document.getElementById("container");
const caseSensitive = document.getElementById("caseSensitive");
const isComplete = document.getElementById("isComplete");

const requestPeople = (name,age,caseSensitive,isComplete) => {
    const ajaxRequest = new XMLHttpRequest();

    ajaxRequest.addEventListener("load", function () {
        if (this.status == 200) {
            const resultData = JSON.parse(this.responseText);
            lista(resultData);
        };
    });

    ajaxRequest.open("GET", `/person?name=${name}&age=${age}&case=${caseSensitive ? "y" : "n"}&contains=${isComplete}`);
    ajaxRequest.send();
};

form.addEventListener("submit", (event) => {    
    event.preventDefault();
    requestPeople(inputName.value,inputAge.value,caseSensitive.checked,isComplete.checked);
})

function lista(persons) {
    container.innerHTML = "";
    const newUl = document.createElement("ul");
    for (let i = 0; i < persons.length; i++) {
        const person = persons[i];
        const newLi = document.createElement("li");
        let edad
        if (person.age == 1) {
            edad = "año";
        }
        else {
            edad = "años";
        }
        newLi.innerText = `${person.name}, ${person.age} ${edad}`;
        newUl.appendChild(newLi);
    }
    container.appendChild(newUl);
}
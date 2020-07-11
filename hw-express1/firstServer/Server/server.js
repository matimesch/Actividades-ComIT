const express = require("express");
const app = express();
const path = require("path")
const fs = require("fs");

app.use(express.static(path.join(__dirname, "../client")));

app.get("/", (req, res) => {
    res.status(200).sendfile(path.join(__dirname, "../client/index.html"));
});

app.get("/person", (req, res) => {

    getPeople(function (peopleList) {

        resultados = peopleList;


        if (req.query.name) {
            resultados = resultados.filter(function (person) {
                let nombreDataBase;
                let nombreRecibido;
                if (req.query.case == "y") {
                    nombreDataBase = person.name.toUpperCase();
                    nombreRecibido = req.query.name.toUpperCase();
                };
                if (req.query.case == "n" || req.query.case == undefined) {
                    nombreDataBase = person.name;
                    nombreRecibido = req.query.name;
                }
                console.log(req.query);
                if (req.query.contains == "true") {
                    return nombreDataBase.includes(nombreRecibido);
                }
                return nombreDataBase == nombreRecibido;

            })
        };

        if (req.query.age) {
            resultados = resultados.filter(function (person) {
                let edadDataBase = person.age;
                let edadRecibida = parseInt(req.query.age);
                return edadDataBase >= edadRecibida;
            })
        };

        res.json(resultados);

    });


});

app.listen(7777, () => {
    console.log("Servidor iniciado en el puerto 7777...");
});

// function getPeople() {

//     const content = fs.readFileSync(path.join(__dirname, "persons.json"), "utf8")
//     return JSON.parse(content);

// };

function getPeople(resultCallback) {

    fs.readFile(path.join(__dirname, "persons.json"), "utf8", (err, data) => {


        if (err) {
            console.log("No se pudo leer el archivo.");
            resultCallback([]);
        } else {
            resultCallback(JSON.parse(data));
        }
    });


}

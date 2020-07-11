const fs = require("fs"); // fs = FILE SYSTEM
const path = require("path");
const express = require("express");

const app = express();

// Middleware para rutas a recursos estáticos
app.use(express.static(path.join(__dirname, "../client")));

// Endpoint GET a /person
app.get("/person", (req, res) => {

  console.log("Entré al callback de GET /person");

/* setTimeout(() => {
  res.json({ resultado:"OK"});
}, 2000)
console.log("Datos pedidos")
*/

  getPersonList(personList => {

    console.log("Entré al callback de getPersonList");

    if (req.query.name) {
      res.json(personList.filter(item => item.name.toUpperCase().includes(req.query.name.toUpperCase())));
    } else {
      res.json(personList);
    }

    console.log("Terminó el callback de getPersonList");

  });

  console.log("Terminó el callback de GET /person");

});

// Iniciamos el servidor en el puerto 3000
app.listen(3000, () => {
  // Callback cuando terminó de iniciar, simplemente ponemos un mensaje en la consola para saberlo
  console.log("Servidor iniciado en el puerto 3000...");
});

/**
 * Función que consulta lista de personas
 * 
 * @param {function} resultCallback Callback para recibir resultados como parámetro
 */
function getPersonList(resultCallback) {

  console.log("Inicié ejecución de getPersonList");

  fs.readFile(path.join(__dirname, "persons.json"), "utf8", (err, data) => {
    
    console.log("Entré al callback de readFile");

    if (err) {
      console.log("No se pudo leer el archivo.");
      resultCallback([]);
    } else {
      resultCallback(JSON.parse(data));
    }
  });

  console.log("Finalicé ejecución de getPersonList");

}
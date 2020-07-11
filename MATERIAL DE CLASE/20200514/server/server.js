const express = require("express");
const app = express();

// Módulo "path" con funciones para resolver rutas de archivos con más facilidad
const path = require("path");

// Middleware para rutas a recursos estáticos
app.use(express.static(path.join(__dirname, "../client")));

// Endpoint GET a / (ruta raíz)
app.get("/", (req, res) => {
  // Cuando llega un request a la ruta raíz, retornamos la página inicial.
  res.status(200).sendFile(path.join(__dirname, "../client/index.html"));
});

// Endpoint GET a /person
app.get("/person", (req, res) => {

  // Consulto las personas de una función local definida más abajo
  const personList = getPersonList();

  // Evaluamos si vino una clave "name" en los query parameters
  if (req.query.name) {
    // Si vino, la usamos para filtrar que "name" contenga ese dato
    // (y usamos el toUpperCase para que no sea case sensitive)
    res.json(personList.filter(item => item.name.toUpperCase().includes(req.query.name.toUpperCase())));
  } else {
    // Si no vino ningún filtro, retornamos la lista completa (usamos la función .json(...) del
    // objeto response que convierte el objeto a JSON y agrega la cabecera especificando el tipo
    res.json(personList);
  }

});

// Iniciamos el servidor en el puerto 3000
app.listen(3000, () => {
  // Callback cuando terminó de iniciar, simplemente ponemos un mensaje en la consola para saberlo
  console.log("Servidor iniciado en el puerto 3000...");
});


/**
 * Función que retorna una lista de personas
 */
function getPersonList() {

  // Por ahora esta lista está "hardcodeada", más adelante saldrá de otro lado,
  // pero ya nos sirve para simular un escenario real donde los datos vienen
  // de una función (por ahora sincrónica)
  return [
    {
      name: "Juana",
      age: 1
    },
    {
      name: "Juan",
      age: 33
    },
    {
      name: "Fernando",
      age: 24
    },
    {
      name: "Fernanda",
      age: 42
    },
    {
      name: "Juana",
      age: 16
    },
    {
      name: "Lucía",
      age: 22
    },
    {
      name: "Alfredo",
      age: 67
    },
    {
      name: "Gustavo",
      age: 50
    }
  ];
  
}
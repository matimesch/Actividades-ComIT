const fs = require("fs");
const path = require("path");

/**
 * Consulta todos los datos de personas
 * 
 * @param {function} cbResult callback function(personList: Array)
 */
const getAll = (cbResult) => {
  fs.readFile(path.join(__dirname, "persons.json"), (err, data) => {
    if (err) {
      // No se pudo consultar
      cbResult([]);
    } else {
      cbResult(JSON.parse(data));
    }
  });
}

/**
 * Retorna la persona del id recibido
 * 
 * @param {string} id Id de la persona buscada
 * @param {function} cbResult callback function(persona: object)
 */
const getById = (id, cbResult) => {
  // Todavía no implementada
  return {};
}

// Exportación de las 3 funciones
module.exports = {
  getAll: getAll,
  getById: getById
};
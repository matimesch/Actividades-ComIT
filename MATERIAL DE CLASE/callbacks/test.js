console.log("Inicio del hilo principal");

const fs = require("fs");
const path = require("path");

/**
 * Lectura sincrónica de archivo JSON
 * 
 * @param {string} filename Nombre del archivo a leer
 */
const readJSONSync = (filename) => {
  console.log(`Leyendo sincrónicamente ${filename}...`)
  const result = JSON.parse(fs.readFileSync(path.join(__dirname, filename)));
  console.log(`Terminó la lectura sincrónica, se retornan los datos.`);
  return result;
}

/**
 * Lectura asincrónica de archivo JSON
 * 
 * @param {string} filename Nombre del archivo
 * @param {function} cbOK callback function(dataList: Array)
 * @param {function} cbErr callback function(error: string)
 */
const readJSONAsync = (filename, cbOK, cbErr) => {
  console.log(`Se pide a fs la lectura asincrónica de ${filename}...`);
  fs.readFile(path.join(__dirname, "persons.json"), (err, data) => {
    console.log("Inicio del callback de fs.readFile")
    if (err) {
      console.log("Se retorna mensaje de error.")
      cbErr("No se pudo leer el archivo: " + err.message);
    } else {
      console.log("Se retornan los datos.")
      cbOK(JSON.parse(data));
    }
    console.log("Fin del callback de fs.readFile")
  });
  console.log(`Se hizo el pedido de lectura asincrónica.`);
}

console.log("Voy a leer asincrónicamente...");
readJSONAsync("persons.json",
  // Callback de resultado ok, recibe datos
  data1 => {
    console.log(`Terminó la lectura asincrónica de ${data1.length} personas`);
  },
  // Callback de error, recibe string con texto de error
  errMsg => {
    console.log(errMsg);
  }
);

console.log("Ahora voy a leer sincrónicamente...");
const data2 = readJSONSync("persons2.json")
console.log("Hecha la lectura sincrónica de " + data2.length + " personas.");

console.log("Fin del hilo principal");
console.log("------------------------------------------");
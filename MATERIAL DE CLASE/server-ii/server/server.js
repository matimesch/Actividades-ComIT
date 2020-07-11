const HTTP_PORT = 4444;

const express = require("express");
const path = require("path");
const expHbs = require("express-handlebars");
const persons = require("./persons");

const app = express();

// ----------------------------------------------------------
// Configuración de Handlebars

app.set("view engine", "handlebars");

app.engine("handlebars", expHbs({
  defaultLayout: "main",
  layoutsDir: path.join(__dirname, "views/layouts")
}));

app.set("views", path.join(__dirname, "views"));
// ----------------------------------------------------------

// Landing page estática
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

// Vista "home" con lista de personas
app.get("/home", (req, res) => {

  // Consulta asincrónica de todas las personas al módulo
  // "persons" importado con require al principio
  persons.getAll(list => {
    // Con esos datos renderiza la vista "home" (los datos se reciben
    // en la vista como array "persons") y la envía al browser.
    res.render("home", { persons: list });
  });
  
});

// Vista "profile" con datos de una persona
app.get("/person/:id", (req, res) => {
  // Todavía no implementada. Va a utilizar una vista "profile" de handlebars
  // con datos obtenidos de presons.getById
  res.send(200).send("Vista todavía no implementada...")
});

// Inicio del servidor
app.listen(HTTP_PORT, () => {
  console.log(`Servidor iniciado en http://localhost:${HTTP_PORT}/ ...`)
});

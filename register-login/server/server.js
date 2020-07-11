const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const fs = require("fs");

const app = express();

app.use(bodyParser.json());

let userList = [];

// GET de página inicial
app.get("/", (req, res) => {
  // Retorna página inicial
  res.sendFile(path.join(__dirname, "../client/index.html"));
});

// GET de página de registro
app.get("/register-page", (req, res) => {
  // Retorna página de registro
  res.sendFile(path.join(__dirname, "../client/register.html"));
});

// GET de página de registro
app.get("/home", (req, res) => {
  // Retorna página de registro
  res.sendFile(path.join(__dirname, "../client/home.html"));
});

// POST /register - Registrar usuario
app.post("/register", (req, res) => {
  console.log(req.body); // { username: 'admin', password: 'admin' }

  // Verificar si recibí los datos y validarlos
  if (!req.body.username || !req.body.password || !req.body.confirmPassword) {
    res.status(400).send("No se recibieron los datos correctos.");
    return;
  } 


  // Tengo los tres datos, los valido

  // Valido si existe el nombre de usuario
  if (userList.filter(user => user.username === req.body.username).length > 0) {
    res.status(409).send("Ya existe usuarix con ese nombre.");
    return;
  }

  // Valido si la contraseña está escrita correctamente 2 veces

  if(req.body.password !== req.body.confirmPassword){
  res.status(409).send("Las contraseñas no coinciden.");
  return;
  }

 

  userList.push({
    username: req.body.username,
    password: req.body.password
  });

  console.log(userList);

  res.status(200).send("Usuarix registradx.");

});

// POST /login - login de usuario
app.post("/login", (req, res) => {

  console.log(req.body);

  // Verificar si recibí los datos y validarlos
  if (!req.body.username || !req.body.password) {
    res.status(400).send("No se recibieron los datos correctos.");
    return;
  }

  if (userList.filter(user => user.username === req.body.username && user.password === req.body.password).length > 0) {
    res.status(200).send();
  } else {
    res.status(403).send();
  }

});



app.get("/phrases", (req, res) => {
getPhrases(function(phraseList){
  let result;
  if (req.query.phrases){
      result = phraseList.filter(function(phrasesList){
      let phraseDB = phrasesList.toUpperCase();
      let phraseRec = req.query.phrases.toUpperCase();
      return phraseDB.includes(phraseRec);
    })
  }
  res.json(result.slice(0,5));
})

})

function getPhrases(resultCallback) {
  fs.readFile(path.join(__dirname,"phrases.json"), "utf8", (err,data) => {
    if(err){
      console.log("No se pudo leer el archivo");
      resultCallback([]);
    }else{
      console.log("Archivo leído correctamente");
      resultCallback(JSON.parse(data));
    }
  })
}

app.listen(4000, () => {
  console.log("Server iniciado en puerto 4000...")
});

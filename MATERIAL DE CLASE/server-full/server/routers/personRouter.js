const express = require("express");
const persons = require("../persons");

const personRouter = express.Router();

// Vista de Home
personRouter.get("/home", (req, res) => {
  if (req.session.loggedUser) {
    // Renderizado de home con datos de personas
    persons.getAll(req.query.nameFilter, (list) => res.render("home", {
      layout: "logged",
      persons: list,
      user: req.session.loggedUser
    }));
  } else {
    res.redirect("/pages/login");
  }
});

// Vista "profile" con datos de una persona
personRouter.get("/:id", (req, res) => {

  if (req.session.loggedUser) {
    // Consulta una persona que tenga ese id (si no está, retorna undefined)
    persons.getById(req.params.id, personItem => {
      // Con ese dato renderizo "profile"
      res.render("profile", {
        layout: "logged",
        person: personItem,
        user: req.session.loggedUser
      });
    })
  } else {
    res.redirect("/pages/login");
  }

});


personRouter.post("/:id/message", (req, res) => {

  if (req.session.loggedUser) {

    persons.saveMessage(req.params.id, req.body.message, result => {
      if (result.success) {
        res.render("profile", {
          layout: "logged",
          person: result.updatedPerson
        });
      }
    });

  } else {
    res.redirect("/pages/login");
  }

});

personRouter.get("/", (req, res) => {
  persons.getAll(req.query.name, (list) => res.status(200).json(list));
});

module.exports = personRouter;
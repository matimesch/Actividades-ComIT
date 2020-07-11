const db = require("./const-db");

/**
 * Consulta todos los datos de personas
 * 
 * @param {function} cbResult callback function(personList: Array)
 */
const getAll = (nameFilter, cbResult) => {
  db.MongoClient.connect(db.url, db.config, (err, client) => {
    if (err) {
      // retornar array vacío
      cbResult([]);
      client.close();
    } else {
      const serveriiDB = client.db("serverii");
      const personsCollection = serveriiDB.collection("persons");

      const filter = {};

      if (nameFilter) {
        filter.name = { $regex: `.*${nameFilter}.*` };
      }

      personsCollection.find(filter).sort( { name: 1 } ).toArray((err, personList) => {
        if (err) {
          // retornar array vacío
          cbResult([]);
        } else {
          // retornar array con datos
          personList = personList.map(person => ({
            oid: person._id.toString(),
            name: person.name,
            surname: person.surname,
            profilePic: person.profilePic,
            age: person.age,
            messageList: person.messageList
          }));
          cbResult(personList)
        }
        client.close();
      });

    }
  });
}


/**
 * Retorna la persona del id recibido
 * 
 * @param {string} filterId Id de la persona buscada
 * @param {function} cbResult callback function(persona: object)
 * 
 * @returns {object | undefined} Objeto con datos de la persona encontrada o undefined si no se encuentra
 */
const getById = (filterId, cbResult) => {
  db.MongoClient.connect(db.url, db.config, (err, client) => {
    if (err) {
      // retornar array vacío
      cbResult(undefined);
      client.close();
    } else {
      const serveriiDB = client.db("serverii");
      const personsCollection = serveriiDB.collection("persons");

      personsCollection.findOne({ _id: new db.mongodb.ObjectID(filterId) }, (err, person) => {

        // retornar array con datos
        if (err) {
          cbResult(undefined);
        } else {
          cbResult({
            oid: person._id.toString(),
            name: person.name,
            surname: person.surname,
            profilePic: person.profilePic,
            age: person.age,
            messageList: person.messageList
          });
        }

        client.close();
      });

    }
  });
}

/**
 * Función que agrega mensaje para una persona
 * 
 * @param {string} personId 
 * @param {string} message 
 * @param {function} cbResult Callback: function({
 *   success: boolean,
 *   updatedPerson: objeto de persona
 * })
 */
const saveMessage = (personId, message, cbResult) => {

  // Esta función es fake, debería insertar en la DB y devolver
  // los datos de la persona actualizados para refrescar la vista "profile"

  getById(personId, person => {

    const fakeUpdatedPerson = person;

    fakeUpdatedPerson.messageList.push(message);

    cbResult({
      success: true,
      updatedPerson: fakeUpdatedPerson
    })

  })

}

// Exportación de las 3 funciones
module.exports = {
  getAll,
  getById,
  saveMessage
};
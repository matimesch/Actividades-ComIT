const mongodb = require("mongodb");
const mongoURL = "mongodb://localhost:27017";

/**
 * Función que valida user/pass. Retorna un objeto con un boolean que indica si las credenciales
 * son válidas y un string con un mensaje para errores.
 * 
 * @param {string} user Username
 * @param {string} pass Passwor
 * @param {function} cbResult Callback: function(result: { valid: boolean, msg: string })
 */
const login = (user, pass, cbResult) => {
  // Nos conectamos al servidor de MongoDB
  mongodb.MongoClient.connect(mongoURL, (err, client) => {

    if (err) {

      // Si no me pude conectar al server, retorno el false con un mensaje apropiado para el front
      cbResult({
        valid: false,
        msg: "Sorry, site is under maintenance now, retry later."
      });

    } else {

      const serveriiDB = client.db("serverii");
      const usersCollection = serveriiDB.collection("users");

      usersCollection.findOne({ user: user, password: pass }, (err, foundUser) => {

        if (err) {

          // Si no pude consultar la colección, también retorno false con un mensaje, pero
          // lo hago ligeramente diferente al anterior para poder distinguir errores.
          cbResult({
            valid: false,
            msg: "Sorry, the site is under maintenance now, retry later."
          });

        } else {

          // Si pude consultar los datos, valido si encontré esa combinación usr/pwd o no.
          if (!foundUser) {
            cbResult({
              valid: false,
              msg: "Invalid user/password."
            });
          } else {
            // Si valida ok, no mando mensaje porque no se va a usar.
            cbResult({
              valid: true
            });
          }

        }

        client.close();
      });

    }

  });
}

/**
 * Función que consulta usuarix en la DB y retorna los datos
 * 
 * @param {string} username Nombre de usuarix
 * @param {function} cbResult Callback: function(result: {
 *  success: boolean,
 *  user: {
 *    user: string,
 *    password: string
 *  }
 * })
 */
const getUser = (username, cbResult) => {

  mongodb.MongoClient.connect(mongoURL, (err, client) => {

    if (err) {

      cbResult({
        success: false
      });

    } else {

      const serveriiDB = client.db("serverii");
      const usersCollection = serveriiDB.collection("users");

      usersCollection.findOne({ user: username }, (err, result) => {

        if (err) {
          cbResult({
            success: false
          });
        } else {
          cbResult({
            success: true,
            user: result
          });
        }

        client.close();

      });

    }

  });

}

/**
 * Función que registra nuevx usuarix (asume username y password validados)
 * 
 * @param {string} username Username
 * @param {string} password Password
 * @param {function} cbResult Callback: function(result: boolean)
 */
const registerUser = (username, password, cbResult) => {
  mongodb.MongoClient.connect(mongoURL, (err, client) => {

    if (err) {

      // Si hay error de conexión, retornamos el false
      // (no cerramos conexión porque no se logró abrir)
      cbResult(false);

    } else {

      const serveriiDB = client.db("serverii");
      const usersCollection = serveriiDB.collection("users");

      const newUser = {
        user: username,
        password: password
      };

      // Insertamos el user en la DB
      usersCollection.insertOne(newUser, (err, result) => {
        
        if (err) {
          cbResult(false);
        } else {
          cbResult(true);
          // console.log(result);
        }

        client.close();
      });

    }

  });
}

module.exports = {
  login,
  getUser,
  registerUser
}
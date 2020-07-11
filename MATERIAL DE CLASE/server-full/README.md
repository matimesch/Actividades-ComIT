# Clase Jueves 11/06/2020

## MongoDB - Update

Vimos cómo se hace una modificación de un documento en la base de datos de MongoDB. Para esto podemos usar la función "updateOne" si queremos modificar un solo documento o "updateMany" si queremos modificar varios. En ambos casos la sintaxis es la misma: `updateOne(consulta, valoresNuevos, callback)`. Por ejemplo:

```javascript
// El objeto que pasamos para encontrar el documento a modificar (se arma de la
// misma forma que el objeto de filtro para el find o findOne). Si hay más de
// un objeto que coincida, va a tomar solo el primero.
const findQuery = { user: username };

// Un objeto que contenga otro objeto "$set" indicando el nuevo valor o los nuevos
// valores para los atributos del objeto coincidente con la query
const updateQuery = {
  $set: {
    password: newPassword
  }
};

// Ejecutamos el update.
usersCollection.updateOne(findQuery, updateQuery, (err, result) => {
```

`updateMany` funciona exactamente igual, solo que los documentos afectados van a ser todos los que cumplan con la query.

En este ejemplo implementamos un formulario (en la vista `changepass`) para el cambio de password usando una función que implementa el updateOne de mongo.

## Filtrado de datos en la vista home

Agregamos un filtrado de datos en la vista home (la lista de personas) y vimos dos abordajes posibles: uno con recarga de página y otro con AJAX.

#### Recargando la vista

El que reacarga quedó comentado, pero funciona haciendo que el botón de filtrar dispare una navegación a al misma ruta de home pero agregando por query parameters el filtro:

```javascript
window.location.href = `/person/home?nameFilter=` + document.getElementById("nameFilter").value;
```

Eso dispara un request GET a "person/home" con ese query parameter creado, que se pasa a la función que consulta (`persons.getAll(req.query.nameFilter, ...`) y se usa como filtro. Para eso, vimos el uso de una expresión regular sencilla en el objeto de query para MongoDB:

```javascript
{ $regex: `.*${nameFilter}.*` };
```

El resultado filtrado es el que se usa para renderizar la vista.

#### Con AJAX

El otro abordaje es el que se ejecuta sin recargar la página, usando un request AJAX y modificando el DOM con la respuesta, como ya hicimos otras veces, y es el que quedó implementado. Nos requirió agregar un nuevo endpoint GET /person que retorne un JSON con la lista de personas.

## Express Routers

Vimos la utilización del middleware Router de Express, que nos sirve para modularizar un poco (repartir en módulos / archivos) el código y que no nos quede toda la lógica de ruteos en el js donde iniciamos el server.

Lo que hacemos es crear ruteos a distintos módulos (distintos js) que implementan ese Router, y lo hacemos según algún criterio del contenido de la url. En este caso lo hacemos así:

```javascript
const pagesRouter = require("./routers/pagesRouter.js");
const personRouter = require("./routers/personRouter.js");
const authRouter = require("./routers/authRouter.js");

// .......

app.use("/pages", pagesRouter);
app.use("/person", personRouter);
app.use("/auth", authRouter);
```

Eso quiere decir que, por ejemplo, cualquier request de una url que empiece con "/auth" va a ser manejado por el Router creado en authRouter, que es el archivo authRouter.js. En ese archivo declaramos un Router y asignamos en él las rutas para los distintos métodos, igual que lo haríamos en el objeto app de Express. Tener en cuenta que la ruta que ya fue evaluada en el middleware (en este caso, "/auth") no se considera en la url del Router, sino que se especifica la ruta posterior a esa inicial. Es decir, un request POST a "/auth/login" va a llegar al authRouter como un POST a "/login":

```javascript
const authRouter = express.Router();

// Endpoint /auth/login que valida user/pass (form)
authRouter.post("/login", (req, res) => { 
  //...
});
```
Ese Router generado lo exportamos para que pueda ser importado desde el server.js.

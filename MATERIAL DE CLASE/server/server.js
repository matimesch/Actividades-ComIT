const express = require("express");
const app = express();

app.get("/test", function (req, res) {
  
  console.log("Llegó un GET a /test");

  try {

    const responseData = {
      testResult: "Storage alert",
      storageAvailable: "2%"
    };

    const jsonResponse = JSON.stringify(responseData);

    res.status(200).send(jsonResponse);

  } catch (ex) {
    res.status(500).send(ex.message);
  }

});

app.listen(3000, () => {
  console.log("Servidor iniciado en el puerto 3000...");
});

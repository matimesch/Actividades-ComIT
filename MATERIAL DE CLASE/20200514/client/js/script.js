window.addEventListener("load", () => {

  const ajaxRequest = new XMLHttpRequest();

  ajaxRequest.addEventListener("load", function() {
    if (this.status == 200) {

      const resultData = JSON.parse(this.responseText);
      console.log(resultData);

      document.getElementById("result").textContent = "Datos consultados, ver en consola.";

    } else {
      document.getElementById("result").textContent = `Error de consulta, status code ${this.status}`;
    }
  });

  ajaxRequest.open("GET", "/person");
  ajaxRequest.send();

})
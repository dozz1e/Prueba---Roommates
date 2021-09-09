const http = require("http");
const fs = require("fs");
const url = require("url");
const { nuevoRommie } = require("./modulos/roommates");
const {
  nuevoGasto,
  eliminarGasto,
  actualizarGastoRommie,
  gastoPut,
} = require("./modulos/gasto");

http
  .createServer(async (req, res) => {
    // Creación de servidor
    if (req.url == "/" && req.method == "GET") {
      // Página raíz
      res.setHeader("content-type", "text/html");
      console.log(`Código ruta /: ${res.statusCode}`);
      res.end(fs.readFileSync("index.html", "utf8"));
    }

    if (req.url.startsWith("/roommate") && req.method == "POST") {
      // Información de nuevo roommate
      console.log(`Código ruta /roommate: ${res.statusCode}`);
      await nuevoRommie(res);
      await actualizarGastoRommie();
    }

    if (req.url.startsWith("/roommates") && req.method == "GET") {
      // Obtener información de roommates
      console.log(`Código ruta /roommates: ${res.statusCode}`);
      res.setHeader("Content-Type", "application/json");
      res.end(fs.readFileSync("./json/roommates.json", "utf8"));
    }

    if (req.url.startsWith("/gastos") && req.method == "GET") {
      // Obtener información de gastos
      console.log(`Código ruta /gastos: ${res.statusCode}`);
      res.setHeader("Content-Type", "application/json");
      res.end(fs.readFileSync("./json/gastos.json", "utf8"));
    }

    if (req.url.startsWith("/gasto") && req.method == "POST") {
      // Información de los gastos
      console.log(`Código ruta /gasto POST: ${res.statusCode}`);
      await nuevoGasto(req, res).then((gasto) => {
        res.end(JSON.stringify(gasto));
      });
    }

    if (req.url.startsWith("/gasto") && req.method == "PUT") {
      // Actualizar gastos
      console.log(`Código ruta /gasto PUT: ${res.statusCode}`);
      await gastoPut(req, res);
    }

    if (req.url.startsWith("/gasto") && req.method == "DELETE") {
      // Borrar gasto
      console.log(`Código ruta /DELETE: ${res.statusCode}`);
      const params = url.parse(req.url, true).query;
      const idCosto = params.id;
      await eliminarGasto(idCosto, res);
    }
  })
  .listen(3000, () => console.log("Servidor ON http://localhost:3000"));

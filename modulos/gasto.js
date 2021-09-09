const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const { actualizarRommie } = require("./roommates");
const send = require("./correo");
const url = require("url");

const nuevoGasto = async (req, res) => {
  let body = "";
  req.on("data", (chunk) => {
    body += chunk.toString();
  });
  req.on("end", () => {
    const gasto = JSON.parse(body);
    gasto.id = uuidv4();
    guardarGasto(gasto, res);
    send(gasto);
  });
};

const guardarGasto = async (gasto, res) => {
  try {
    const gastosJSON = await JSON.parse(
      fs.readFileSync("./json/gastos.json", "utf8")
    );
    gastosJSON.gastos.push(gasto);
    fs.writeFile("./json/gastos.json", JSON.stringify(gastosJSON), (err) => {
      err
        ? console.log("No se pudo agregar el gasto")
        : console.log("Gasto Actualizado");
      res.end("Gasto actualizado con éxito");
    });
    actualizarRommie(gasto);
  } catch (err) {
    console.log(err);
  }
};

const actualizarGasto = async (gastos, res) => {
  try {
    fs.writeFile("./json/gastos.json", JSON.stringify(gastos), (err) => {
      if (err) console.log("No se pudo agregar el gasto");
      else {
        console.log("Gasto Actualizado");
        actualizarGastoRommie();
        res.end();
      }
    });
  } catch (err) {
    console.log(err);
  }
};

const eliminarGasto = async (id, res) => {
  try {
    const gastosJSON = await JSON.parse(
      fs.readFileSync("./json/gastos.json", "utf8")
    );

    let gastoUpdate = {};
    gastoUpdate.gastos = gastosJSON.gastos.filter((gasto) => {
      if (gasto.id != id) return gasto;
    });
    actualizarGasto(gastoUpdate, res);
  } catch (err) {
    console.log(err);
  }
};

const actualizarGastoRommie = async () => {
  try {
    const gastosJSON = await JSON.parse(
      fs.readFileSync("./json/gastos.json", "utf8")
    );
    const roommiesJSON = await JSON.parse(
      fs.readFileSync("./json/roommates.json", "utf8")
    );

    let gastos = [];
    let divisor = roommiesJSON.roommates.length;
    gastos = gastosJSON.gastos.map((room) => {
      return {
        id: room.idroommie,
        monto: room.monto / divisor,
      };
    });

    let roommies = {};
    roommies.roommates = roommiesJSON.roommates.map((room) => {
      room.recibe = 0;
      room.debe = 0;
      gastos.forEach((gasto) => {
        if (gasto.id === room.id) room.recibe += gasto.monto;
        else room.debe += gasto.monto;
      });
      return room;
    });
    fs.writeFileSync("./json/roommates.json", JSON.stringify(roommies));
  } catch (err) {
    console.log(err);
  }
};

const gastoPut = async (req, res) => {
  let body = "";
  const params = url.parse(req.url, true).query;
  const idCosto = params.id;
  req.on("data", (chunk) => {
    body += chunk.toString();
  });
  req.on("end", async () => {
    const nuevoGasto = JSON.parse(body);
    const idroommie = nuevoGasto.idroommie;
    const room = nuevoGasto.roommate;
    const desc = nuevoGasto.descripcion;
    const monto = nuevoGasto.monto;
    const gastosJSON = await JSON.parse(
      fs.readFileSync("./json/gastos.json", "utf8")
    );
    let gastoUpdate = {};
    gastoUpdate.gastos = gastosJSON.gastos.map((gasto) => {
      if (gasto.id === idCosto) {
        gasto.idroommie = idroommie;
        gasto.roommate = room;
        gasto.descripcion = desc;
        gasto.monto = monto;
      }
      return gasto;
    });
    actualizarGasto(gastoUpdate, res);
  });
};

module.exports = {
  nuevoGasto,
  actualizarGastoRommie,
  eliminarGasto,
  actualizarGasto,
  guardarGasto,
  gastoPut,
};

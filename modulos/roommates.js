const axios = require("axios");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");

const nuevoRommie = async (res) => {
  let newUsuario = {};
  await axios
    .get("https://randomuser.me/api/")
    .catch((err) => console.log(err))
    .then((datos) => {
      const data = datos.data.results;
      newUsuario = {
        id: uuidv4(),
        correo: data[0].email,
        nombre: `${data[0].name.first} ${data[0].name.last}`,
        foto: data[0].picture.thumbnail,
        debe: 0,
        recibe: 0,
      };
      return newUsuario;
    })
    .then(async (rommie) => {
      await guardarRommie(rommie);
      res.end(JSON.stringify(rommie));
    })
    .catch((err) => {
      console.log(err);
    });
};

const guardarRommie = async (rommie) => {
  try {
    const roommiesJSON = await JSON.parse(
      fs.readFileSync("./json/roommates.json", "utf8")
    );
    roommiesJSON.roommates.push(rommie);
    fs.writeFileSync("./json/roommates.json", JSON.stringify(roommiesJSON));
  } catch (err) {
    console.log(err);
  }
};

const actualizarRommie = async (gasto) => {
  try {
    const roommiesJSON = await JSON.parse(
      fs.readFileSync("./json/roommates.json", "utf8")
    );
    let roommies = {};
    let pago = gasto.monto / roommiesJSON.roommates.length;
    roommies.roommates = roommiesJSON.roommates.map((room) => {
      if (room.id == gasto.idroommie) room.recibe += pago;
      else room.debe += pago;
      return room;
    });
    fs.writeFileSync("./json/roommates.json", JSON.stringify(roommies));
  } catch (err) {
    console.log(err);
  }
};

module.exports = { nuevoRommie, actualizarRommie, guardarRommie };

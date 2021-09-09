const nodemailer = require("nodemailer");
const fs = require("fs");

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "fullstack.js.0028@gmail.com",
    pass: "Edutecno.2021",
  },
});

const send = async (gasto) => {
  // Envío correos
  try {
    const roommiesJSON = await JSON.parse(
      fs.readFileSync("./json/roommates.json", "utf8")
    );
    let correos = [];
    roommiesJSON.roommates.forEach((room) => {
      correos.push(room.correo);
    });

    let texto = `
      <h5>Se ha registrado un nuevo gasto</h5>
      <ul>
        <li>Nombre: ${gasto.roommate}</li>
        <li>Descripción: ${gasto.descripcion}</li>
        <li>Monto: $${gasto.monto}</li>
        <li>Identificador: ${gasto.id}</li>
      </ul>
    `;

    return new Promise(async (resolve, reject) => {
      let mailOptions = {
        from: "fullstack.js.0028@gmail.com",
        to: ["darkozzie@gmail.com"].concat(correos),
        subject: "Se ha registrado un nuevo gasto",
        html: texto,
      };

      transporter.sendMail(mailOptions, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports = send;

const mongoose = require("mongoose");

const ConnectDB = async () => {
    try {
      await mongoose.connect(process.env.DB_URL);
      console.log("Contectado correctamente a la BBDD 😍");
    } catch (error) {
      console.log("Error en la conexión a la BBDD 😒");
    }
  };
  
  module.exports = { ConnectDB };
  
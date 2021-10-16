require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { dbConection } = require("./database/config");

const port = process.env.PORT;
//crear el servidor de express
const app = express();

//base de datos
dbConection();

//configurar cors
app.use(cors());

//lectura y parseo del body
app.use(express.json());

//rutas
// rutas de autenticacion
app.use("/api/login", require("./routes/auth"));

// rutas de usuarios
app.use("/api/usuarios", require("./routes/usuarios"));

// rutas de hospitales
app.use("/api/hospitales", require("./routes/hospitales"));

// rutas de medicos
app.use("/api/medicos", require("./routes/medicos"));

// rutas de busquedas
app.use("/api/todo", require("./routes/busquedas"));
// rutas de busquedas
app.use("/api/upload", require("./routes/upload"));

//iniciar el sevidor
app.listen(port, () => {
    console.log("servidor corriendo en puerto " + port);
});
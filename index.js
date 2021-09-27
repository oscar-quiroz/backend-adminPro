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
app.use("/api/usuarios", require("./routes/usuarios"));
app.use("/api/login", require("./routes/auth"));

app.listen(port, () => {
    console.log("servidor corriendo en puerto " + port);
});
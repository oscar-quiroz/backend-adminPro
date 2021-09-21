require('dotenv').config();
const express = require("express");
const cors = require('cors');
const { dbConection } = require('./database/config')

const port = process.env.PORT;
//crear el servidor de express
const app = express();

//base de datos
dbConection();

//configurar cors
app.use(cors())

//rutas
app.get('/', (req, res) => {
    res.json({
        ok: true,
        titulo: "dimelo"
    })
});

app.listen(port, () => {
    console.log("servidor corriendo en puerto " + port);
});
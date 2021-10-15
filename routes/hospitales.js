/**
 * Hospitales
 * ruta: /api/hospitales
 */

const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJwt } = require("../middlewares/validar-jwt");

const {
    getHospitales,
    crearHospitales,
    actualizarHospitales,
    borrarHospitales
} = require('../controladores/hospitales.controller')

const router = Router();

router.get("/", getHospitales);

router.post(
    "/", [

    ],
    crearHospitales
);

router.put(
    "/:id", [

    ],
    actualizarHospitales
);

router.delete("/:id", borrarHospitales);

module.exports = router;
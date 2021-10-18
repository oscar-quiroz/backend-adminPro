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
    borrarHospitales,
} = require("../controladores/hospitales.controller");

const router = Router();

router.get("/", [], getHospitales);

router.post(
    "/", [
        validarJwt,
        check("nombre", "el nombre del hospital es necesario ").not().isEmpty(),
        validarCampos,
    ],
    crearHospitales
);

router.put(
    "/:id", [
        validarJwt,
        check("nombre", "el nombre del hospital es necesario ").not().isEmpty(),
        validarCampos,
    ],
    actualizarHospitales
);

router.delete("/:id", [
    validarJwt,
], borrarHospitales);

module.exports = router;
/**
 * Medicos
 * ruta: /api/medicos
 */

const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJwt } = require("../middlewares/validar-jwt");

const {
    getMedicos,
    crearMedicos,
    actualizarMedicos,
    borrarMedicos,
} = require("../controladores/medicos.controller");

const router = Router();

router.get("/", getMedicos);

router.post(
    "/", [
        validarJwt,
        check("nombre", "el nombre del medico es necesario ").not().isEmpty(),
        check("hospital", "el hospital id debe ser valido").isMongoId(),
        validarCampos,
    ],
    crearMedicos
);

router.put(
    "/:id", [
        validarJwt,
        check("nombre", "el nombre del medico es necesario ").not().isEmpty(),
        check("hospital", "el hospital id debe ser valido").isMongoId(),
        validarCampos,
    ],
    actualizarMedicos
);

router.delete("/:id", [validarJwt], borrarMedicos);

module.exports = router;
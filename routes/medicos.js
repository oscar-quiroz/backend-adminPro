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

router.post("/", [], crearMedicos);

router.put("/:id", [], actualizarMedicos);

router.delete("/:id", borrarMedicos);

module.exports = router;
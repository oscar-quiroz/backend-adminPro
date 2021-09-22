/**
 * Ruta: /api/usuarios
 */
const { Router } = require("express");
const {
    getUsuarios,
    crearUsuario
} = require("../controladores/usuario.controller");
const { check } = require("express-validator");
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.get("/", getUsuarios);

router.post(
    "/", [
        check("nombre", "El nombre es obligatorio").not().isEmpty(),
        check("password", "La constraseña es obligatoria").not().isEmpty(),
        check("email", "El correo es obligatorio").isEmail(),
        validarCampos
    ], crearUsuario
);

module.exports = router;
/**
 * Ruta: /api/usuarios
 */
const { Router } = require("express");
const {
    getUsuarios,
    crearUsuario,
    actualizarUsuario,
    eliminarUsuario,
} = require("../controladores/usuario.controller");

const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJwt } = require("../middlewares/validar-jwt");

const router = Router();

router.get("/", [validarJwt], getUsuarios);

router.post(
    "/", [

        check("nombre", "El nombre es obligatorio").not().isEmpty(),
        check("password", "La constraseña es obligatoria").not().isEmpty(),
        check("email", "El correo es obligatorio").isEmail(),
        validarCampos,
    ],
    crearUsuario
);

router.put(
    "/:id", [
        validarJwt,
        check("nombre", "El nombre es obligatorio").not().isEmpty(),
        check("role", "El rol es obligatorio").not().isEmpty(),
        check("email", "El correo es obligatorio").isEmail(),
        validarCampos,
    ],
    actualizarUsuario
);

router.delete("/:id", [validarJwt], eliminarUsuario);

module.exports = router;
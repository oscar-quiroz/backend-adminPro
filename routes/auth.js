//poath 'api/login
const { Router } = require("express");
const { check } = require("express-validator");
const { login, googleSignIn } = require("../controladores/auth.controller");
const { validarCampos } = require("../middlewares/validar-campos");

const router = Router();

router.post(
    "/", [
        check("email", "El correo es obligatorio").isEmail(),
        check("password", "Contraseña es obligatoria").not().isEmpty(),
        validarCampos,
    ],
    login
);

router.post(
    "/google", [
        check("token", "Token de google debe ser obligatorio").not().isEmpty(),
        validarCampos,
    ],
    googleSignIn
);

module.exports = router;
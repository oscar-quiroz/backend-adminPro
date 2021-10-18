//poath 'api/login
const { Router } = require("express");
const { check } = require("express-validator");
const { login, googleSignIn, renewToken } = require("../controladores/auth.controller");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJwt } = require("../middlewares/validar-jwt");

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

router.get("/renew", [validarJwt], renewToken);

module.exports = router;
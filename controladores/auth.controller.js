const { response } = require("express");
const Usuario = require("../models/usuario");
const bcrypt = require("bcryptjs");
const { generarJWT } = require("../helpers/jwt");
const { googleVerify } = require("../helpers/google-verify");

const login = async(req, res = response) => {
    const { email, password } = req.body;

    try {
        //verificar email
        const usuarioDB = await Usuario.findOne({ email });
        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: "email no valido",
            });
        }

        //verificar contraseña
        const validPasword = bcrypt.compareSync(password, usuarioDB.password);
        if (!validPasword) {
            return res.status(400).json({
                ok: false,
                msg: "Contraseña no valida",
            });
        }

        //generar el jwt
        const token = await generarJWT(usuarioDB.id);

        res.json({
            ok: true,
            msg: "Sesion iniciada correctamente",
            token,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "error inesperado",
        });
    }
};

const googleSignIn = async(req, res) => {
    const googleToken = req.body.token;

    try {
        const { name, email, picture } = await googleVerify(googleToken);

        res.json({
            ok: true,
            msg: "Google sign",
            name,
            email,
            picture



        });
    } catch (error) {
        res.status(401).json({
            ok: false,
            msg: "Token no es correcto",
        });
    }
};

module.exports = {
    login,
    googleSignIn,
};
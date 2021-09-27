const { response } = require("express");
const Usuario = require('../models/usuario')
const bcrypt = require("bcryptjs");

const login = async(req, res = response) => {

    const { email, password } = req.body;

    try {

        //verificar email
        const usuarioDB = await Usuario.findOne({ email });
        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'email no valido'
            })
        }

        //verificar contraseña
        const validPasword = bcrypt.compareSync(password, usuarioDB.password);
        if (!validPasword) {
            return res.status(400).json({
                ok: false,
                msg: 'Contraseña no valida'
            })
        }

        //generar el jwt


        res.json({ ok: true, msg: "dimelo" })
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "error inesperado",
        });
    }
};

module.exports = {
    login
};
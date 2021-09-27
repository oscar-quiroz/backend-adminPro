const Usuario = require("../models/usuario");
const { response } = require("express");
const bcrypt = require("bcryptjs");

//GET
const getUsuarios = async(req, res) => {
    const usuario = await Usuario.find({}, "nombre email role google");
    res.json({
        ok: true,
        usuario,
    });
};

//POST
const crearUsuario = async(req, res = response) => {
    const { email, password } = req.body;

    try {
        const existeEmail = await Usuario.findOne({ email });
        if (existeEmail) {
            return res.status(400).json({
                ok: false,
                msg: "correo duplicado",
            });
        }

        const usuario = new Usuario(req.body);

        //encriptar la contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);

        await usuario.save();
        res.json({
            ok: true,
            usuario,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: "error inesperado",
        });
    }
};

const actualizarUsuario = async(req, res) => {
    const uid = req.params.id;
    console.log(uid);
    try {
        const usuarioDB = await Usuario.findById(uid);
        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: "usuario no encontrado",
            });
        }
        const campos = req.body;
        if (usuarioDB.email === req.body.email) {
            delete campos.email;
        } else {
            const existeEmail = await Usuario.findOne({ email: req.body.email });
            if (existeEmail) {
                return res.status(400).json({
                    ok: false,
                    msg: "ya existe un usuario con ese email",
                });
            }
        }
        delete campos.password;
        delete campos.google;
        const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos, {
            new: true,
        });
        res.json({
            ok: true,
            usuario: usuarioActualizado,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: "error inesperado",
        });
    }
};

module.exports = {
    getUsuarios,
    crearUsuario,
    actualizarUsuario,
};
const Usuario = require("../models/usuario");
const { response } = require("express");
const bcrypt = require("bcryptjs");
const { generarJWT } = require("../helpers/jwt");

//GET
const getUsuarios = async(req, res) => {

    //obtener los parametros de las request
    const desde = Number(req.query.desde) || 0
    console.log(desde)

    //traer todos los usuarios
    // const usuario = await Usuario.find({}, "nombre email role google").skip(desde).limit(5)
    // const total = await Usuario.count();

    const [
        usuarios,
        total
    ] = await Promise.all([Usuario.find({}, "nombre email role google img").skip(desde).limit(5), Usuario.count()])

    res.json({
        ok: true,
        usuarios,
        total
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

        //crear jwt
        const token = await generarJWT(usuario.id)

        res.json({
            ok: true,
            usuario,
            token
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
    try {
        const usuarioDB = await Usuario.findById(uid);
        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: "usuario no encontrado",
            });
        }
        const { password, google, email, ...campos } = req.body;
        if (usuarioDB.email != email) {
            const existeEmail = await Usuario.findOne({ email });
            if (existeEmail) {
                return res.status(400).json({
                    ok: false,
                    msg: "ya existe un usuario con ese email",
                });
            }
        }

        campos.email = email;

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

const eliminarUsuario = async(req, res) => {
    const uid = req.params.id;
    try {

        const usuarioDB = await Usuario.findById(uid);
        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Usuario no encontrado'
            })
        }

        await Usuario.findByIdAndDelete(uid);

        res.status(200).json({
            ok: true,
            msg: 'Usuario eliminado',
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "error inesoerado",
        });
    }
};

module.exports = {
    getUsuarios,
    crearUsuario,
    actualizarUsuario,
    eliminarUsuario,
};
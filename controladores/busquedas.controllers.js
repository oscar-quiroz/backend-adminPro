/* 

*/

//get todo

const { response } = require("express");
const Usuario = require("../models/usuario");
const Medico = require("../models/medico");
const Hospital = require("../models/hospital");

const getTodo = async(req, res = response) => {
    const busqueda = req.params.busqueda;
    const regex = new RegExp(busqueda, "i");

    // const usuario = await Usuario.find({ nombre: regex });
    // const medico = await Medico.find({ nombre: regex });
    // const hospital = await Hospital.find({ nombre: regex });

    const [usuario, medico, hospital] = await Promise.all([
        Usuario.find({ nombre: regex }),
        Medico.find({ nombre: regex }),
        Hospital.find({ nombre: regex }),
    ]);

    res.json({
        ok: true,
        msg: "getTodo",
        busqueda,
        usuario,
        medico,
        hospital,
    });
};

const getDocumentosColeccion = async(req, res = response) => {
    const tabla = req.params.tabla;
    const busqueda = req.params.busqueda;

    const regex = new RegExp(busqueda, "i");

    switch (tabla) {
        case "medicos":
            const medico = await Medico.find({ nombre: regex })
                .populate("usuario", "nombre img")
                .populate("hospital", "nombre img");
            res.json({ ok: true, resultado: medico });
            break;
        case "hospitales":
            const hospital = await Hospital.find({ nombre: regex }).populate(
                "usuario",
                "nombre img"
            );
            res.json({ ok: true, resultado: hospital });

            break;
        case "usuarios":
            const usuario = await Usuario.find({ nombre: regex });
            res.json({ ok: true, resultado: usuario });

            break;
        default:
            return res
                .status(400)
                .json({ ok: false, msg: "solo medicos, hospitales o usuarios" });
    }
};

module.exports = {
    getTodo,
    getDocumentosColeccion,
};
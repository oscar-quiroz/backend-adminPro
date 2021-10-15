const { response } = require("express");
const Medico = require("../models/medico");

//GET
const getMedicos = async(req, res = response) => {
    const medicos = await Medico.find()
        .populate("usuario", "nombre")
        .populate("hospital", "nombre");

    res.json({
        ok: true,
        medicos,
    });
};

const crearMedicos = async(req, res = response) => {
    const uid = req.uid;
    const medico = new Medico({
        usuario: uid,
        ...req.body,
    });

    try {
        const medicoDB = await medico.save();

        res.json({
            ok: true,
            medico: medicoDB,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "F",
        });
    }
};

const actualizarMedicos = async(req, res = response) => {
    res.json({
        ok: true,
        msg: "update medicos",
    });
};

const borrarMedicos = async(req, res = response) => {
    res.json({
        ok: true,
        msg: "delete medicos",
    });
};

module.exports = {
    getMedicos,
    crearMedicos,
    actualizarMedicos,
    borrarMedicos,
};
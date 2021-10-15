const { response } = require("express");
//GET
const getMedicos = async(req, res = response) => {
    res.json({
        ok: true,
        msg: "get hmedicos",
    });
};

const crearMedicos = async(req, res = response) => {
    res.json({
        ok: true,
        msg: "crear hmedicos",
    });
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
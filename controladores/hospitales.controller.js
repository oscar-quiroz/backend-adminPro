const { response } = require('express')
    //GET
const getHospitales = async(req, res = response) => {

    res.json({
        ok: true,
        msg: "get hospitales",
    });
};


const crearHospitales = async(req, res = response) => {

    res.json({
        ok: true,
        msg: "crear hospitales",
    });
};


const actualizarHospitales = async(req, res = response) => {

    res.json({
        ok: true,
        msg: "update hospitales",
    });
};

const borrarHospitales = async(req, res = response) => {

    res.json({
        ok: true,
        msg: "delete hospitales",
    });
};


module.exports = {
    getHospitales,
    crearHospitales,
    actualizarHospitales,
    borrarHospitales
}
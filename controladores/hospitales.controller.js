const { response } = require('express')
const Hospital = require('../models/hospital')
    //GET
const getHospitales = async(req, res = response) => {

    res.json({
        ok: true,
        msg: "get hospitales",
    });
};


const crearHospitales = async(req, res = response) => {

    const uid = req.uid;
    const hospital = new Hospital({ usuario: uid, ...req.body })


    try {
        const HospitalDB = await hospital.save();

        res.json({
            ok: true,
            msg: HospitalDB,
        })
    } catch (error) {

        res.status(500).json({
            ok: false,
            msg: "F",
        });
    }


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
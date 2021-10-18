const { response } = require("express");
const hospital = require("../models/hospital");
const Hospital = require("../models/hospital");

//GET
const getHospitales = async(req, res = response) => {
    //obtener todos los hospitales de la base de datos!!!.
    const hospitales = await Hospital.find().populate("usuario", "nombre img");

    res.json({
        ok: true,
        hospitales,
    });
};

const crearHospitales = async(req, res = response) => {
    const uid = req.uid;
    const hospital = new Hospital({ usuario: uid, ...req.body });

    try {
        const HospitalDB = await hospital.save();

        res.json({
            ok: true,
            msg: HospitalDB,
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "F",
        });
    }
};

const actualizarHospitales = async(req, res = response) => {
    const id = req.params.id;
    const uid = req.uid;

    try {
        const hospitalDB = await Hospital.findById(id);

        if (!hospitalDB) {
            return res.status(404).json({
                ok: false,
                msg: "Hospital no fue encontrado",
            });
        }
        const cambiosHospital = {...req.body, usuario: uid };

        const hospitalActulizado = await Hospital.findByIdAndUpdate(
            id,
            cambiosHospital, { new: true }
        );

        res.json({
            ok: true,
            hospital: hospitalActulizado,
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Algo malo ha sucedido",
        });
    }
};

const borrarHospitales = async(req, res = response) => {

    const id = req.params.id;

    try {
        const hospitalDB = await Hospital.findById(id);

        if (!hospitalDB) {
            return res.status(404).json({
                ok: false,
                msg: "Hospital no fue encontrado",
            });
        }

        await Hospital.findByIdAndDelete(id)

        res.json({
            ok: true,
            msg: "Hospital eliminado"
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Algo malo ha sucedido",
        });
    }

};

module.exports = {
    getHospitales,
    crearHospitales,
    actualizarHospitales,
    borrarHospitales,
};
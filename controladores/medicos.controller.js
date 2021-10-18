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
    const id = req.params.id;
    const uid = req.uid;

    try {
        const medicoDB = await Medico.findById(id);

        if (!medicoDB) {
            return res.status(404).json({
                ok: false,
                msg: "Medico no fue encontrado",
            });
        }
        const cambiosMedico = {...req.body, usuario: uid };

        const MedicoActulizado = await Medico.findByIdAndUpdate(id, cambiosMedico, {
            new: true,
        });

        res.json({
            ok: true,
            medico: MedicoActulizado,
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Algo malo ha sucedido",
        });
    }
};

const borrarMedicos = async(req, res = response) => {
    const id = req.params.id;

    try {
        const medicoDB = await Medico.findById(id);

        if (!medicoDB) {
            return res.status(404).json({
                ok: false,
                msg: "Medico no fue encontrado",
            });
        }


        await Medico.findByIdAndDelete(id);

        res.json({
            ok: true,
            msg: "medico eliminado",
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Algo malo ha sucedido",
        });
    }
};

module.exports = {
    getMedicos,
    crearMedicos,
    actualizarMedicos,
    borrarMedicos,
};
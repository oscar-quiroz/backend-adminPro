const Usuario = require("../models/usuario");
const Medico = require("../models/medico");
const Hospital = require("../models/hospital");

const fs = require("fs");

const actualizarImagen = async(tipo, id, nombreArchivo) => {
    switch (tipo) {
        case "medicos":
            const medico = await Medico.findById(id);
            if (!medico) {
                console.log("no se encontro un medico con ese id");
                return false;
            }
            const pathViejo = `./uploads/medicos/${medico.img}`;
            if (fs.existsSync(pathViejo)) {
                //borrar la anterior imagen
                fs.unlinkSync(pathViejo);
            }

            medico.img = nombreArchivo;
            await medico.save();
            return true;

        case "usuarios":
            const usuario = await Usuario.findById(id);
            if (!usuario) {
                console.log("no se encontro un usuario con ese id");
                return false;
            }
            const pathViejoU = `./uploads/usuarios/${usuario.img}`;
            if (fs.existsSync(pathViejoU)) {
                //borrar la anterior imagen
                fs.unlinkSync(pathViejoU);
            }

            usuario.img = nombreArchivo;
            await usuario.save();
            return true;

        case "hospitales":
            const hospital = await Hospital.findById(id);
            if (!hospital) {
                console.log("no se encontro un hospital con ese id");
                return false;
            }
            const pathViejoH = `./uploads/hospitales/${hospital.img}`;
            if (fs.existsSync(pathViejoH)) {
                //borrar la anterior imagen
                fs.unlinkSync(pathViejoH);
            }

            hospital.img = nombreArchivo;
            await hospital.save();
            return true;
    }
};

module.exports = {
    actualizarImagen,
};
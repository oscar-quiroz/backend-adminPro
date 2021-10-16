const { response } = require("express");
const { v4: uuidv4 } = require('uuid');

const fileUpload = (req, res = response) => {

    const tipo = req.params.tipo
    const id = req.params.id

    //parametro valido para la subida de los archivos
    const tipos = ['hospitales', 'medicos', 'usuarios']
    if (!tipos.includes(tipo)) {
        return res.status(400).json({
            ok: false,
            msg: "debe tener un tipo valido"
        })
    }

    //condicional para conocer si se subio o no un archivo
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            msg: "No se encontro ningun archivo"
        })
    }

    //procesar la imagen
    const file = req.files.imagen
    const nombreCortado = file.name.split('.')
    const extension = nombreCortado[nombreCortado.length - 1];
    console.log(extension)

    //validar la extension de los archivos sea valida
    const extensionesValidas = ['png', 'jpg', 'jpeg', 'gif']
    if (!extensionesValidas.includes(extension)) {
        return res.status(400).json({
            ok: false,
            msg: "No es una extension permitida"
        })
    }

    // Generar nombre unico a los archivos
    const nombreArchivo = `${uuidv4()}.${extension}`
        //crear path para almacenar el file
    const path = `./uploads/${tipo}/${nombreArchivo}`

    // mover la imagen a la correspondiente carpeta para almacenarlo
    file.mv(path, (err) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                msg: 'error al mover la imagen',
                err
            })
        }
    })

    res.json({
        ok: true,
        msg: "Archivo alm,acenado de manera correcta",
        nombreArchivo

    })
}

module.exports = { fileUpload }
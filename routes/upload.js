/* 
    ruta: api/upload
*/
const { Router } = require("express");
const { validarJwt } = require("../middlewares/validar-jwt");
const { fileUpload, retornaImagen } = require("../controladores/upload.controller");
const fileUploadExpress = require('express-fileupload')

const router = Router();

router.use(fileUploadExpress())



router.put('/:tipo/:id', [validarJwt], fileUpload);
router.get('/:tipo/:foto', retornaImagen);



module.exports = router;
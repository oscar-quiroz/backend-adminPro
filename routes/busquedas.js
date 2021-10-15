/* 
    ruta: api/todo/fernando
*/
const { Router } = require("express");
const { getTodo, getDocumentosColeccion } = require("../controladores/busquedas.controllers");
const { validarJwt } = require("../middlewares/validar-jwt");

const router = Router();

router.get("/:busqueda", [validarJwt], getTodo);
router.get("/coleccion/:tabla/:busqueda", [validarJwt], getDocumentosColeccion);

module.exports = router;
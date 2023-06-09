const express = require("express");
const ventaController = require("../controllers/ventaController");

const api = express.Router();
const auth = require("../middlewares/authenticate");

api.post('/registro_compra_cliente', auth.auth, ventaController.registro_compra_cliente);
api.get('/enviar_correo_compra_cliente/:id', auth.auth,ventaController.enviar_correo_compra_cliente);


module.exports = api;
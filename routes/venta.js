const express = require("express");
const ventaController = require("../controllers/ventaController");

const api = express.Router();
const auth = require("../middlewares/authenticate");

api.post('/registro_compra_cliente', auth.auth, ventaController.registro_compra_cliente);


module.exports = api;
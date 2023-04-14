const express = require("express");
const cuponController = require("../controllers/CuponController");
const api = express.Router();
const auth = require("../middlewares/authenticate");

api.post('/registro_cupon_admin',auth.auth, cuponController.registro_cupon_admin);
api.get('/listar_cupones_admin/:filtro?',auth.auth, cuponController.listar_cupones_admin);

module.exports = api;

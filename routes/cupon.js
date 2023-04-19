const express = require("express");
const cuponController = require("../controllers/CuponController");
const api = express.Router();
const auth = require("../middlewares/authenticate");

api.post('/registro_cupon_admin',auth.auth, cuponController.registro_cupon_admin);
api.get('/listar_cupones_admin/:filtro?',auth.auth, cuponController.listar_cupones_admin);
api.get('/obtener_cupon_admin/:id',auth.auth, cuponController.obtener_cupon_admin);
api.put('/actualizar_cupon_admin/:id',auth.auth, cuponController.actualizar_cupon_admin);
api.delete('/eliminar_cupon_admin/:id', auth.auth, cuponController.eliminar_cupon_admin);

module.exports = api;

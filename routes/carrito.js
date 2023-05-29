const express = require("express");
const carritoController = require('../controllers/carritoController');

const api = express.Router();
const auth = require('../middlewares/authenticate');

api.post('/agregar_carrito_cliente', auth.auth, carritoController.agregar_carrito_cliente);
api.get('/obtener_carrito_cliente/:id', auth.auth, carritoController.obtener_carrito_cliente);
api.delete('/eliminar_carrito_cliente/:id', auth.auth, carritoController.eliminar_carrito_cliente);


module.exports = api;
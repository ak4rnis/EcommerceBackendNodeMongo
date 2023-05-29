const express = require("express");
const productoController = require("../controllers/productoController");
const api = express.Router();
const auth = require("../middlewares/authenticate");
const multiparty = require("connect-multiparty");
const path = multiparty({uploadDir: './uploads/productos'});

//Productos
api.post('/registro_producto_admin', [auth.auth, path], productoController.registro_producto_admin);
api.get('/listar_productos_admin/:filtro?',auth.auth, productoController.listar_productos_admin);
api.get('/obtener_portada/:img', productoController.obtener_portada);
api.get('/obtener_producto_admin/:id', auth.auth, productoController.obtener_producto_admin);
api.put('/actualizar_producto_admin/:id',[auth.auth, path], productoController.actualizar_producto_admin);
api.delete('/eliminar_producto_admin/:id', auth.auth, productoController.eliminar_producto_admin);
api.put('/actualizar_producto_variedades_admin/:id', auth.auth, productoController.actualizar_producto_variedades_admin);
api.put('/agregar_imagen_galeria_admin/:id', [auth.auth,path],productoController.agregar_imagen_galeria_admin);
api.put('/eliminar_imagen_galeria_admin/:id', auth.auth, productoController.eliminar_imagen_galeria_admin);
api.get('/listar_productos_publico/:filtro?',productoController.listar_productos_publico);

api.get('/obtener_productos_slug_publico/:slug', productoController.obtener_productos_slug_publico);
api.get('/listar_productos_recomendados_publico/:categoria')

//Inventario
api.get('/listar_inventario_producto_admin/:id', auth.auth, productoController.listar_inventario_producto_admin);
api.delete('/eliminar_inventario_producto_admin/:id', auth.auth, productoController.eliminar_inventario_producto_admin);
api.post('/registro_inventario_producto_admin', auth.auth, productoController.registro_inventario_producto_admin);




module.exports = api;
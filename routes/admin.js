const express = require("express");
const AdminController = require("../controllers/AdminController");
const auth = require("../middlewares/authenticate");
const api = express.Router();
api.post("/registro_admin", AdminController.registro_admin);
api.post("/login_admin", AdminController.login_admin);

api.get('/obtener_mensajes_admin', auth.auth, AdminController.obtener_mensajes_admin);
api.put('/cerrar_mensaje_admin/:id', auth.auth, AdminController.cerrar_mensaje_admin);

module.exports = api;
const express = require("express");
const configController = require("../controllers/ConfigController");
const auth = require("../middlewares/authenticate");
const multiparty = require("connect-multiparty");
const path = multiparty({uploadDir: './uploads/configuraciones'});
const api = express.Router();


api.get('/obtener_config_admin', auth.auth, configController.obtener_config_admin);
api.put('/actualiza_config_admin/:id',[auth.auth,path],configController.actualiza_config_admin);
api.post('/registrar_config_admin',configController.registrar_configuracion_admin);
api.get('/obtener_logo/:img', configController.obtener_logo);


module.exports = api;


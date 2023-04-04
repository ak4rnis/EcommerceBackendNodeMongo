const express = require("express");
const AdminController = require("../controllers/AdminController");
const api = express.Router();
api.post("/registro_admin", AdminController.registro_admin);
api.post("/login_admin", AdminController.login_admin);

module.exports = api;
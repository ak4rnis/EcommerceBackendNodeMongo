const express = require("express");
const ventaController = require("../controllers/ventaController");

const api = express.Router();
const auth = require("../middlewares/authenticate");

module.exports = api;
'use strict'

// Se importa la dependencia y asi mismo el controlador del cual se usaran los metodos para las rutas
var express = require('express');
var adminController = require('../controllers/AdminController');


// Inicializa dependencia de framework express en el metodo router para dar uso a las Rutas
var api = express.Router();

// Se crea ruta que al acceder ejecuta metodo del controlador 
api.post('/registroAdmin', adminController.registroAdmin);

module.exports = api;
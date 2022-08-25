'use strict'

// Se importa la dependencia y asi mismo el controlador del cual se usaran los metodos para las rutas
var express = require('express');
var ConfigController = require('../controllers/ConfigController');
var multiparty = require('connect-multiparty');
var pathImage = multiparty({uploadDir: './uploads/configs'})

// Inicializa dependencia de framework express en el metodo router para dar uso a las Rutas
var api = express.Router();
var authJwt = require('../middlewares/authenticate');

// Se crea ruta que al acceder ejecuta metodo registroCliente del controlador clienteController

api.get('/fetchConfigData', authJwt.auth, ConfigController.fetchConfigData);
api.put('/updateConfig/:id', [authJwt.auth, pathImage], ConfigController.updateConfig);
api.get('/fetchConfigImage/:img', ConfigController.fetchConfigImage);
api.get('/fetchCategories',ConfigController.fetchCategories);

module.exports = api;
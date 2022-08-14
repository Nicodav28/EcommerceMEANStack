'use strict'

// Se importa la dependencia y asi mismo el controlador del cual se usaran los metodos para las rutas
var express = require('express');
var CuponController = require('../controllers/CuponController');

// Inicializa dependencia de framework express en el metodo router para dar uso a las Rutas
var api = express.Router();
var authJwt = require('../middlewares/authenticate');

// Se crea ruta que al acceder ejecuta metodo registroCliente del controlador clienteController
api.post('/cuponRegister', authJwt.auth, CuponController.cuponRegister);
api.get('/fetchCuponFilter/:filtro?', authJwt.auth, CuponController.fetchCuponFilter);
api.get('/fetchCuponId/:id', authJwt.auth, CuponController.fetchCuponId);
api.put('/updateCuponData/:id', authJwt.auth, CuponController.updateCuponData);
api.delete('/deleteCupon/:id', authJwt.auth, CuponController.deleteCupon);

module.exports = api;
'use strict'

// Se importa la dependencia y asi mismo el controlador del cual se usaran los metodos para las rutas
var express = require('express');
var carritoController = require('../controllers/CarritoController');

// Inicializa dependencia de framework express en el metodo router para dar uso a las Rutas
var api = express.Router();
var authJwt = require('../middlewares/authenticate');

api.post('/addClientCart', authJwt.auth, carritoController.addClientCart);
api.get('/fetchClientCart/:id', authJwt.auth, carritoController.fetchClientCart);
api.delete('/delClientCart/:id', authJwt.auth, carritoController.delClientCart);

module.exports = api;
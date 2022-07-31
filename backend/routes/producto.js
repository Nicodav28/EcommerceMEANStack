'use strict'

// Se importa la dependencia y asi mismo el controlador del cual se usaran los metodos para las rutas
var express = require('express');
var ProductoController = require('../controllers/ProductoController');

// Inicializa dependencia de framework express en el metodo router para dar uso a las Rutas
var api = express.Router();
var authJwt = require('../middlewares/authenticate');
var multiparty = require('connect-multiparty');
var pathImage = multiparty({uploadDir: './uploads/productos'})

// Se crea ruta que al acceder ejecuta metodo registroCliente del controlador clienteController
api.post('/registroProducto', [authJwt.auth, pathImage], ProductoController.registroProducto);
api.get('/obtenerRegistros/:filtro?', [authJwt.auth], ProductoController.fetchProductsAdmin);
api.get('/obtenerImagen/:img', ProductoController.obtenerPortada);

module.exports = api;
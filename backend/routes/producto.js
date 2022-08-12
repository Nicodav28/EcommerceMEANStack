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
// Productos
api.post('/registroProducto', [authJwt.auth, pathImage], ProductoController.registroProducto);
api.get('/obtenerRegistros/:filtro?', [authJwt.auth], ProductoController.fetchProductsAdmin);
api.get('/obtenerImagen/:img', ProductoController.obtenerPortada);
api.get('/fetchProductId/:id', authJwt.auth, ProductoController.fetchProductId);
api.put('/updateProductData/:id', [authJwt.auth, pathImage], ProductoController.updateProductData);
api.delete('/deleteProduct/:id', authJwt.auth, ProductoController.deleteProduct);

// Inventario
api.get('/getInventory/:id', authJwt.auth, ProductoController.invetoryFetchAdmin);
api.delete('/updateStockData/:id', authJwt.auth, ProductoController.deleteInventory);
api.post('/createInventory', authJwt.auth, ProductoController.createInventory);

module.exports = api;
'use strict'

// Se importa la dependencia y asi mismo el controlador del cual se usaran los metodos para las rutas
var express = require('express');
var clienteController = require('../controllers/ClienteController');

// Inicializa dependencia de framework express en el metodo router para dar uso a las Rutas
var api = express.Router();
var authJwt = require('../middlewares/authenticate');

// Se crea ruta que al acceder ejecuta metodo registroCliente del controlador clienteController
api.post('/registroCliente', clienteController.registroCliente);
api.post('/loginCliente', clienteController.loginCliente);
api.get('/listarClientes/:tipo/:filtro?', authJwt.auth, clienteController.fetchClients);
api.post('/registerClientAdmin', authJwt.auth, clienteController.registerClientAdmin);
api.get('/obtenerClienteAdmin/:id', authJwt.auth, clienteController.fetchClientId);
api.put('/actualizarClienteAdmin/:id', authJwt.auth, clienteController.updateClientData);
api.delete('/eliminarClienteAdmin/:id', authJwt.auth, clienteController.deleteClient);
api.get('/fetchClientIdGuest/:id', authJwt.auth, clienteController.fetchClientIdGuest);

module.exports = api;
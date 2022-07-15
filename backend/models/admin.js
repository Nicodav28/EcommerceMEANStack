'use strict'

var mongoose = require('mongoose');
var schema = mongoose.Schema;

// Creacion de modelo

var AdminSchema = schema({
    nombres: {type: String, required: true},
    apellidos: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    dni: {type: String, required: true},
    rol: {type: String, required: true},
    telefono: {type: String, required: true}
});

// Exportar Schema con nombre cliente según registro creado

module.exports = mongoose.model('admin', AdminSchema);
'use strict'

var mongoose = require('mongoose');
var schema = mongoose.Schema;

// Creacion de modelo

var clienteSchema = schema({
    nombres: {type: String, required: true},
    apellidos: {type: String, required: true},
    pais: {type: String, required: false},
    email: {type: String, required: true},
    password: {type: String, required: true},
    perfil: {type: String, default: 'perfil.png', required: true},
    telefono: {type: String, required: false},
    genero: {type: String, required: false},
    f_nacimiento: {type: String, required: true},
    dni: {type: String, required: false},
    createdAt: {type: Date, default: Date.now, required: true}
});

// Exportar Schema con nombre cliente según registro creado

module.exports = mongoose.model('cliente', clienteSchema);
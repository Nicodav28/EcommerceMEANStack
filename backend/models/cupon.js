'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Creacion de modelo

var CuponSchema = Schema({
    codigo: {type: String, required: true},
    tipo: {type: String, required: true},//Porcentaje o precio fijo
    valor: {type: Number, required: true},
    limite: {type: Number, required: true},
    createdAt: {type: Date, default: Date.now, required: true}
});

// Exportar Schema con nombre cliente según registro creado

module.exports = mongoose.model('cupon', CuponSchema);
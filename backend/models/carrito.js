'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Creacion de modelo

var CarritoSchema = Schema({
    producto: {type: Schema.ObjectId, ref: 'producto', required: true},
    cliente: {type: Schema.ObjectId, ref: 'cliente', required: true},
    cantidad: {type: Number, required: true},
    variedad: {type: String, required: true},
    createdAt: {type: Date, default: Date.now, required: true}
});

// Exportar Schema con nombre cliente según registro creado

module.exports = mongoose.model('carrito', CarritoSchema);
'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Creacion de modelo

var InventarioSchema = Schema({
    producto: {type: Schema.ObjectId, ref: 'producto', required: true},
    cantidad: {type: Number, required: true},
    admin: {type: Schema.ObjectId, ref: 'admin', required: true},
    proveedor: {type: String, required: true},
    accion: {type: String, required: true},
    createdAt: {type: Date, default: Date.now, required: true}
});

// Exportar Schema con nombre cliente según registro creado

module.exports = mongoose.model('inventario', InventarioSchema);
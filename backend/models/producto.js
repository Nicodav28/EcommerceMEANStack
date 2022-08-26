'use strict'

var mongoose = require('mongoose');
var schema = mongoose.Schema;

// Creacion de modelo

var ProductoSchema = schema({
    titulo: {type: String, required: true},
    slug: {type: String, required: true},
    galeria: [{type: Object, required: false}],
    portada: {type: String, required: true},
    precio: {type: Number, required: true},
    descripcion: {type: String, required: true},
    contenido: {type: String, required: true},
    stock: {type: Number, required: true},
    nventas: {type: Number, default: 0, required: false},
    npuntos: {type: Number, default: 0,required: true},
    variedades: [{type: Object, required: false}],
    tituloVariedad: {type: String, required: false},
    categoria: {type: String, required: true},
    estado: {type: String, default: 'Edicion', required: true},
    createdAt: {type: Date, default: Date.now, required: true}
});

// Exportar Schema con nombre cliente según registro creado

module.exports = mongoose.model('producto', ProductoSchema);
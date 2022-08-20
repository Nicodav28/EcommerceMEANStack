'use strict'

var mongoose = require('mongoose');
var schema = mongoose.Schema;

// Creacion de modelo

var ConfigSchema = schema({
    categorias: [{type: Object, required: true}],
    titulo: {type: String, required: true},
    logo: {type: String, required: true},
    serie: {type: String, required: true},
    correlativo: {type: String, required: true}
});

// Exportar Schema con nombre cliente según registro creado

module.exports = mongoose.model('config', ConfigSchema);
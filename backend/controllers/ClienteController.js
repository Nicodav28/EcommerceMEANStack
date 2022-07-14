'use strict'

var cliente = require('../models/cliente');

const registroCliente = async function(req, res){
    //
    res.status(200).send({message: 'Hola mundo desde controlador'});
}

module.exports = {
    registroCliente
}
'use strict';

const carrito = require('../models/carrito');

const addClientCart = async (req, res) => {
    if (req.user) {
        let data = req.body;

        let clientCart = await carrito.find({cliente: data.cliente, producto: data.producto});

        if(clientCart.length == 0 ){
            let reg = await carrito.create(data);
            res.status(200).send({ data: reg });
        }else if(clientCart.length >=1){
            res.status(200).send({ data: undefined });
        }

    }else{
        res.status(500).send({ message: 'ForbbidenAccess' });
    }
}

const fetchClientCart = async (req, res) => {
    if (req.user) {
        let id = req.params['id'];

        let clientCart = await carrito.find({cliente: id}).populate('producto');

        res.status(200).send({ data: clientCart });
    }else{
        res.status(500).send({ message: 'ForbbidenAccess' });
    }
}

const delClientCart = async (req, res) => {
    if (req.user) {
        let id = req.params['id'];

        let reg = await carrito.findByIdAndRemove({_id: id});

        res.status(200).send({ data: reg });
    }else{
        res.status(500).send({ message: 'ForbbidenAccess' });
    }
}

module.exports = {
    addClientCart,
    fetchClientCart,
    delClientCart
};

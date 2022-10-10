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

module.exports = {
    addClientCart,
};

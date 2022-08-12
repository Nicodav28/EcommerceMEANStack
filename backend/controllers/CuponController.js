'use strict'

var cupon = require('../models/cupon');

const cuponRegister = async function (req, res) {
    if(req.user){
        if(req.user.rol == 'admin'){
            let cuponData = req.body;

            let cuponRegister = await cupon.create(cuponData);

            res.status(200).send({ data: cuponRegister });
        }else{
            res.status(500).send({ message: 'ForbbidenAccess' });
        }
    }else{
        res.status(500).send({ message: 'ForbbidenAccess' });
    }
}

const fetchCuponFilter = async function (req, res) {
    if (req.user) {
        if (req.user.rol == 'admin') {
            var filtro = req.params['filtro'];

            let getData = await cupon.find({ codigo: new RegExp(filtro, 'i') });

            console.log(getData);
            res.status(200).send({ data: getData });
        } else {
            res.status(500).send({ message: 'ForbbidenAccess' });
        }
    } else {
        res.status(500).send({ message: 'ForbbidenAccess' });
    }
}

module.exports = {
    cuponRegister,
    fetchCuponFilter
}


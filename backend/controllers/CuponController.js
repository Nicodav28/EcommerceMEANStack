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

            let getData = await cupon.find({ codigo: new RegExp(filtro, 'i') }).sort({createdAt: -1});

            console.log(getData);
            res.status(200).send({ data: getData });
        } else {
            res.status(500).send({ message: 'ForbbidenAccess' });
        }
    } else {
        res.status(500).send({ message: 'ForbbidenAccess' });
    }
}

const fetchCuponId = async function(req, res){
    if(req.user){
        if(req.user.rol == 'admin'){
            var id = req.params['id'];
            try {
                var reg = await cupon.findById({_id:id});
                res.status(200).send({ data: reg });
            } catch (error) {
                res.status(200).send({ data: undefined});
            }

        }else{
            res.status(500).send({ message: 'ForbbidenAccess' });
        }
    }else{
        res.status(500).send({ message: 'ForbbidenAccess' });
    }
}

const updateCuponData = async function(req, res){
    if(req.user){
        if(req.user.rol == 'admin'){
            var id = req.params['id'];
            var data = req.body;

            let updateData = await cupon.findByIdAndUpdate({ _id: id},{
                codigo: data.codigo,
                tipo: data.tipo,
                valor: data.valor,
                limite: data.limite
            });

            res.status(200).send({ data: updateData, message: 'Cupon actualizado exitosamente.' });
        }else{
            res.status(500).send({ message: 'ForbbidenAccess' });
        }
    }else{
        res.status(500).send({ message: 'ForbbidenAccess' });
    }
}

const deleteCupon = async function(req, res){
    if(req.user){
        if(req.user.rol == 'admin'){
            var id = req.params['id'];

            let delCupon = await cupon.findByIdAndRemove({ _id: id });

            res.status(200).send({ data: delCupon, message: 'Cupon eliminado exitosamente.' });
        }else{
            res.status(500).send({ message: 'ForbbidenAccess' });
        }
    }else{
        res.status(500).send({ message: 'ForbbidenAccess' });
    }
}

module.exports = {
    cuponRegister,
    fetchCuponFilter,
    fetchCuponId,
    updateCuponData,
    deleteCupon
}


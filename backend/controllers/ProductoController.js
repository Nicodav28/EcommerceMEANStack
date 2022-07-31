'use strict'

var producto = require('../models/producto');
var fileSys = require('fs');
var path = require('path');

const registroProducto = async function (req, res) {
    if(req.user){
        if(req.user.rol == 'admin'){
            let data = req.body;

            var imagePath = req.files.portada.path;
            var imageName = imagePath.split('\\');
            var portadaName = imageName[2];

            data.slug = data.titulo.toLowerCase().replace(/ /g,'-').replace(/[^\w-]+/g,'');
            data.portada = portadaName;
            let registerProduct = await producto.create(data);

            res.status(200).send({ data: registerProduct });
        }else{
            res.status(500).send({ message: 'ForbbidenAccess' });
        }
    }else{
        res.status(500).send({ message: 'ForbbidenAccess' });
    }
}

const fetchProductsAdmin = async function(req, res){
    if(req.user){
        if(req.user.rol == 'admin'){
            var filtro = req.params['filtro'];

            let getData = await producto.find({ titulo: new RegExp(filtro, 'i')});
            res.status(200).send({ data: getData });
        }else{
            res.status(500).send({ message: 'ForbbidenAccess' });
        }
    }else{
        res.status(500).send({ message: 'ForbbidenAccess' });
    }
}

const obtenerPortada = async function (req, res) {
    var imgName = req.params['img'];
    fileSys.stat('./uploads/productos/'+imgName, function (err){
        if(!err){
            let pathImage = './uploads/productos/'+imgName;
            res.status(200).sendFile(path.resolve(pathImage));
        }else{
            let pathImage = './uploads/default.jpg';
            res.status(200).sendFile(path.resolve(pathImage));
        }
    })
}

module.exports = {
    registroProducto,
    fetchProductsAdmin,
    obtenerPortada
}
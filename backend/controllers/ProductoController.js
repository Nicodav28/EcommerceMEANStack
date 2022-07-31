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
    });
}

const fetchProductId = async function (req, res) {
    if(req.user){
        if(req.user.rol == 'admin'){
            var id = req.params['id'];
            try {
                var reg = await producto.findById({_id:id});
                res.status(200).send({ data: reg });
            } catch (error) {
                res.status(200).send({ data: undefined });
            }

        }else{
            res.status(500).send({ message: 'ForbbidenAccess' });
        }
    }else{
        res.status(500).send({ message: 'ForbbidenAccess' });
    }
}

const updateProductData = async function(req, res){
    if(req.user){
        if(req.user.rol == 'admin'){
            var id = req.params['id'];
            var data = req.body;

            data.slug = data.titulo.toLowerCase().replace(/ /g,'-').replace(/[^\w-]+/g,'');

            if(req.files){
                var imgPath = req.files.portada.path;
                var name = imgPath.split('\\');
                var portadaName = name[2];
                var update = await producto.findByIdAndUpdate({_id:id},{
                    titulo: data.titulo,
                    portada: portadaName,
                    precio: data.precio,
                    stock: data.stock,
                    categoria: data.categoria,
                    descripcion: data.descripcion,
                    contenido: data.contenido,
                    slug: data.slug
                });

                fileSys.stat('./uploads/productos/'+update.portada, function (err){
                    if(!err){
                        fileSys.unlink('./uploads/productos/' + update.portada,(err)=>{
                            if(err) throw err;
                        })
                    }
                });

                res.status(200).send({ data: update, message: 'Actualización con imagen exitosa'});
            }else{
                var update = await producto.findByIdAndUpdate({_id:id},{
                    titulo: data.titulo,
                    precio: data.precio,
                    stock: data.stock,
                    categoria: data.categoria,
                    descripcion: data.descripcion,
                    contenido: data.contenido,
                    slug: data.slug
                });    
                res.status(200).send({ data: update, message: 'Actualización sin imagen exitosa'});        
            }
            
        }else{
            res.status(500).send({ message: 'ForbbidenAccess' });
        }
    }else{
        res.status(500).send({ message: 'ForbbidenAccess' });
    }
}

const deleteProduct = async function (req, res) {
    if(req.user){
        if(req.user.rol == 'admin'){
            var id = req.params['id'];
            
            let delData = await producto.findByIdAndRemove({_id:id});

            res.status(200).send({ data: delData, message: 'Producto eliminado exitosamente' });
        }else{
            res.status(500).send({ message: 'ForbbidenAccess' });
        }
    }else{
        res.status(500).send({ message: 'ForbbidenAccess' });
    }
}

module.exports = {
    registroProducto,
    fetchProductsAdmin,
    obtenerPortada,
    fetchProductId,
    updateProductData,
    deleteProduct
}
'use strict'

var producto = require('../models/producto');

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

module.exports = {
    registroProducto
}
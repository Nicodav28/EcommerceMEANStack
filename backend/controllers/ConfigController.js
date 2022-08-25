var configModel = require('../models/config');
var fileSys = require('fs');
var path = require('path');

const fetchConfigData = async function (req, res) {
    if(req.user){
        if(req.user.rol == 'admin'){

            let reg = await configModel.findById({ _id: "6306e05f4ec8f17cfe27a9ae"});

            res.status(200).send({ data: reg });
        }else{
            res.status(500).send({ message: 'ForbbidenAccess' });
        }
    }else{
        res.status(500).send({ message: 'ForbbidenAccess' });
    }
}

const updateConfig = async function (req, res) {
    if(req.user){
        if(req.user.rol == 'admin'){
            let data = req.body;
            
            if(req.files){
                var imgPath = req.files.logo.path;
                var name = imgPath.split('\\');
                var logoName = name[2];

                let reg = await configModel.findByIdAndUpdate({ _id: "6306e05f4ec8f17cfe27a9ae"},{
                    categorias: JSON.parse(data.categorias),
                    titulo: data.titulo,
                    serie: data.serie,
                    logo: logoName,
                    correlativo: data.correlativo
                });

                fileSys.stat('./uploads/configs/' + reg.logo, function (err) {
                    if (!err) {
                        fileSys.unlink('./uploads/configs/' + reg.logo, (err) => {
                            if (err) throw err;
                        })
                    }
                });
                
                res.status(200).send({ data: reg });

            }else{
                let reg = await configModel.findByIdAndUpdate({ _id: "6306e05f4ec8f17cfe27a9ae"},{
                    categorias: data.categorias,
                    titulo: data.titulo,
                    serie: data.serie,
                    correlativo: data.correlativo
                });

                res.status(200).send({ data: reg });
            }

        }else{
            res.status(500).send({ message: 'ForbbidenAccess' });
        }
    }else{
        res.status(500).send({ message: 'ForbbidenAccess' });
    }
}

const fetchConfigImage = async function (req, res) {
    var imgName = req.params['img'];
    fileSys.stat('./uploads/configs/' + imgName, function (err) {
        if (!err) {
            let pathImage = './uploads/configs/' + imgName;
            res.status(200).sendFile(path.resolve(pathImage));
        } else {
            let pathImage = './uploads/default.jpg';
            res.status(200).sendFile(path.resolve(pathImage));
        }
    });
}

const fetchCategories = async function (req, res) {
    let reg = await configModel.findById({ _id: "6306e05f4ec8f17cfe27a9ae"});
    res.status(200).send({ data: reg });
}


module.exports = {
    updateConfig,
    fetchConfigData,
    fetchConfigImage,
    fetchCategories
};
var configModel = require('../models/config');
var fileSys = require('fs');
var path = require('path');

const fetchConfigData = async function (req, res) {
    if(req.user){
        if(req.user.rol == 'admin'){

            let reg = await configModel.findById({ _id: "62f9cb1ae2d64bbb13c3ab00"});

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

                let reg = await configModel.findByIdAndUpdate({ _id: "62f9cb1ae2d64bbb13c3ab00"},{
                    categories: data.categorias,
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
                let reg = await configModel.findByIdAndUpdate({ _id: "62f9cb1ae2d64bbb13c3ab00"},{
                    categories: data.categorias,
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






module.exports = {
    updateConfig,
    fetchConfigData
};
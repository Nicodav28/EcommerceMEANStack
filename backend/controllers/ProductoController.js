'use strict'

var producto = require('../models/producto');
var inventario = require('../models/inventario');

var fileSys = require('fs');
var path = require('path');

const registroProducto = async function (req, res) {
    if (req.user) {
        if (req.user.rol == 'admin') {
            let data = req.body;

            var imagePath = req.files.portada.path;
            var imageName = imagePath.split('\\');
            var portadaName = imageName[2];

            data.slug = data.titulo.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
            data.portada = portadaName;
            let registerProduct = await producto.create(data);

            let inventory = await inventario.create({
                admin: req.user.sub,
                cantidad: data.stock,
                proveedor: 'Proveedor1',
                accion: 'Registro Producto',
                producto: registerProduct._id
            });

            res.status(200).send({ data: registerProduct, inventario: inventory });
        } else {
            res.status(500).send({ message: 'ForbbidenAccess' });
        }
    } else {
        res.status(500).send({ message: 'ForbbidenAccess' });
    }
}

const fetchProductsAdmin = async function (req, res) {
    if (req.user) {
        if (req.user.rol == 'admin') {
            var filtro = req.params['filtro'];

            let getData = await producto.find({ titulo: new RegExp(filtro, 'i') });
            res.status(200).send({ data: getData });
        } else {
            res.status(500).send({ message: 'ForbbidenAccess' });
        }
    } else {
        res.status(500).send({ message: 'ForbbidenAccess' });
    }
}

const obtenerPortada = async function (req, res) {
    var imgName = req.params['img'];
    fileSys.stat('./uploads/productos/' + imgName, function (err) {
        if (!err) {
            let pathImage = './uploads/productos/' + imgName;
            res.status(200).sendFile(path.resolve(pathImage));
        } else {
            let pathImage = './uploads/default.jpg';
            res.status(200).sendFile(path.resolve(pathImage));
        }
    });
}

const fetchProductId = async function (req, res) {
    if (req.user) {
        if (req.user.rol == 'admin') {
            var id = req.params['id'];
            try {
                var reg = await producto.findById({ _id: id });
                res.status(200).send({ data: reg });
            } catch (error) {
                res.status(200).send({ data: undefined });
            }

        } else {
            res.status(500).send({ message: 'ForbbidenAccess' });
        }
    } else {
        res.status(500).send({ message: 'ForbbidenAccess' });
    }
}

const updateProductData = async function (req, res) {
    if (req.user) {
        if (req.user.rol == 'admin') {
            var id = req.params['id'];
            var data = req.body;

            data.slug = data.titulo.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');

            if (req.files) {
                var imgPath = req.files.portada.path;
                var name = imgPath.split('\\');
                var portadaName = name[2];

                let update = await producto.findByIdAndUpdate({ _id: id }, {
                    titulo: data.titulo,
                    portada: portadaName,
                    precio: data.precio,
                    // stock: data.stock,
                    categoria: data.categoria,
                    descripcion: data.descripcion,
                    contenido: data.contenido,
                    slug: data.slug
                });

                fileSys.stat('./uploads/productos/' + update.portada, function (err) {
                    if (!err) {
                        fileSys.unlink('./uploads/productos/' + update.portada, (err) => {
                            if (err) throw err;
                        })
                    }
                });

                res.status(200).send({ data: update, message: 'Actualización con imagen exitosa' });

            } else {
                var update = await producto.findByIdAndUpdate({ _id: id }, {
                    titulo: data.titulo,
                    precio: data.precio,
                    // stock: data.stock,
                    categoria: data.categoria,
                    descripcion: data.descripcion,
                    contenido: data.contenido,
                    slug: data.slug
                });

                res.status(200).send({ data: update, message: 'Actualización sin imagen exitosa' });
            }

        } else {
            res.status(500).send({ message: 'ForbbidenAccess' });
        }
    } else {
        res.status(500).send({ message: 'ForbbidenAccess' });
    }
}

const deleteProduct = async function (req, res) {
    if (req.user) {
        if (req.user.rol == 'admin') {
            var id = req.params['id'];

            let idProduct = await producto.find({ _id: id });

            var delProductImage = idProduct[0].portada

            let delData = await producto.findByIdAndRemove({ _id: id });

            let delInventory = await inventario.deleteMany({ producto: id });

            fileSys.stat('./uploads/productos/' + delProductImage, function (err) {
                if (!err) {
                    fileSys.unlink('./uploads/productos/' + delProductImage, (err) => {
                        if (err) throw err;
                    })
                }
            });

            res.status(200).send({ data: delData, inventory: delInventory, message: 'Producto eliminado exitosamente' });
        } else {
            res.status(500).send({ message: 'ForbbidenAccess' });
        }
    } else {
        res.status(500).send({ message: 'ForbbidenAccess' });
    }
}

const invetoryFetchAdmin = async function (req, res) {
    if (req.user) {
        if (req.user.rol == 'admin') {
            var id = req.params['id'];

            var findData = await inventario.find({ producto: id }).populate('admin').sort({ createdAt: -1 });

            res.status(200).send({ data: findData });

        } else {
            res.status(500).send({ message: 'ForbbidenAccess' });
        }
    } else {
        res.status(500).send({ message: 'ForbbidenAccess' });
    }
}

const deleteInventory = async function (req, res) {
    if (req.user) {
        if (req.user.rol == 'admin') {
            //Obtener parametros de la URL
            var id = req.params['id'];

            // Elimina inventario de la BD
            let delInv = await inventario.findByIdAndRemove({ _id: id });

            //Busca registro actual del producto
            let productQuantity = await producto.findById({ _id: delInv.producto });

            // Resta cantidad actual del producto con la del inventario eliminado
            let newStock = parseInt(productQuantity.stock) - parseInt(delInv.cantidad);

            // Actualiza la información del producto con el nuevo stock
            let productoUpdate = await producto.findByIdAndUpdate({ _id: delInv.producto }, {
                stock: newStock
            });

            res.status(200).send({ data: productoUpdate })
        } else {
            res.status(500).send({ message: 'ForbbidenAccess' });
        }
    } else {
        res.status(500).send({ message: 'ForbbidenAccess' });
    }
}

const createInventory = async function (req, res) {
    if (req.user) {
        if (req.user.rol == 'admin') {
            let data = req.body;
            data.accion = 'Registro Inventario';
            let registerInventory = await inventario.create(data);

            let productQuantity = await producto.findById({ _id: data.producto });
            //Actual                     Nuevo Aumentado
            let newStock = parseInt(productQuantity.stock) + parseInt(data.cantidad);

            let productoUpdate = await producto.findByIdAndUpdate({ _id: data.producto }, {
                stock: newStock
            });

            res.status(200).send({ data: registerInventory, productoAct: productoUpdate });
        } else {
            res.status(500).send({ message: 'ForbbidenAccess' });
        }
    } else {
        res.status(500).send({ message: 'ForbbidenAccess' });
    }
}

const updateProductVariety = async function (req, res) {
    if (req.user) {
        if (req.user.rol == 'admin') {
            var id = req.params['id'];
            var data = req.body;
            console.log(data);
            var update = await producto.findByIdAndUpdate({ _id: id }, {
                tituloVariedad: data.tituloVariedad,
                variedades: data.variedades
            });

            res.status(200).send({ data: update, message: 'Actualización sin imagen exitosa' });

        } else {
            res.status(500).send({ message: 'ForbbidenAccess' });
        }
    } else {
        res.status(500).send({ message: 'ForbbidenAccess' });
    }
}

module.exports = {
    registroProducto,
    fetchProductsAdmin,
    obtenerPortada,
    fetchProductId,
    updateProductData,
    deleteProduct,
    invetoryFetchAdmin,
    deleteInventory,
    createInventory,
    updateProductVariety
}
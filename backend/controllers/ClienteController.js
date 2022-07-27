'use strict'
// ----------IMPORTS------------
var cliente = require('../models/cliente');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('../helpers/jwt');

const registroCliente = async function (req, res) {

    var data = req.body; // Se almacena dentro de data lo que se pase por el cuerpo de la request
    var clientesArray = [];

    clientesArray = await cliente.find({ email: data.email });//Se valida existencia del email que se va a registrar en la base de datps

    if (clientesArray.length == 0) {//Se comprueba la longitud del arreglo resultante si es 0 no hay reigstros y por lo tanto se creaa el usuario
        if (data.password) {//Se valida si el usuario ingresa contraseña
            bcrypt.hash(data.password, null, null, async function (err, hash) {//Se ejecuta metodo integrado de bcrypt para encriptar las contraseñas

                if (hash) {
                    data.password = hash;//se almacena en el campo x el parametro hash que es la contraseña encriptada
                    var reg = await cliente.create(data);//Se ejecuta registro del usuario con el metodo create de la dependencia mongoose
                    res.status(200).send({ data: reg });
                } else {
                    res.status(400).send({ message: 'Server Error', data: undefined });
                }
            });
        } else {
            res.status(200).send({ message: 'Debe ingresar una contraseña', data: undefined });
        }
    } else {
        res.status(200).send({ message: 'El correo ya existe en la base de datos', data: undefined });
    }
}


const loginCliente = async function (req, res) {
    var data = req.body;
    var validateEmail = [];

    validateEmail = await cliente.find({ email: data.email });

    if (validateEmail.length == 0) {
        res.status(200).send({ message: 'No se encontro usuario', data: undefined });
    } else {
        let user = validateEmail[0];

        bcrypt.compare(data.password, user.password, async function (error, check) {
            if (check) {
                res.status(200).send({
                    data: user,
                    token: jwt.createToken(user)
                });
            } else {
                res.status(200).send({ message: 'La contraseña no coincide', data: undefined });
            }
        });

    }
}

const fetchClients = async function (req, res) {

    // console.log(req.headers);

    if (req.user) {
        if (req.user.rol == 'admin') {
            let tipo = req.params['tipo'];
            let filtro = req.params['filtro'];

            if (tipo == null || tipo == 'null') {
                let data = await cliente.find();
                res.status(200).send({ data: data });
            } else {
                if (tipo == 'apellidos') {
                    let data = await cliente.find({ apellidos: new RegExp(filtro, 'i') });
                    res.status(200).send({ data: data });
                } else if (tipo == 'email') {
                    let data = await cliente.find({ email: new RegExp(filtro, 'i') });
                    res.status(200).send({ data: data });
                }
            }
        }else{
            res.status(500).send({ message: 'ForbbidenAccess' });
        }
    }else{
        res.status(500).send({ message: 'ForbbidenAccess' });
    }
}

const registerClientAdmin = async function(req, res){
    var clientesAdmArray = [];

    if(req.user){
        if(req.user.rol == 'admin'){
            var data = req.body;
            clientesAdmArray = await cliente.find({ email: data.email });
            if(clientesAdmArray.length == 0){
                bcrypt.hash('123456789', null, null, async function(err, hash){
                    if(hash){
                        data.password = hash;
                        let reg = await cliente.create(data);
                        res.status(200).send({ data: reg });
                    }else{
                        res.status(200).send({ message: 'No ingresa contraseña', data: undefined });
                    }
                });
            }else{
                res.status(409).send({ message: 'El correo ingresado ya se encuentra registrado', data: undefined });
            }
        }else{
            res.status(500).send({ message: 'ForbbidenAccess' });
        }
    }else{
        res.status(500).send({ message: 'ForbbidenAccess' });
    }
}

const fetchClientId = async function(req, res){
    if(req.user){
        if(req.user.rol == 'admin'){
            var id = req.params['id'];
            try {
                var reg = await cliente.findById({_id:id});
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

const updateClientData = async function(req, res){
    if(req.user){
        if(req.user.rol == 'admin'){
            var id = req.params['id'];
            var data = req.body;

            var update = await cliente.findByIdAndUpdate({_id:id},{
                nombres: data.nombres,
                apellidos: data.apellidos,
                email: data.email,
                telefono: data.telefono,
                f_nacimiento: data.f_nacimiento,
                dni: data.dni,
                genero: data.genero
            });
            res.status(200).send({ data:update, message: 'Usuario actualizado exitosamente' });
        }else{
            res.status(500).send({ message: 'ForbbidenAccess' });
        }
    }else{
        res.status(500).send({ message: 'ForbbidenAccess' });
    }
}

const deleteClient = async function (req, res) {
    if(req.user){
        if(req.user.rol == 'admin'){
            var id = req.params['id'];
            
            let delData = await cliente.findByIdAndRemove({_id:id});

            res.status(200).send({ data: delData, message: 'Usuario eliminado exitosamente' });
        }else{
            res.status(500).send({ message: 'ForbbidenAccess' });
        }
    }else{
        res.status(500).send({ message: 'ForbbidenAccess' });
    }
}

module.exports = {
    registroCliente,
    loginCliente,
    fetchClients,
    registerClientAdmin,
    fetchClientId,
    updateClientData,
    deleteClient
}
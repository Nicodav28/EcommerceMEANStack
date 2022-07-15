'use strict'
// ----------IMPORTS------------
var adminModel = require('../models/admin');
var bcrypt = require('bcrypt-nodejs')


const registroAdmin = async function(req, res){

    var data = req.body; // Se almacena dentro de data lo que se pase por el cuerpo de la request
    var adminArray = [];

    adminArray = await adminModel.find({email: data.email});//Se valida existencia del email que se va a registrar en la base de datps

    if (adminArray.length == 0){//Se comprueba la longitud del arreglo resultante si es 0 no hay reigstros y por lo tanto se creaa el usuario
        if(data.password){//Se valida si el usuario ingresa contraseña
            bcrypt.hash(data.password, null, null, async function(err, hash){//Se ejecuta metodo integrado de bcrypt para encriptar las contraseñas

                if(hash){
                    data.password = hash;//se almacena en el campo x el parametro hash que es la contraseña encriptada
                    var reg = await adminModel.create(data);//Se ejecuta registro del usuario con el metodo create de la dependencia mongoose
                    res.status(200).send({data: reg});
                }else{
                    res.status(400).send({message: 'Server Error', data: undefined});       
                }
            });
        }else{
            res.status(200).send({message: 'Debe ingresar una contraseña', data: undefined});       
        }
    }else{
        res.status(200).send({message: 'El correo ya existe en la base de datos', data: undefined});        
    }
}

module.exports = {
    registroAdmin
}
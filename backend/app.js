'use strict'

// Se inicializan variables de las dependencias descargadas
// -------------DEPENDENCES IMPORTS----------
var express = require('express');
var app = express(); //App es variable inicializadora de dependencia Express el cual es un framework
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var port = process.env.PORT || 4201;// Variable para puerto de ejecución del Backend

// ------------ROUTES IMPORTS----------
var clienteRoute = require('./routes/cliente');
var adminRoute = require ('./routes/admin');

// Usar variable de mongoose para hacer conexion con la base de datos 
mongoose.connect('mongodb://127.0.0.1:27017/tienda',(err, res) => {
    if(err){
        console.log(err);
    }else{
        // Si no hay error se inicializa el servidor backend indicandole el puerto y la tarea ejecutar cuando se inicie
        app.listen(port, function(){
            console.log('Servidor corriendo en el puerto ' + port);
        });
    }
});

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json({limit: '50mb',extended: true}));

app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','*'); 
    res.header('Access-Control-Allow-Headers','Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods','GET, PUT, POST, DELETE, OPTIONS');
    res.header('Allow','GET, PUT, POST, DELETE, OPTIONS');
    next();
});

app.use('/api', clienteRoute);
app.use('/api', adminRoute);

module.exports = app;


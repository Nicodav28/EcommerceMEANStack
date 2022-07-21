'use strict';

var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'AXS28856';

exports.createToken = function(user){
    var payload ={
        sub: user._id,
        nombres: user.nombres,
        apellidos: user.apellidos,
        email: user.email,
        rol: user.rol,
        iat: moment().unix(),
        exp: moment().add(7, 'days').unix()
    }

    return jwt.encode(payload,secret);
}
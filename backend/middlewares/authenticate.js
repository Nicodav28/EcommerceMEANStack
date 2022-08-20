'use strict';

var jwt = require('jwt-simple');
var moment = require('moment'); 
var secret = 'AXS28856';

exports.auth = function(req, res, next){
    if(!req.headers.authorization){
        return res.status(403).send({message: req.headers});
    }

    var token = req.headers.authorization.replace(/['"]+/g,'');
    var segmentToken = token.split('.');

    if(segmentToken.length != 3){
        return res.status(403).send({message: 'InvalidToken'});
    }else{
        try {
            var payload = jwt.decode(token,secret);
            
            if(payload.exp <= moment.unix){
                return res.status(403).send({message: 'ExpiredToken'});
            }

        } catch (error) {
            return res.status(403).send({message: 'Sesión expirada'});
        }
    }

    req.user = payload;

    next();
}
'use strict';

var jwt = require('jwt-simple');
var moment = require('moment'); 
var secret = 'AXS28856';

exports.auth = function(req, res, next){
    console.log(req.headers);
    if(!req.headers.Authorization){
        return res.status(403).send({message: 'NoHeadersError'});
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
            return res.status(403).send({message: 'InvalidToken'});
        }
    }

    req.user = payload;

    next();
}
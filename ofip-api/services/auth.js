const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Usuarios = require('../models').Usuario;
const config = require('../config');

const authenticate = params => {
    return Usuarios.findOne({
        where: {
            email: params.email
        },
        raw: true
    }).then(usuario => {
        if (!usuario)
            throw new Error('Authentication failed. User not found.');
        if (!bcrypt.compareSync(params.senha || '', usuario.senha))
            throw new Error('Authentication failed. Wrong password.');
        
        const payload = {
            email: usuario.email,
            id: usuario.id,
            time: new Date()
        };

        var token = jwt.sign(payload, config.jwtSecret, {
            expiresIn: config.tokenExpireTime
        });

        return token;
    });

};


module.exports = {
    authenticate
};
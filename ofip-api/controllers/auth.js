const config = require('../config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const authService = require('../services/auth');
const userService = require('../services/index');

function login(req, res) {
    return authService.authenticate(req.body)
    .then(token => {
        res.send({
            success: true,
            data: { token }
        });
    })
    .catch(err => {
        res.send({
            success: false,
            message: err.message
        });
    });
}

function register(req, res) {
    var email = req.body.email;
    return userService.getUsuarioPorLogin(req.body.email || '')
    .then(exists => {
        if (exists) {
            return res.send({
                success: false,
                message: 'Registration failed. User with this email already registered.'
            });
        }

        var usuario = {
            email: req.body.email,
            senha: bcrypt.hashSync(req.body.senha, config.saltRounds),
            cpf: req.body.cpf,
            projeto: req.body.projeto
        };

        return userService.adicionarUsuario(usuario)
            .then(() => res.send({success : true}));
    });
}

module.exports = {
    login,
    register
};


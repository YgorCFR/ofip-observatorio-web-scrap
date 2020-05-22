const config = require('../config/config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const authService = require('../services/auth');
const userService = require('../services/user');

const cache = require('../config/cache');
const redis = cache.client;

function login(req, res) {
    return authService.authenticate(req.body, res)
    .then(token => { 
        res.cookie('token', token, { httpOnly: true, secure: false});
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

function  logout(req, res) {
    return authService.logout(req, res).then(data => {
        res.send({
           success: true,
           data: { data } 
        });
    })
    .catch(err => {
        res.send({
            success: false,
            message: err.message
        });
    }); 
}
let forgotPassword = async(req, res, next) => {
    return await authService.forgotPassword(req, res, next).then(data => {
        res.send({
            success: true,
            data: { data }
        });
    })
    .catch(err => {
        res.status(400).send({
            success: false,
            message: err.message
        })
    });
}

let renderResetPassword =  (req, res) => {
    let query = req.query.h;
    let user = req.query.user;
    res.render('index', { title: 'Redefinição de senha', message: 'Favor, redefina sua senha nos dois campos abaixo.', hash: query, user: user});
}

let changePassword = async (req, res, next) => {
    return await authService.changePassword(req, res, next).then(data => {
        res.render('success' ,{ title: 'Sucesso na troca de senha', message: 'Sucesso na troca da senha.'});
    })
    .catch(err => {
        res.status(400).render( 'fail',{ title:'Falha na troca da senha', message: err.message })
    });
}

function register(req, res) {
    var email = req.body.email;
    return userService.getUserByLogin(req.body.email || '')
    .then(exists => {
        if (exists) {
            return res.send({
                success: false,
                message: 'Registration failed. User with this email already registered.'
            });
        }

        var user = {
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, config.saltRounds),
            cpf: req.body.cpf, 
            name: req.body.name,
            profileId: req.body.profileId
        };

        return userService.addUser(user)
            .then(() => res.send({success : true}));
    });
}

module.exports = {
    login,
    register,
    logout,
    forgotPassword,
    renderResetPassword,
    changePassword
};


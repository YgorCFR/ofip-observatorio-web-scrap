const sequelize = require('../db');
const Usuarios = require('../models').Usuario;

const adicionarUsuario = usuario => Usuarios.create(usuario);

const getUsuarioPorLogin = email => Usuarios.findOne({where: {email}}); 

module.exports = {
    adicionarUsuario,
    getUsuarioPorLogin
};
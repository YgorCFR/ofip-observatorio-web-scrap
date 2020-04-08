const Sequelize = require('sequelize');
const db = require('../db');

const Projeto = db.sequelize.define('projeto', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    nome: Sequelize.STRING
}, {
    timestamps: false,
    freezeTableName: true
});

const Usuario = db.sequelize.define('usuario', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    cpf: Sequelize.STRING,
    senha: Sequelize.STRING,
    email: Sequelize.STRING,
    projeto: {
        type: Sequelize.INTEGER,
        references : {
            model: Projeto,
            key: 'id'
        }
    }
},{
    timestamps: false,
    freezeTableName: true
});

Projeto.hasMany(Usuario, {foreignKey: 'projeto'});

module.exports = {
    Usuario,
    Projeto
};


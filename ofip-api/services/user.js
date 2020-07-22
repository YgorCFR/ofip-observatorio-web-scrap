const model = require('../models/index');
const Users = model.User;
const Op = model.Op;

const addUser = user => {
    return Users.findOne({
        where: {
            
                cpf: user.cpf
            }
    }).then(result => {
        console.log(result);
        if (result) {
            throw new Error('An user with these paramters already exists.');
        }
        Users.create(user);
    }).catch(err => {
        throw new Error(err);
    });
};

const getUserByLogin = email => Users.findOne({where: {email}}); 

module.exports = {
    addUser,
    getUserByLogin
};
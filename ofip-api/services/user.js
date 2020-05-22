const model = require('../models/index');
const Users = model.User;


const addUser = user => Users.create(user);

const getUserByLogin = email => Users.findOne({where: {email}}); 

module.exports = {
    addUser,
    getUserByLogin
};
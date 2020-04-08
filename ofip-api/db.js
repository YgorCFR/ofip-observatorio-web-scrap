const config = require('./config');
const Sequelize = require('sequelize');
var sequelize = new Sequelize(config.dbConectionString);

var db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
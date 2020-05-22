const env = require('../config/env');
 
const Sequelize = require('sequelize');
const sequelize = new Sequelize(env.database, env.username, env.password, {
  host: env.host,
  dialect: env.dialect,
  operatorsAliases: '0',
 
  pool: {
    max: env.max,
    min: env.pool.min,
    acquire: env.pool.acquire,
    idle: env.pool.idle
  }
});
 
const db = {};
 
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Defining tables.
db.User = require('./user')(sequelize, Sequelize);
db.Project = require('./project')(sequelize, Sequelize);
db.UserProject = require('./user_project')(sequelize, Sequelize);
db.Vehicle = require('./vehicle')(sequelize, Sequelize);
db.Source = require('./source')(sequelize, Sequelize);
db.KeyWord = require('./keyword')(sequelize, Sequelize);
db.News = require('./news')(sequelize, Sequelize);
db.Profile = require('./profile')(sequelize, Sequelize);
db.Route = require('./route')(sequelize, Sequelize);
db.Permission = require('./permission')(sequelize, Sequelize);

// User's relationships.
db.User.hasMany(db.UserProject, { foreignKey: 'userId'});
db.User.belongsTo(db.Profile, {foreignKey: 'profileId'});


// Project's relationships
db.Project.hasMany(db.UserProject, { foreignKey: 'projectId'});
db.Project.hasMany(db.KeyWord, { foreignKey: 'projectId'});

// UserProject's relationships
db.UserProject.belongsTo(db.User, { foreignKey: 'userId'});
db.UserProject.belongsTo(db.Project, { foreignKey: 'projectId'});

// Vehicle's relationships
db.Vehicle.hasMany(db.Source, { foreignKey: 'vehicleId'});

// Source's relationships
db.Source.belongsTo(db.Vehicle, { foreignKey: 'vehicleId'});
db.Source.belongsTo(db.KeyWord, { foreignKey: 'keyWordId'});
db.Source.hasMany(db.News, { foreignKey: 'sourceId'});

// KeyWord's relationships
db.KeyWord.hasMany(db.Source, { foreignKey: 'keyWordId'});
db.KeyWord.belongsTo(db.Project, { foreignKey: 'projectId'});

// Profile's relationships
db.Profile.hasMany(db.User, {foreignKey: 'profileId'});
db.Profile.hasMany(db.Permission, {foreignKey: 'profileId', as: 'profile_fk0'});

// Permission's relationships
db.Permission.belongsTo(db.Profile, {foreignKey: 'profileId', as : 'profile_fk0'});
db.Permission.belongsTo(db.Route, {foreignKey: 'routeId', as: 'route_fk1'});

// Route's reltionships
db.Route.hasMany(db.Permission, {foreignKey: 'routeId', as: 'route_fk1'});

module.exports = db;
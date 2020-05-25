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

db.Op = Sequelize.Op;
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
db.User.hasMany(db.UserProject, { foreignKey: 'userId', as: 'user_fk0'});
db.User.belongsTo(db.Profile, {foreignKey: 'profileId', as: 'profile_fk1'});


// Project's relationships
db.Project.hasMany(db.UserProject, { foreignKey: 'projectId', as: 'project_fk1'});
db.Project.hasMany(db.KeyWord, { foreignKey: 'projectId', as: 'project_fk0'});

// UserProject's relationships
db.UserProject.belongsTo(db.User, { foreignKey: 'userId', as: 'user_fk0'});
db.UserProject.belongsTo(db.Project, { foreignKey: 'projectId', as: 'project_fk1'});

// Vehicle's relationships
db.Vehicle.hasMany(db.Source, { foreignKey: 'vehicleId', as: 'vehicle_fk0'});

// Source's relationships
db.Source.belongsTo(db.Vehicle, { foreignKey: 'vehicleId', as: 'vehicle_fk0'});
db.Source.belongsTo(db.KeyWord, { foreignKey: 'keyWordId', as: 'keyword_fk0'});
db.Source.hasMany(db.News, { foreignKey: 'sourceId', as: 'source_fk0'});

// KeyWord's relationships
db.KeyWord.hasMany(db.Source, { foreignKey: 'keyWordId', as: 'keyword_fk0'});
db.KeyWord.belongsTo(db.Project, { foreignKey: 'projectId', as: 'project_fk0'});

// Profile's relationships
db.Profile.hasMany(db.User, {foreignKey: 'profileId', as: 'profile_fk1'});
db.Profile.hasMany(db.Permission, {foreignKey: 'profileId', as: 'profile_fk0'});

// Permission's relationships
db.Permission.belongsTo(db.Profile, {foreignKey: 'profileId', as : 'profile_fk0'});
db.Permission.belongsTo(db.Route, {foreignKey: 'routeId', as: 'route_fk1'});

// Route's relationships
db.Route.hasMany(db.Permission, {foreignKey: 'routeId', as: 'route_fk1'});

// News relationships
db.News.belongsTo(db.Source, { foreignKey: 'sourceId', as: 'source_fk0'});

module.exports = db;
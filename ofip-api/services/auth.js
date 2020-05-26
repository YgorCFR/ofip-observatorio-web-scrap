const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const model = require('../models/index');
const cache = require('../config/cache');
const Users = model.User;
const Profiles = model.Profile;
const Permission = model.Permission;
const Routes = model.Route;
const config = require('../config/config');
const redis = cache.client;
const CryptoJS = require("crypto-js");
const routes = require('../utils/routes_util');
const mailer = require('../config/email');
const dateUtil = require('../utils/date');

let route = routes.getServerRoutes();
let main = route.routes;

const authenticate = (params,res) => {
    return Users.findOne({
        where: {
            email: params.email
        },
        raw: true
    }).then(user => {
        if (!user)
            throw new Error('Authentication failed. User not found.');
        if (!bcrypt.compareSync(params.password || '', user.password))
            throw new Error('Authentication failed. Wrong password.');
        
        const payload = {
            email: user.email,
            id: user.id,
            time: dateUtil.makeCurrentDateByCorrectTimeZone(new Date())
        };

        var token = jwt.sign(payload, config.jwtSecret, {
            expiresIn: config.tokenExpireTime
        });

        var authData = {
            token: token,
            expiration: dateUtil.checkExpiration(config.tokenExpireTime, payload.time)
        };
        
        getUserPermissions(user);
        return authData;
    });

};

const forgotPassword = async (req, res, next) => {
    let email = req.body.email;
    let user =  await Users.findOne({
        where: { 
            email 
        },
        raw: true
    }).then(
        user => {
            return user;
        }
    )
    if (!user) {
        throw new Error('Authentication failed. User not found.');
    }

    let message = `${email}${new Date()}`;
    let hashString = CryptoJS.HmacSHA1(message, config.recovery).toString();
    let recoveryLink = `${config.host}:${config.port}/${config.apiName}/${config.apiVersion}${main.reset_password.route}?h=${hashString}&id=${user.id}`;
    await mailer.sendEmail(email, recoveryLink);
    redis.set(`${hashString}`, `${hashString}${user.id}`, 'EX', parseInt(config.recoveryExpireTime) * 60 * 60);
    return new Promise(
        function(resolve, reject) {
            resolve(recoveryLink)
        }
    ).then(result => {
        return result;
    }).catch(err => {
        next(err);
    });
};

const changePassword = async (req, res, next) => {
    let hash = req.body.hash;
    let id = req.body.id;
    let keyValue = `${hash}${id}`;
    let password = req.body.password;
    return new Promise(
        function(resolve, reject) {
            resolve(cache.checkIfKeyExistsAndGetId(hash, id), hash)
        }
    ).then(
        async result => {
            console.log(id);
            if ([...result].shift() == null) {
                throw new Error('The provided hash has expired, pleased send your forgot password again.');
            }
            else if ([...result].shift() != keyValue) {
                throw new Error('The value from the reset password screen and the one from the cache dont match.');
            }
            else if ([...result].shift() == keyValue) {
                let user = await Users.findOne({
                    where: {
                        id: parseInt(id,10)
                    },
                    raw: true
                }).then(user => {
                    return user;
                });

                if (!user) {
                    throw new Error('Authentication failed. User not found.');
                }

                let updatedUser = await Users.update({
                    password: bcrypt.hashSync(password, config.saltRounds)
                },
                { 
                    where: { id: user.id }
                }).then( user => {
                    return user;
                })
                .catch(err => { 
                    throw new Error('Could not update user.');
                });

                redis.del(hash);

                return updatedUser;
            }
        }
    ).catch(err => {
        throw err;
    });

}

const refreshToken  =  (req, res, next) => {
    let key = req.body.key == undefined? null : req.body.key; 
    return Users.findOne({
        where: {
            email: req.body.email
        },
        raw: true
    }).then(user => {
        if (!user)
            throw new Error('Authentication failed. User not found.');
        
        if (!key) 
            throw new Error('Please send your key.');

        const payload = {
            email: user.email,
            id: user.id,
            time: dateUtil.makeCurrentDateByCorrectTimeZone(new Date())
        };

        var token = jwt.sign(payload, config.jwtSecret, {
            expiresIn: config.tokenExpireTime
        });

        var authData = {
            token: token,
            expiration: dateUtil.checkExpiration(config.tokenExpireTime, payload.time)
        };

        redis.expire(key, parseInt(config.tokenExpireTime, 10) * 60 * 60);
        
        return authData;
    });
}

const logout = (req, res) => {
    let currentDate = new Date();
    let remainingDate= new Date(req.cookies.token.expiration);
    let token = req.cookies.token.token;
    let key = cache.makeTheBlackListKey(token, config.blacklist); 
    let ttl = dateUtil.calculateDiffToExpiration(currentDate, remainingDate);
    return new Promise(
        function (resolve, reject) {
            if (currentDate < remainingDate) { 
                resolve(cache.checkIfKeyExists(key));
            }
        }
    ).then( result => {
        if ([...result].shift() == null) {
            redis.set(key, token, "EX", Math.round(ttl));
        }
        else {
            throw new Error("You're already logged out.");
        }

        let objectResult = {
            message: "You're logged out."
        };

        return objectResult;
    });
}



let getUserPermissions = (user) => {
    Users.findAll({
        subQuery: false,
        required: true,
        attributes: ['id', 'email', 'cpf'],
        include: [{
         model: Profiles,
         attributes: ['id', 'nome'],
         subQuery: false,
         required: true,
         include: [
             {
                 model: Permission,
                 subQuery: false,
                 required: true,
                 attributes: ['id'],
                 as: "profile_fk0",
                 include : [
                     {
                        model: Routes,
                        subQuery: false,
                        required: true,
                        attributes: ['id','nome', 'rota', 'metodo'],
                        as: "route_fk1"
                     }
                 ]
             }
         ]
        }],
        where: {
            email: user.email
        }
    }).then(
        res => {
            let user_data = {};
            let redis_key = '';
            Object.keys(res).forEach( (keys) => {
                redis_key = res[keys].dataValues.cpf.toString();
                user_data.user = {id: res[keys].dataValues.id, name: res[keys].dataValues.email, cpf: res[keys].dataValues.cpf};
                user_data.perfil = {
                  id:   res[keys].dataValues.perfil.dataValues.id,
                  name: res[keys].dataValues.perfil.dataValues.nome
                };
                
                let routeArray =  res[keys].dataValues.perfil.dataValues.profile_fk0;
                
                user_data.routes = [];

                routeArray.forEach( (route ,index) => {  
                     let item = route.dataValues.route_fk1.dataValues;
                     user_data.routes.push({id: item.id, name: item.nome, route: item.rota, method: item.metodo});
                });
            });
            
            redis.set(redis_key , JSON.stringify(user_data), 'EX', parseInt(config.tokenExpireTime) * 60 * 60,redis.print);
            // redis.del(redis_key, function(err, reply) {
            //     console.log(reply);
            // });
        }
    );
};




module.exports = {
    authenticate,
    logout,
    forgotPassword,
    changePassword,
    refreshToken
};
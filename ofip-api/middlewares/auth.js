const jwt = require('jsonwebtoken');
const config = require('../config/config');
const cache = require('../config/cache');
const redis = cache.client;

const checkAuth = (req, res, next) => {
    var token = req.cookies.token == undefined ? null : req.cookies.token.token;
    if (token == null) 
        return res.status(403).send({auth: false, message: 'No token provided.'});

    jwt.verify(token, config.jwtSecret, (err, decoded) => {
        if (err)
            return res.status(500).send({auth: false, message: 'Failed to authenticate token.'});
        
        req.user = {
            email: decoded.email,
            id: decoded.id
        };
        next();
    });
};

let setCookiesToken = (req, res, next) => {
    let token = req.headers.authorization == undefined ? null :req.headers.authorization;
    if (token != null) {
        if (token.includes("Bearer")) {
            token = token.replace("Bearer ", "").trim();
            req.cookies.token = {
                token: token
            };
            next();
        }
    } else {
        req.cookies.token = {
            token: null
        }
        next();
    }

}


const checkIfTokenIsFromBlackList = (req, res, next) => {
    return new Promise(
        function(resolve, reject) {
            let token = req.cookies.token.token;
            let key = cache.makeTheBlackListKey(token, config.blacklist);
            resolve(cache.checkIfKeyExists(key))
        }
    )
    .then(result => {
        if ([...result].shift() != null) {
            return res.status(400).send({auth: false, message: 'The provided token is in blacklist, please enter a valid token.'});
        }
        else {
            next();
        }
    })
    .catch(err => {
        next(err);
    });
}

const hasRole = (route) => {
    return (req, res, next) => {
        let matches = [];
        
        redis.get(req.body.key, function (error, result) {
            if (error) {
                throw error;
            }
            let user_data = JSON.parse(result);
            if (user_data != null) {
                user_data.routes.forEach(element => {
                    if (route.trim() == element.name.trim()) {
                        matches.push(element);
                    }
                });
            }
            else {
                return res.status(400).send({auth: false, message: 'You are not logged in.'});
            }
            if (matches.length == 0){
                return res.status(403).send({auth: false, message: 'You do not have permissions.'});
            }
            next();
        });
    };
};


module.exports = {
    checkAuth,
    hasRole,
    checkIfTokenIsFromBlackList,
    setCookiesToken
};
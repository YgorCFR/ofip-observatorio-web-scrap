const redis = require('redis');
const bluebird = require("bluebird");
bluebird.promisifyAll(redis.RedisClient.prototype);

const client = redis.createClient();
client.on('connect', function() {
    console.log('Redis client connected');
});

client.on('error', function (err) {
    console.log('Something went wrong ' + err);
});

const checkIfKeyExists = (key) => {
    var redisValue = client.getAsync(key).then(function(reply) {
        return reply;
    });
    return Promise.all([redisValue]);
}

const checkIfKeyExistsAndGetId = (key, id) => {
    var redisValue = client.getAsync(key).then(function(reply) {
        return reply;
    });
    
    return Promise.all([redisValue, id]);
} 

const makeTheBlackListKey = (token, keyWord) => {
    return `${keyWord}${token.toString()}`;
}


module.exports = {
    client,
    checkIfKeyExists,
    makeTheBlackListKey,
    checkIfKeyExistsAndGetId
};
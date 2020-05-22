module.exports = {
    host: 'https://localhost',
    apiName: 'api',
    apiVersion: 'v1',
    port: 3000,
    saltRounds: 2,
    jwtSecret: 'secretKey',
    tokenExpireTime: '6h',
    recoveryExpireTime: '6h',
    memcached: 'localhost:11211',
    blacklist: 'blacklistTokens',
    recovery: 'recoveryHashToSendToEmail',
    email : {
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: "projeto.ofip@id.uff.br",
            password: "*********"
        }
    }
};
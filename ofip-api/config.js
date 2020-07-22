module.exports = {
    port: 3000,
    dbConectionString: 'mysql://root:*********@localhost:3306/ofip',
    saltRounds: 2,
    jwtSecret: 'secretKey',
    tokenExpireTime: '6h'
};

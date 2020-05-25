const config = require('../config/config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const newsService = require('../services/news');

const cache = require('../config/cache');
const redis = cache.client;


const getNewsHeader = (req, res, next) => {
    return newsService.getNewsHeader(req, res, next)
        .then(
            news => {
                res.send({
                    success: true,
                    data: { news }
                })
            }
        )
        .catch(
            err => {
                res.status(400).send({
                    success: false,
                    message: err
                })
            }
        )
};


module.exports = {
    getNewsHeader
}

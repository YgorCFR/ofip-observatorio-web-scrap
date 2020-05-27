const config = require('../config/config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const newsService = require('../services/news');

const cache = require('../config/cache');


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

const getNewsDetail = (req, res, next) => {
    return newsService.getNewsDetail(req, res, next)
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

const createNews = async (req, res, next) => {
    return  await newsService.createNews(req, res, next)
            .then(
                news => {
                    res.send({
                        success: true,
                        data: { news }
                    })
                })
            .catch(
                err => {
                    res.status(400).send({
                        success: false,
                        message: 'This news does already exists at database.'
                    })
                }
            )
}

const deleteNews = async (req, res, next) => {
    return await newsService.deleteNews(req, res, next)
            .then(
                news => {
                    res.send({
                        success: true,
                        data: { news }
                    })
                })
            .catch(
                err => {
                    res.status(400).send({
                        success: false,
                        message: err
                    })
                }
            )
}


module.exports = {
    getNewsHeader,
    getNewsDetail,
    createNews,
    deleteNews
}

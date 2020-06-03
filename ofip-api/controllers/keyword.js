const keywordService = require('../services/keyword');

const getAllKeyWords = (req, res, next) => {
    return keywordService.getAllKeyWords(req, res, next)
        .then(keywords => {
            res.send({
                success: true,
                data: keywords
            })
        })
        .catch(err=> {
            res.send({
                success: false,
                message: err
            })   
        })
}

const registerKeyWords = (req, res, next) => {
    return keywordService.registerKeyWords(req, res, next)
        .then(keywords => {
            res.send({
                success: true,
                message: 'Registed keyword.'
            })
        })
        .catch(err => {
            res.status(400).send({
                success: false,
                message: err
            })
        })
}

module.exports = {
    getAllKeyWords,
    registerKeyWords    

}
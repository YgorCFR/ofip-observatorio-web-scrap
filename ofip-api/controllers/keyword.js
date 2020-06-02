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

module.exports = {
    getAllKeyWords    

}
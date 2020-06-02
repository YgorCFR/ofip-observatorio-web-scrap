const model = require('../models/index');


const KeyWords = model.KeyWord;



const getAllKeyWords = (req, res, next) => {
    return KeyWords.findAll({

    }).then(
        keywords => {
            if (!keywords) {
                throw new Error('There is no keywords available.');
            }

            return keywords;
        })
      .catch(
        err => {
            next(err);
        })
};


module.exports  = {
    getAllKeyWords    
}
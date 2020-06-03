const model = require('../models/index');


const KeyWords = model.KeyWord;
const Projects = model.Project;
const sequelize = model.sequelize;

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


const registerKeyWords = async (req, res, next) => {
    // Verificando a existência do projeto
    let project = await Projects.findOne({
        where: {
            id: req.body.projectId
        }
    }).then(project => { return project }).catch(err => { throw new Error('Please provide the project id.') });
    
    if (!project) {
        throw new Error('Project not found, select an existed project to create the keyword.');
    }

    let countKeyWords = await KeyWords.count({
        distinct: true,
        col: 'id'
    }).then(count => { return count}).catch(() => { throw new Error(`An happened error while counting the keywords. ${error}.`)});

    if (countKeyWords > 99) {
        throw new Error('You can not register keywords anymore, it reached 100 records.');
    }

    let checkIfKeywordExists = await KeyWords.count({
        where: { 
            value: req.body.value 
        }
    }).then(keyword => { return keyword }).catch(() => {throw new Error(err)});

    let result = await sequelize.transaction(async (t) => {
    
        if (checkIfKeywordExists == 0) {
            const keyword = await KeyWords.create({
                value: req.body.value,
                projectId: req.body.projectId
            }, {transaction: t});

            return keyword;
        }
        else {
            throw new Error('The register already exists.');
        }

    });

    return new Promise(
        function(resolve, reject) {
            resolve(result);
        }
    ).then(result => {
        return result;
    }).catch(err=> {
        console.log(err);
        throw new Error(err);
    })
}


module.exports  = {
    getAllKeyWords,
    registerKeyWords    
}
const model = require('../models/index');
const pagination = require('../utils/paging');

// Getting models that are will be used to do the queries
const KeyWords = model.KeyWord;
const News = model.News;
const Source = model.Source;
const Project = model.Project;
const UsersProject = model.UserProject; 
const Vehicle = model.Vehicle;
const sequelize = model.sequelize;
const Op = model.Op;


const getAllNews = () => News.findAll();

const getNewsHeader = (req, res, next) => {
    let where = {};
    // condições de data
    if ((req.query.start != undefined) || (req.query.start != null) && (req.query.end != undefined) || (req.query.end != null)) {
        where.date = { [Op.gte] : req.query.start, [Op.lte] : req.query.end }
    } else if ((req.query.start != undefined) || (req.query.start != null)) { 
        where.date = { [Op.gte] : req.query.start }
    } else if ((req.query.end != undefined) || (req.query.end != null)) {
        where.date = { [Op.lte] : req.query.end }
    }
    // condições de veículo
    if ((req.query.vehicleId != undefined) || (req.query.vehicleId != null))  {
        where[Op.and] = [
            { ['$source_fk0->vehicle_fk0.id$'] : parseInt(req.query.vehicleId)}  
        ]
    }
    // condições de palavra chave
    if ((req.query.keyWordId != undefined) || (req.query.keyWordId != null)) {
        where[Op.and] = [
            {['$source_fk0->keyword_fk0.id$'] : parseInt(req.query.keyWordId)}
        ]
    }
    // condições de projeto 
    if ((req.query.projectId) != undefined || (req.query.projectId != null)) {
        where[Op.and] = [
            {['$source_fk0->keyword_fk0->project_fk0.id$'] : parseInt(req.query.projectId)}
        ]
    }
    
    // condições para o texto
    where.text = {
        [Op.and] : [
            // filtrando as noticias que não estão vazias.
            sequelize.where(sequelize.fn('trim',sequelize.fn('char_length', sequelize.col('noticia.texto'))), { [Op.gte] : 1 } )
        ]
    } 

    // Busca pelos limite de pagina e quantidade de registros por página
    let pagesAndLimits = pagination.pageHandler(req.params);
    console.log(pagesAndLimits);

    return News.findAll({
        subQuery: false,
        required: true,
        attributes: ['id', 'title','date', 'sourceId'],
        include: [{
            model: Source,
            attributes: ['id'],
            subQuery: false,
            as: 'source_fk0',
            required: true,
            include: [{
                model: KeyWords,
                attributes: ['id'],
                subQuery: false,
                required: true,
                as: 'keyword_fk0',
                include: [{
                    model: Project,
                    attributes: ['id'],
                    subQuery: false,
                    required: true,
                    as: 'project_fk0'
                }]
            },{
                model: Vehicle,
                attributes: ['id'],
                subQuery: false,
                required: true,
                as: 'vehicle_fk0'
            }]
        }]
        , order: [['date', 'DESC']]
        , limit: pagesAndLimits.limit
        , offset: pagesAndLimits.offset
        , where: where
    }).then(news => {
        return news;
    }).catch(err => {
        throw new Error(err);
    });
};

module.exports = {
    getAllNews,
    getNewsHeader
}




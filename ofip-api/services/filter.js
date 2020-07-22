const filter = require('../utils/enums/filter');
const model = require('../models/index');

// Entidades.
const News = model.News;
const Projects = model.Project;
const Keyword = model.KeyWord;
const Vehicle = model.Vehicle;
const Source = model.Source;

// Items para auxilio na montagem de query
const sequelize = model.sequelize;
const Op = model.Op;

const getFilterParams = (param, req) => {
    let where  = {};
    // Definindo atributos de projeto
    let projectsAttributes = param == filter.PROJECT ? ['id', 'name'] : [];
    // Definindo atributos de veiculo
    let vehicleAttributes = param == filter.VEHICLE ? ['id', 'site'] : [];
    // Definindo atributos de palavra chave
    let keywordAttributes = param == filter.KEYWORD ? ['id', 'valor'] : [];
    // Definindo metodo de ordenacao
    let orderingMethod = param == filter.PROJECT ? [['project_fk0', 'name','ASC']] : param == filter.KEYWORD ? [['value' , 'ASC']] : [['keyword_fk0', 'vehicle_fk0', 'site', 'ASC']];
    console.log(orderingMethod);    
    // Definindo metodo de agrupamento
    let groupingMethod = param == filter.PROJECT ? ['project_fk0.id', 'project_fk0.nome'] : param == filter.KEYWORD ? keywordAttributes : ['keyword_fk0->vehicle_fk0.id', 'keyword_fk0->vehicle_fk0.site'];

    // condições de veículo
    if (((req.query.vehicleId != undefined) || (req.query.vehicleId != null)) && (param != filter.VEHICLE))  {
        where['$keyword_fk0->vehicle_fk0.id$'] = parseInt(req.query.vehicleId);
    }
    // condições de palavra chave
    if (((req.query.keyWordId != undefined) || (req.query.keyWordId != null)) && (param != filter.KEYWORD)) {
        where['$palavra_chave.id$'] = parseInt(req.query.keyWordId);
    }
    // condições de projeto 
    if (((req.query.projectId) != undefined || (req.query.projectId != null)) && (param != filter.PROJECT) && (param != filter.KEYWORD)) {
        where['$project_fk0.id$'] = parseInt(req.query.projectId)
    }
    
    // condições para o texto
    where.text = {
        [Op.and] : [
            // filtrando as noticias que não estão vazias.
            sequelize.where(sequelize.fn('trim',sequelize.fn('char_length', sequelize.col('keyword_fk0->source_fk0.texto'))), { [Op.gte] : 1 } )
        ]
    } 


    return Keyword.findAll({
        subQuery: false,
        required: true,
        attributes: keywordAttributes,
        include: [{
            model: Projects,
            attributes: projectsAttributes,
            subQuery: false,
            as: 'project_fk0',
            required: true
        },
        {
            model: Source,
            attributes: [],
            subQuery: false,
            as: 'keyword_fk0',
            required: true,
            include: [{
                model: Vehicle,
                attributes: vehicleAttributes,
                subQuery: false,
                as: 'vehicle_fk0',
                required: true,
            },{
                model: News,
                attributes: [],
                subQuery: false,
                as: 'source_fk0',
                required: true
            }]
        }]
        , order: orderingMethod
        , group: groupingMethod
        , where : where
        , raw: true
    }).then(filters => {
        console.log(param == filter.PROJECT);
        if (param == filter.KEYWORD) {
            filters = mapKeyWords(filters);
        }
        else if (param == filter.PROJECT) {
            filters = mapProjects(filters);
        }
        else {
            filters = mapVehicles(filters);
        }

        return filters;
    }).catch(err => {
        console.log(err);
        throw new Error(`Error while fetching the ${Object.keys(filter)[param]} filter.`);
    });
}

const mapKeyWords = (data) => {
    let result = [];
    Object.keys(data).forEach((key) => {
        result.push({id: data[key].id,
        value: data[key].valor});
    });
    return result;
}


const mapVehicles = (data) => {
    let result = [];
    Object.keys(data).forEach((key) => {
        result.push({id : data[key]["keyword_fk0.vehicle_fk0.id"],
                site : data[key]["keyword_fk0.vehicle_fk0.site"]});
    });
    return result;
}

const mapProjects = (data) => {
    let result = [];
    Object.keys(data).forEach((key) => {
        result.push({id : data[key]['project_fk0.id'], name: data[key]['project_fk0.name']});
    });
    return result;
}


module.exports = {
    getFilterParams
};
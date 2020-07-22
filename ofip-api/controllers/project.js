const projectService = require('../services/project');
const filterService = require('../services/filter');

const filter = require('../utils/enums/filter');

function getProjects(req, res) {
    return filterService.getFilterParams(filter.PROJECT, req)
        .then(projects => {
            res.send({
                success: true,
                data: projects
            })
        })
        .catch(err=> {
            res.status(400).send({
                success: false,
                message: err
            })   
        })
}

function getProject(req, res) {
    projectService.getById(req.params.id)
    .then(data => res.send(data)
    );
}

function addProject(req, res) {
    projectService.add({
        id : req.body.id,
        nome: req.body.nome
    })
    .then(
        data => res.send(data)
    );
}

module.exports = {
    getProjects,
    getProject,
    addProject
};
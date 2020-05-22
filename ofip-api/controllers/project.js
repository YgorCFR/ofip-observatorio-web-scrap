const projectService = require('../services/project');

function getProjects(req, res) {
    projectService.getAll()
    .then(
        data => res.send(data)
    ).catch(
        error => {
            throw error;
        }
    );
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
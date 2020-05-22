const model  = require('../models/index');
const Projects = model.Project;

const getAll = () => Projects.findAll();

const getById = () => Projects.findById(id);

const add = project => Projects.create(project);

module.exports = {
    add,
    getAll,
    getById
};
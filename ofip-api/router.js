const authController = require('./controllers/auth');
const projectController = require('./controllers/project');

const authMiddleware = require('./middlewares/auth');

const routes = require('./utils/routes_util');

let route = routes.getServerRoutes();
let main = route.routes;
let root = `${route.root.api}${route.root.version}`;

module.exports.set = (app) => {
    app.post(`${root}${main.login.route}`, authController.login);
    app.post(`${root}${main.register.route}`, authController.register);
    app.get(`${root}${main.logout.route}`, authMiddleware.checkAuth, authMiddleware.checkIfTokenIsFromBlackList, authController.logout);
    app.get(`${root}${main.forgot_password.route}`, authController.forgotPassword);
    app.post(`${root}${main.change_password.route}`, authController.changePassword);
    
    app.get(`${root}${main.reset_password.route}`, authController.renderResetPassword);

    app.get(`${root}${main.get_projects.route}`, authMiddleware.checkAuth, authMiddleware.checkIfTokenIsFromBlackList, authMiddleware.hasRole(`${main.get_projects.name}`) ,projectController.getProjects);
    app.get(`${root}${main.get_project.route}`, authMiddleware.checkAuth, authMiddleware.checkIfTokenIsFromBlackList, projectController.getProject);
    app.post(`${root}${main.register_project}`, authMiddleware.checkAuth, authMiddleware.checkIfTokenIsFromBlackList, projectController.addProject);    
};
const authController = require('./controllers/auth');
const projectController = require('./controllers/project');
const newsController = require('./controllers/news');

const authMiddleware = require('./middlewares/auth');

const routes = require('./utils/routes_util');

let route = routes.getServerRoutes();
let main = route.routes;
let root = `${route.root.api}${route.root.version}`;

module.exports.set = (app) => {
    
    //#region Rotas de authController
    /**
     * Rota de login.
     * @param `${root}${main.login.route}` // caminho da rota de login. ref: routes.json
     * @param authController.login // método de realizar login.
     */
    app.post(`${root}${main.login.route}`, authController.login);
    /**
     * Rota de registro de usuários.
     * @param  `${root}${main.register.route}` // caminho da rota de registro. ref: routes.json
     * @param  authController.register // método de registro de usuário.
     */
    app.post(`${root}${main.register.route}`, authController.register); 
    /**
     * Rota de logout.
     */
    app.get(`${root}${main.logout.route}`, authMiddleware.setCookiesToken, authMiddleware.checkAuth, authMiddleware.checkIfTokenIsFromBlackList, authController.logout);
    /**
     * Rota de esqueci a senha.
     */
    app.get(`${root}${main.forgot_password.route}`, authController.forgotPassword);
    /**
     * Rota de redefinição de senha.
     */
    app.post(`${root}${main.change_password.route}`, authController.changePassword);
    /**
     * Rota de refresh de token.
     */
    app.post(`${root}${main.refresh_token.route}`, authMiddleware.setCookiesToken, authMiddleware.checkAuth, authController.refreshToken);
    /**
     * Rota de renderização da tela de redefinição de senha.
     */
    app.get(`${root}${main.reset_password.route}`, authController.renderResetPassword);
    //#endregion

    //#region Rotas de projectController
    /**
     * Rota de selecionar todos os projetos.
     */
    app.get(`${root}${main.get_projects.route}`, authMiddleware.setCookiesToken,authMiddleware.checkAuth, authMiddleware.checkIfTokenIsFromBlackList, authMiddleware.hasRole(`${main.get_projects.name}`) ,projectController.getProjects);
    /**
     * Rota de selecionar apenas um projeto por seu id.
     */
    app.get(`${root}${main.get_project.route}`, authMiddleware.setCookiesToken, authMiddleware.checkAuth, authMiddleware.checkIfTokenIsFromBlackList, projectController.getProject);
    /**
     * rota de registro de projeto
     */
    app.post(`${root}${main.register_project.route}`, authMiddleware.setCookiesToken, authMiddleware.checkAuth, authMiddleware.checkIfTokenIsFromBlackList, projectController.addProject);    
    //#endregion

    //#region Rotas de notícias
    app.get(`${root}${main.get_news_header.route}`, newsController.getNewsHeader);

    //#endregion
};
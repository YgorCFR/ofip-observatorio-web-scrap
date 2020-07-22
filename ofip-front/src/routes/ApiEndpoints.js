import { ApiRoot } from "./ApiRoot";

const ApiRoutes = {
    login: "/auth/login",
    logout: "/auth/logout",
    register: "/auth/register",
    profiles: "/profile/profiles/all",
    news_header: "/news/get-news-header/",
    keywords: "/keywords/get-keywords",
    vehicles: "/vehicle/get-vehicles",
    projects: "/project/projects/all",
    news_excel: "/news/export-filter-news-xls/",
    news_txt: "/news/export-filter-news-txt/",
    news_detail: "/news/get-news-detail/",
    news_add: "/news/create-news",
    news_update: "/news/update-news",
    news_delete: "/news/delete-news"
};


const getApiRoute = (route) => {
    return `${ApiRoot.host}:${ApiRoot.port}/${ApiRoot.version}${route}`;
} 


export const ApiEndpoints = {
    ApiRoutes,
    getApiRoute
}
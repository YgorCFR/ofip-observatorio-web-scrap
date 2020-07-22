import { ApiEndpoints } from './../routes/ApiEndpoints';
import axios from 'axios';




export const newsService =  {
    getNewsHeader,
    exportExcelNewsHeader,
    exportTxtNewsHeader,
    getNewsDetail,
    addNews,
    updateNews,
    deleteNews
}

function getNewsHeader (page, queryString) {
    console.log(`${ApiEndpoints.getApiRoute(ApiEndpoints.ApiRoutes.news_header)}${page}/10/1/0${queryString}`);
    const headers = {
        'Content-Type': 'sdsaasfasfasfasfasfasfasfasf'
    };
    return axios.get(`${ApiEndpoints.getApiRoute(ApiEndpoints.ApiRoutes.news_header)}${page}/10/1/0${queryString}`, {
        headers: headers
    });
}

function addNews (body, queryString) {
    return axios.post(`${ApiEndpoints.getApiRoute(ApiEndpoints.ApiRoutes.news_add)}${queryString}`, body, {headers: {'Authorization' : 
    `Bearer ${JSON.parse(localStorage.getItem('token'))}`}})
}

function deleteNews (queryString, id) {
    return axios.delete(`${ApiEndpoints.getApiRoute(ApiEndpoints.ApiRoutes.news_delete)}/${id}${queryString}`, {headers: {'Authorization' : 
    `Bearer ${JSON.parse(localStorage.getItem('token'))}`}})
}

function updateNews (body, queryString, id) {
    return axios.put(`${ApiEndpoints.getApiRoute(ApiEndpoints.ApiRoutes.news_update)}/${id}${queryString}`, body, {headers: {'Authorization' : 
    `Bearer ${JSON.parse(localStorage.getItem('token'))}`}})
}

function getNewsDetail (id, queryString) {
    return axios.get(`${ApiEndpoints.getApiRoute(ApiEndpoints.ApiRoutes.news_detail)}${id}${queryString}`);
}


function exportExcelNewsHeader (size, page, queryString) {
    window.open(`${ApiEndpoints.getApiRoute(ApiEndpoints.ApiRoutes.news_excel)}${page}/${size}/1/1${queryString}`, '_blank');
}

function exportTxtNewsHeader (size, page, queryString) {
    window.open(`${ApiEndpoints.getApiRoute(ApiEndpoints.ApiRoutes.news_txt)}${page}/${size}/1/1${queryString}`, '_blank');
}

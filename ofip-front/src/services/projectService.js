import { ApiEndpoints } from './../routes/ApiEndpoints';
import axios from 'axios';

export const projectService = {
    getProjects
}

function getProjects(queryString)  {
    return axios.get(`${ApiEndpoints.getApiRoute(ApiEndpoints.ApiRoutes.projects)}${queryString}`, {headers: {'Authorization' : 
    `Bearer ${JSON.parse(localStorage.getItem('token'))}`}})
        .then(res => {
            return res.data;
        })
        .catch(err => {
            return err;
        })
}
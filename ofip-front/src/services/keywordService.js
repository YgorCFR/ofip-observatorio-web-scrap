import { ApiEndpoints } from './../routes/ApiEndpoints';
import axios from 'axios';

export const keywordService = {
    getKeyWords
}

function getKeyWords(queryString) {
    return axios.get(`${ApiEndpoints.getApiRoute(ApiEndpoints.ApiRoutes.keywords)}${queryString}`)
        .then(res => {
            return res.data;
        })
        .catch(err => {
            return err;
        })
}





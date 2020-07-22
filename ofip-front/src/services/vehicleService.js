import { ApiEndpoints } from './../routes/ApiEndpoints';
import axios from 'axios';

export const vehicleService = {
    getVehicles
}


function getVehicles(queryString) {
    return axios.get(`${ApiEndpoints.getApiRoute(ApiEndpoints.ApiRoutes.vehicles)}${queryString}`)
        .then(res => {
            return res.data;
        })
        .catch(err => {
            return err;
        })
}
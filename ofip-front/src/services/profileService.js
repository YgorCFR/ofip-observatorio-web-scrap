import { ApiEndpoints } from './../routes/ApiEndpoints';
import { userService } from './userService';
import  axios  from 'axios';

export const profileService = {
    getProfiles
};


function getProfiles () {

    return axios.get(ApiEndpoints.getApiRoute(ApiEndpoints.ApiRoutes.profiles))
        .then(res => {
            console.log(res);
            console.log(res.data.profiles);
            return res.data.profiles;
        })
        .catch(err => {
            return err;
        })
}


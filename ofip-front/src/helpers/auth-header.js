import axios from 'axios';
import { userService } from './../services/userService';

export function authHeader() {
    // return authorization header with jwt token
    let token = JSON.parse(localStorage.getItem('token'));

    if (token) {
        return { 'Authorization': 'Bearer ' + token};
    } else {
        return {};
    }
}

export function interceptor() {
    axios.interceptors.response.use((response) => {
        return response;
    }, function (error) {
        // Do something with response error
        if (error.response.status === 401) {
            console.log('unauthorized, logging out ...');
            userService.logout();
            window.location.reload();
        }
        return Promise.reject(error.response);
    });
}
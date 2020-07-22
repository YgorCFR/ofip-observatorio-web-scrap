import { authHeader } from './../helpers/auth-header';
import { ApiEndpoints } from './../routes/ApiEndpoints';
import axios from 'axios';

export const userService = {
    login,
    logout,
    clearStorage,
    register
};

function getRequestOptions() {
    return {
        method: 'GET',
        headers: authHeader()
    };
}

function postRequestOptions(body) {
    return {
        method: 'POST',
        headers: { 'Content-Type' : 'application/json' },
        body: body
    };
}

function login (username, password) {
    
    const requestOptions = postRequestOptions(JSON.stringify({ email: username, password }));

    return fetch(ApiEndpoints.getApiRoute(ApiEndpoints.ApiRoutes.login) , requestOptions)
        .then(handleResponse)
        .then(user => {
            localStorage.setItem('token', JSON.stringify(user.data.token.token))
            localStorage.setItem('user', JSON.stringify(user.data.token.name))
            localStorage.setItem('expiration', JSON.stringify(user.data.token.expiration))
            localStorage.setItem('key', JSON.stringify(user.data.token.key));
            return user;
        })
}

function register (body) {
    return axios.post(ApiEndpoints.getApiRoute(ApiEndpoints.ApiRoutes.register), body);
} 

function clearStorage() {
    localStorage.clear();
}

function logout() {
    // remove user from local storage to log user out
    const requestOptions = getRequestOptions();
    let key = JSON.parse(localStorage.getItem('key'));
    let expiration = JSON.parse(localStorage.getItem('expiration'));
    return fetch(`${ApiEndpoints.getApiRoute(ApiEndpoints.ApiRoutes.logout)}?key=${key}&expiration=${expiration}`, requestOptions)
        .then(handleResponse)
        .then( res => {
            clearStorage();
            return res;
        });
}

function handleResponse(response) {
    console.log(response);
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                // eslint-disable-next-line no-restricted-globals
                location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}
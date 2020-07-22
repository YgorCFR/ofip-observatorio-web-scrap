
import { userService } from './../services/userService';
import { history } from '../helpers/history';
import { alertActions } from './alertActions';
import { userConstants } from './../constants/userConstants';
import { registerConstants } from './../constants/registerConstants';
import { alertConstants } from '../constants';
import Swal from 'sweetalert2';

export const userActions = {
    login,
    logout,
    clearCredentials,
    goToRegisterUser,
    registerUser,
    validatePassword,
    backToLogin
}


function login(username, password) {
    return  dispatch => {
        dispatch(request({ username }));

        userService.login(username, password)
            .then(
                user => {
                    console.log(user.data.token.name);
                    dispatch(success(user.data.token.name));
                    dispatch({type: userConstants.SIGN_IN, result: true })
                    dispatch(alertActions.clear());
                    history.push('/');
                },
                error => {
                    dispatch(failure(error.toString()))
                    dispatch(alertActions.error('Erro ao logar certifique-se de utilizar um email e senha cadastrados.'));
                }
            )
    }

    function request(user) { return {type: userConstants.LOGIN_REQUEST, user} }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

function clearCredentials() {
    userService.clearStorage();
    return dispatch => {
        dispatch({ type: userConstants.LOGIN_CLEAR });
        dispatch({ type: userConstants.SIGN_OUT, result: false });
        dispatch(alertActions.clear());
    }
}

function logout() {
    return dispatch => {
        userService.logout().then(
            () => {
                dispatch(logoutSuccess());
                dispatch({ type: userConstants.SIGN_OUT, result: false });
                history.push('/login');
            },
            error => {
                console.log(error);
                dispatch(logoutError(error.toString()));
            }
        );
    }

    function logoutSuccess() { return { type: userConstants.LOGOUT }};
    function logoutError(error) { return {type: 'LOGOUT_ERROR', error } };
}

function goToRegisterUser() {
    return dispatch => {
        dispatch({type: ''});
        history.push('/register');
    }
}

function validatePassword(password) {
    return dispatch => {
        // eslint-disable-next-line no-useless-escape
        let strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
        if (!strongRegex.test(password) || !strongRegex.test(password)) {
            dispatch({type: alertConstants.ERROR, message: 'Sua senha deve conter: caracteres alfanuméricos maiúsculos e minúsculos e caracteres especiais. No mínimo 8 caracteres.'});
        }
        else {
            dispatch(alertActions.clear());
        }
    }
}

function backToLogin() {
    return dispatch => {
        dispatch({type:''})
        history.push('/login');
    }
}

function registerUser(body) {
    return dispatch => {
        dispatch(request(body))
        userService.register(body).then(
            body => {
                if (body.data.success) {
                    Swal.fire({
                        title: 'Sucesso!',
                        text: 'Usuário registrado com sucesso',
                        icon: 'success',
                        confirmButtonText: 'Confirma'
                    });
                    dispatch(success(body.data.success));  
                    dispatch(alertActions.clear());
                }
            }).catch(err => 
                {
                    console.log(err.response);
                    let message = err.response.data;
                    dispatch(failure(message));
                    dispatch({type: alertConstants.ERROR, message: message});
                });
    }

    function request(body) { return {type: registerConstants.REGISTER_REQUEST , body } }
    function success(body) { return { type: registerConstants.REGISTER_SUCCESS, body } }
    function failure(error) { return { type: registerConstants.REGISTER_FAIL, error } }
}


import { userConstants } from './../constants/userConstants';

export const appActions = {
    checkIfUserIsSignedIn
}

function checkIfUserIsSignedIn() {
    return dispatch => {
        if (localStorage.getItem('user')) {
            dispatch({type: userConstants.SIGN_IN, result: true});
        }
        else {
            dispatch({type: userConstants.SIGN_OUT, result: false});
        }
    }
}
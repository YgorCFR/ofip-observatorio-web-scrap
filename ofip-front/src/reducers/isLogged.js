import { userConstants } from './../constants/userConstants';

const loggedReducer = (state = false, action) => {

    switch(action.type) {
        case userConstants.SIGN_IN:
            return action.result;
        case userConstants.SIGN_OUT:
            return action.result;
        default:
            return state;
    }
};

export default loggedReducer;
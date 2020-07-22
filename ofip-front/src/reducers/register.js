import { registerConstants } from './../constants/registerConstants';

const registerReducer = (state = false, action) => {
    switch(action.type) {
        case registerConstants.REGISTER_REQUEST:
            return {
                registering: true,
                body: action.body
            };
        case registerConstants.REGISTER_SUCCESS:
            return {
                registering: false,
                registered: true,
                body: action.body
            };
        case registerConstants.REGISTER_FAIL:
            return {
                registeredFail: true,
                error: action.error
            }
        default:
            return state;
    }
};

export default registerReducer;
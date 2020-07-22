
import { profileContants } from './../constants/profileConstants';

const profileReducer = (state = [], action) => {
    switch(action.type) {
        case profileContants.PROFILE_SUCCESS:
            return {
                success: true,
                profiles: action.profiles              
            }
        case profileContants.PROFILE_ERROR:
            return state
        default:
            return state
    }
};

export default profileReducer;
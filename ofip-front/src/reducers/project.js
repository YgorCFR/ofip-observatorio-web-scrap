import { projectConstants } from './../constants/projectConstants';

const projectReducer = (state = [], action) => {
    switch(action.type) {
        case projectConstants.PROJECT_SUCCESS:
            return {
                success: true,
                projects: action.payload
            }
        case projectConstants.PROJECT_FAIL:
            return state;
        default:
            return state;
    }
}

export default projectReducer;
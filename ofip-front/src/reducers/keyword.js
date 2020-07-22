
import { keywordConstants } from './../constants/keywordConstants';

const keywordReducer = (state = [], action) => {
    switch(action.type) {
        case keywordConstants.KEYWORD_SUCCESS:
            return {
                success: true,
                keywords: action.payload
            }   
        case keywordConstants.KEYWORD_FAIL:
            return state
        default:
            return state
    }
};

export default keywordReducer
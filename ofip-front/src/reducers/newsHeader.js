import { newsConstants } from './../constants/newsConstants';

export const newsHeaderReducer = (state = [], action) => {
    switch (action.type) {
        case newsConstants.HEADER_REQUEST:
            return {
                loadHeader: true,
                success: false
            }
        case newsConstants.HEADER_SUCCESS:
            return {
                success: true,
                loadHeader: false,
                headers: action.payload
            }
        case newsConstants.HEADER_ERROR:
            return {
                fail: true
            }
        case newsConstants.NEWS_ADD_SUCCESS:
            return {
                success_add: true
            }
        case newsConstants.NEWS_ADD_FAIL:
            return {
                fail_add: true
            }
        case newsConstants.NEWS_CHANGE_SUCCESS:
            return {
                change_success: true
            }
        case newsConstants.NEWS_CHANGE_FAIL:
            return {
                change_fail: true
            }
        case newsConstants.NEWS_DEL_SUCCESS:
            return {
                delete_success: true,
                success: true,
                loadHeader: false,
                headers: action.payload
            }
        case newsConstants.NEWS_DEL_FAIL:
            return {
                delete_fail: true,
                success: true,
                loadHeader: false,
                headers: action.payload
            }
        default: 
            return state
    } 
}



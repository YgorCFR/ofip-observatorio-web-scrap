import { newsConstants } from './../constants/newsConstants';

export const newsDetailReducer = (state = [], action) => {
    switch(action.type) {
        case newsConstants.DETAIL_REQUEST:
            return {
                loadDetail: true,
                success: false
            }
        case newsConstants.DETAIL_SUCCESS:
            return {
                loadDetail: false,
                success: true,
                details: action.payload
            }
        case newsConstants.DETAIL_ERROR:
            return {
                fail: true
            }
        default:
            return state
    }
}
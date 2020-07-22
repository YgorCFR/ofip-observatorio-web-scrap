import { makeQueryString } from './../helpers/requests';
import { keywordService } from './../services/keywordService';
import { keywordConstants } from './../constants/keywordConstants';
import { alertConstants } from './../constants/alertConstants';

export const keywordActions = {
    getKeywords
}


function getKeywords(body) {
    console.log(body);
    return dispatch => {
        let queryString  = makeQueryString(body);
        keywordService.getKeyWords(queryString)
            .then(keywords => {
                let data = keywords.data;
                console.log(data);
                dispatch({type: keywordConstants.KEYWORD_SUCCESS, payload: data});
            })
            .catch(err => {
                console.log(err.response);
                let message = err.response === undefined ? err : err.response.data;
                dispatch({type: keywordConstants.KEYWORD_FAIL});
                dispatch({type: alertConstants.ERROR, message: message});
            })

    }
}
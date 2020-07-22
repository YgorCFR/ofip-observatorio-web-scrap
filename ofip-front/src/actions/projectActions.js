import { userData } from './../helpers/userData';
import { makeQueryString } from './../helpers/requests';
import { projectService } from './../services/projectService';
import { projectConstants } from './../constants/projectConstants';
import { alertConstants } from './../constants/alertConstants';

export const projectActions = {
    getProjects
}

function getProjects(body) {
    return dispatch => {
        body.key = body.key === undefined ? userData.userDataParsed('key') : body.key;
        let queryString = makeQueryString(body);
        projectService.getProjects(queryString)
            .then(project => {
                let data = project.data;
                console.log(data);
                dispatch({type: projectConstants.PROJECT_SUCCESS, payload: data });
            })
            .catch(err => {
                console.log(err.response);
                let message = err.response === undefined ? err : err.response.data;
                dispatch({type: projectConstants.PROJECT_FAIL});
                dispatch({type: alertConstants.ERROR, message: message});
            })
    }
}
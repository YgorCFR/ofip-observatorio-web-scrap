// import { history } from '../helpers/history';
import { profileService } from './../services/profileService';
import { profileContants } from '../constants';
import { alertActions } from './alertActions';

export const profileActions = {
    getAllProfiles
}



function getAllProfiles() {
    return dispatch => {
    profileService.getProfiles()
            .then(profiles => {
                
                dispatch(success(profiles));
                return profiles;
            },
            error => {
                dispatch(failure(error.toString()))
                dispatch(alertActions.error(error.toString()));
            })
    }

    function success(profiles) { return { type: profileContants.PROFILE_SUCCESS, profiles }};
    function failure(error) { return { type: profileContants.PROFILE_ERROR, error } }
}
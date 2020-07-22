import counterReducer from './counter';
import loggedReducer from './isLogged';
import { combineReducers } from 'redux';
import { authenticationReducer } from './authentication';
import { alertReducer } from './alerts';
import registerReducer from './register';
import profileReducer from './profile';
import { newsHeaderReducer } from './newsHeader';
import keywordReducer from './keyword';
import projectReducer from './project';
import vehicleReducer from './vehicle';
import { newsDetailReducer } from './newsDetail';

const allReducers = combineReducers({
    counter: counterReducer,
    isLogged: loggedReducer,
    authentication: authenticationReducer,
    alert: alertReducer,
    register: registerReducer,
    profile: profileReducer,
    newsHeader: newsHeaderReducer,
    keyword: keywordReducer,
    project: projectReducer,
    vehicle: vehicleReducer,
    newsDetail: newsDetailReducer
});


export default allReducers;
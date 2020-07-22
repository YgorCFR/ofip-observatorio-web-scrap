
import { makeQueryString } from './../helpers/requests';
import { vehicleService } from '../services/vehicleService';
import { vehicleConstants } from './../constants/vehicleConstants';
import { alertConstants } from './../constants/alertConstants';
import { userData } from './../helpers/userData';


export const vehicleActions = {
    getVehicles
}


function getVehicles(body) {
    return dispatch => {
        //body.key = userData.userDataParsed('key');
        let queryString = makeQueryString(body);
        vehicleService.getVehicles(queryString)
            .then(vehicles => {
                let data = vehicles.data;
                console.log(data);
                dispatch({type: vehicleConstants.VEHICLE_SUCCESS, payload: data });
            })
            .catch(err => {
                console.log(err.response);
                let message = err.response === undefined ? err : err.response.data;
                dispatch({type: vehicleConstants.VEHICLE_FAIL});
                dispatch({type: alertConstants.ERROR, message: message});
            })
    }
}
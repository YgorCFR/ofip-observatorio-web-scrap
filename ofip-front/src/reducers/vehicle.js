import { vehicleConstants } from './../constants/vehicleConstants';

const vehicleReducer = (state = [], action) => {
    switch(action.type) {
        case vehicleConstants.VEHICLE_SUCCESS:
            return {
                success: true,
                vehicles: action.payload
            }
        case vehicleConstants.VEHICLE_FAIL:
            return state;
        default:
            return state;
    } 
}


export default vehicleReducer
const filterService = require('../services/filter');

const filter = require('../utils/enums/filter');

function getVehicles(req, res) {
    return filterService.getFilterParams(filter.VEHICLE, req)
        .then(vehicles => {
            res.send({
                success: true,
                data: vehicles
            })
        })
        .catch(err=> {
            res.status(400).send({
                success: false,
                message: err
            })   
        })
}


module.exports = {
    getVehicles
}
const model = require('../models/index');

const Profile = model.Profile;


const getProfiles = () => Profile.findAll();


module.exports = {
    getProfiles
}
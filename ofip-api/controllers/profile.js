const profileService = require('../services/profile');

const getProfiles = (req, res) => {
    return profileService.getProfiles()
        .then(
            profiles => {
                res.send({
                    success: true,
                    profiles: profiles
                })
        })
        .catch(err =>
            res.status(400).send({
                success: false
            })
        )
}

module.exports = {
    getProfiles
}
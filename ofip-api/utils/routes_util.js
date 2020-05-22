const fs = require('fs');
const path = require('path');

let getServerRoutes = () => {
    let routes = fs.readFileSync(path.join(__dirname, 'routes.json'), (err, data) => {
        if (err) throw err;
        return data;
    });

    return JSON.parse(routes);
};

let updateServerRoutes = (obj, value) => {
    let data = getServerRoutes();
    Object.keys().forEach((key, index) => {
        console.log(data);
    });
};


module.exports = {
    getServerRoutes,
    updateServerRoutes
};



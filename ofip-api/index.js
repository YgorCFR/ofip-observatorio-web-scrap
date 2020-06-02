const express = require('express');
const https = require('https');
const fs = require('fs');
const helmet = require('helmet');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const config = require('./config/config');
const router = require('./router');
const cookieParser = require('cookie-parser');
require('dotenv').config();
app.set('view engine', 'pug');
app.use(cookieParser());
app.use(cors());
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended : true
}));

const directoryToServe = 'client';

app.use('/' ,express.static(path.join(__dirname, '..', directoryToServe)));
router.set(app);

const httpsOptions = {
    cert: fs.readFileSync(path.join(__dirname, 'ssl', 'server.crt')),
    key: fs.readFileSync(path.join(__dirname, 'ssl', 'server.key'))
};

app.use('/assets', express.static('assets'))

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });


https.createServer(httpsOptions, app) 
    .listen(config.port, function() {
        console.log(`Serving the ${directoryToServe}/ directory at https://localhost:${config.port}`);
    });
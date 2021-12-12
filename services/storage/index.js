const config = require('../../pkg/config');
const express = require('express');
const fileUpload = require('express-fileupload');
const jwt = require('express-jwt');
const handlers = require('./handlers/storage');

const api = express();

api.use(jwt({
    algorithms: config.get('security').algorithms,
    secret: config.get('security').secret
}));

api.use(fileUpload());

api.post('/api/v1/upload', handlers.upload);

api.listen(10002, err => {
    if(err) {
        return console.log(err);
    }
    console.log(`Server successfuly started on port 10002`);
});
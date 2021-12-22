const config = require('../../pkg/config');
const express = require('express');
const fileUpload = require('express-fileupload');
const jwt = require('express-jwt');
const handlers = require('./handlers/storage');
const cors = require('cors');
const path = require('path');

const api = express();

api.use(jwt({
    algorithms: config.get('security').algorithms,
    secret: config.get('security').secret
}));

api.use('/api/v1/storage', express.static(path.join(__dirname, "/../../files")));
api.use(cors());
api.use(fileUpload());

api.post('/api/v1/storage/upload', handlers.upload);

api.listen(10002, err => {
    if (err) {
        return console.log(err);
    }
    console.log(`Server successfuly started on port 10002`);
});
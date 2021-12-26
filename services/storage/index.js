const config = require('../../pkg/config');
const express = require('express');
const fileUpload = require('express-fileupload');
const jwt = require('express-jwt');
const handlers = require('./handlers/storage');
const path = require('path');

const api = express();
api.use(jwt({
    algorithms: config.get('security').algorithms,
    secret: config.get('security').secret,
}).unless({
    path: [
        { url: /\/api\/v1\/storage\/users\/.*/, methods: ['GET'] },
        { url: /\/api\/v1\/storage\/recipes\/.*/, methods: ['GET']}
    ]
}));
api.use(fileUpload());

api.post('/api/v1/storage/users', handlers.uploadUserImage);
api.get('/api/v1/storage/users/:filename', handlers.getUserImage);
api.post('/api/v1/storage/recipes', handlers.uploadRecipeImage);
api.get('/api/v1/storage/recipes/:filename', handlers.getRecipeImage);


api.listen(10002, err => {
    if (err) {
        return console.log(err);
    }
    console.log(`Server successfuly started on port 10002`);
});
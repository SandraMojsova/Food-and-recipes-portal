require('../../pkg/db');
const express = require('express');
const jwt = require('express-jwt');
const config = require('../../pkg/config');
const handlers= require('./handlers/recipes');

const api = express();

api.use(express.json());
api.use(jwt({
    secret: config.get('security').secret,
    algorithms: config.get('security').algorithms
}))

api.post('/api/v1/recipes', handlers.create);
api.get('/api/v1/recipes/me', handlers.getRecipesByUser);

api.listen(10003, err => {
    if (err) {
        return console.log('Could not start server', err);
    }
    console.log('Server successfully started on port 10003');
});
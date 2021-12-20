require('../../pkg/db');
const express = require('express');
const jwt = require('express-jwt');
const handlers = require('./handlers/auth');
const cors = require('cors');
const config = require('../../pkg/config');

const api = express();

api.use(express.json());
api.use(cors());
api.use(jwt({
    secret: config.get('security').secret,
    algorithms: config.get('security').algorithms
}).unless({
    path: [
        '/api/v1/auth/login',
        '/api/v1/auth/create-account'
    ]
}));
api.post('/api/v1/auth/create-account', handlers.createAccount);
api.post('/api/v1/auth/login', handlers.login);
api.get('/api/v1/auth/users', handlers.getAll);
api.patch('/api/v1/auth/users/:id', handlers.updateProfile);
api.get('/api/v1/auth/logout', handlers.logOut);



api.listen(config.get('services').auth.port, err => {
    if (err) {
        return console.log('Could not start server', err);
    }
    console.log(`Server successfully started on port ${config.get('services').auth.port}`);
});
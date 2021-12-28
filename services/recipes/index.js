require('../../pkg/db');
const express = require('express');
const jwt = require('express-jwt');
const cfg = require('../../pkg/config');
const handlers = require('./handlers/recipes');

const api = express();

api.use(express.json());
api.use(jwt({
    secret: cfg.get('security').secret,
    algorithms: cfg.get('security').algorithms
}));

api.post('/api/v1/recipes', handlers.createRecipe);
api.get('/api/v1/recipes/me', handlers.getRecipesByUser);
api.delete('/api/v1/recipes/:id', handlers.deleteRecipe);
api.patch('/api/v1/recipes/:id', handlers.updateRecipe);
api.get('/api/v1/recipes/:id', handlers.getRecipeById);

api.listen(cfg.get('services').recipes.port, err => {
    if (err) {
        return console.log('Could not start server', err);
    }
    console.log(`Server successfully started on port ${cfg.get('services').recipes.port}`);
});
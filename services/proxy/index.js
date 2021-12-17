const proxy = require('express-http-proxy');
const express = require('express');
const path = require('path');

const app = express();

app.use('/api/v1/auth', proxy(
    'http://localhost:10001',
    { proxyReqPathResolver: (req) => `http://localhost:10001/api/v1/auth${req.url}` }
));

app.use('/', proxy(
    'http://localhost:3000',
    { proxyReqPathResolver: (req) => `http://localhost:3000${req.url}` }
));

app.use('/', express.static(path.join(__dirname, '/../../public/build')));

app.listen(7000, err => {
    if (err) {
        return console.error(err);
    }
    console.log(`Server started on port 7000`);
});

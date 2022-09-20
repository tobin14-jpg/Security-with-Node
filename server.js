const fs = require('fs');
const path = require('path');
const https = require('https');
const express = require('express');
const helmet = require('helmet');

const PORT = 3000;
const app = express();

// add security at the top of the middleware
app.use(helmet());

// Check if the user is logged in
function checkLoggedin(req, res, next)  {
    const isLoggedIn = true;
    if(!isLoggedIn) {
        return res.status(401).json({

        })
    }
    next();
}

app.get('/auth/google', (req, res) => {});

app.get('/auth/google/callback', (req, res) => {});

app.get('/auth/logout', (req, res) => {});

// get secret data + protect endpoint by restricting access to only logged in users using Google's OAUTH
app.get('/secret', checkLoggedin, (req, res) => {
    return res.send('Your secret value is 14!');
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  });

// passing in option/ creating server object with SSL certificate
https.createServer({
    key: fs.readFileSync('key.pem'),
    cert: fs.readFileSync('cert.pem')
}, app).listen(PORT, () => {
    console.log('Express server listening on port ' + PORT);
});
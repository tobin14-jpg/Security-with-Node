const fs = require('fs');
const path = require('path');
const https = require('https');
const express = require('express');

const PORT = 3000;
const app = express();

// get secret data
app.get('/secret', (req, res) => {
    return res.send('Your secret value is 14!');
})

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
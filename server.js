const now = require('moment')();

const http = require('http');
const express = require('express');
const app = express();

app.get('/', (req, res) => {
    console.log(`${now.format('MMMM Do YYYY, h:mm:ss A')}: Your bot has been pinged by UptimeRobot.`);
    res.sendStatus(200);
}); 

app.listen(3000);

setInterval(function() {
    http.get(null); // Repl.it project has not been developed yet, replacing when bot is deployed to Repl.it
}, 1.8e+6);
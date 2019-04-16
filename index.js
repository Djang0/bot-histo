var request = require('request');
const express = require('express')

const path = require('path')
var bodyParser = require('body-parser');
var moment = require('moment');

//https://lreenaers.ddns.net:8443/UZeLvHozfhwsL53eoAjetEYv
var welcome = function(req, res) {

}

var app = express()
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({
    extended: true
  }))
  .use(express.static(path.join(__dirname, 'public')))
  .get('/', async (req, res) {
    request("https://lreenaers.ddns.net:8443/UZeLvHozfhwsL53eoAjetEYv", function(error, response, body) {
      if (!error && response.statusCode == 200) {
        data = JSON.parse(body) // Print the google web page.
        res.render('pages/db', data);
      }
    });

  });

https.createServer(credentials, app).listen(PORT, () => console.log(`Listening on ${ PORT }`));

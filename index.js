var request = require('request');
const express = require('express')

const path = require('path')
var bodyParser = require('body-parser');
var moment = require('moment');
const PORT = process.env.PORT || 5000
//https://lreenaers.ddns.net:8443/UZeLvHozfhwsL53eoAjetEYv
var welcome = function(req, res) {
  res.json({});
}

var app = express()
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({
    extended: true
  }))
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', welcome)
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));

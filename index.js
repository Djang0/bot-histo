var request = require('request');
const express = require('express')
var moment = require('moment');
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
  .get('/', async (req, res) => {
    request('https://lreenaers.ddns.net:8443/UZeLvHozfhwsL53eoAjetEYv', function(error, response, body) {
      var data = JSON.parse(body);

      // for (var key in data) {
      //   if (data.hasOwnProperty(key)) {
      //     var val = data[key];
      //     per_command.ls.push({category: key, value: val.length});
      //   }
      // }


      res.render('pages/db', {data:data, moment : moment});
    });

  })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));

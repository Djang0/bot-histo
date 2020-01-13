var request = require('request');
const express = require('express')
var moment = require('moment');
const path = require('path')
var bodyParser = require('body-parser');

const PORT = process.env.PORT || 5000
//https://mister.mr-airspaces.cloud:8443/UZeLvHozfhwsL53eoAjetEYv
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
    request('https://mister.mr-airspaces.cloud:8443/UZeLvHozfhwsL53eoAjetEYv', function(error, response, body) {
      var data = JSON.parse(body);
      res.render('pages/db', {data:data, moment : moment});
    })})
    .get('/user/:id', async (req, res) => {
      var param_usr_id = req.params.id;
      request('https://mister.mr-airspaces.cloud:8443/UZeLvHozfhwsL53eoAjetEYv', function(error, response, body) {
        var data = JSON.parse(body);

        // for (var key in data) {
        //   if (data.hasOwnProperty(key)) {
        //     var val = data[key];
        //     per_command.ls.push({category: key, value: val.length});
        //   }
        // }


        res.render('pages/usr', {data:data, moment : moment, usr_id:param_usr_id});
      });

  })
  .get('/file/:filename/:ebfs/:type', async (req, res) => {
    var filename = req.params.filename;//ie: OA.19.08.08.txt
    var ebfs = req.params.ebfs;//ie 1008
    var type = req.params.type;//Flight_Level | Meter_Level
    var formData = {
      download_direct_oa_level_type: type,
      download_direct_oa_pressure: ebfs,
      download_direct_oa_file_real_name: filename,

    };
    request.post('http://mids.be/notam/bpc/download_direct_oa.php', {form: formData}).pipe(res);
  })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));

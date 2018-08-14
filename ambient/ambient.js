// Any copyright is dedicated to the Public Domain.
// http://creativecommons.org/publicdomain/zero/1.0/

/*********************************************
This ambient module example console.logs
ambient light and sound levels and whenever a
specified light or sound level trigger is met.
*********************************************/

var tessel = require('tessel');
var ambientlib = require('ambient-attx4');
var ambient = ambientlib.use(tessel.port.A);
var http = require('http')
var port = 8000
var os = require('os')
var camera = require('./camera/camera')

ambient.on('ready', function () {
  // Get points of light and sound data.
  // Create server
  http.createServer((request, response) => {
    response.writeHead(200, { 'Content-Type': 'image/jpg' });

    //Listen for sound events
    setInterval(function () {
      ambient.getSoundBuffer(function (err, sounddata) {
        if (err) {
          console.log(err)
        }
        let average = sounddata.reduce(function (a, b) {
          return a + b
        }) / 10

        console.log(average)
        if (average > 0.35) {
          //take a picture
          camera(response)
          console.log('Picture captured------------')
        }

        //console.log('Sound Level:', sounddata.toFixed(4));
      });
    }, 500); // The readings will happen every .5 seconds
  }).listen(port, () => console.log(`http://${os.hostname()}.local:${port}`));
})


ambient.on('error', function (err) {
  console.log(err);
});

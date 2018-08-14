// Any copyright is dedicated to the Public Domain.
// http://creativecommons.org/publicdomain/zero/1.0/

/*********************************************
Create a server that responds to every request by taking a picture and piping it directly to the browser.
*********************************************/

var av = require('tessel-av');
var camera = new av.Camera();

module.exports = function (response) {
         camera.capture().pipe(response);
}

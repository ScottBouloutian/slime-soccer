// This script is run by PhantomJS and does not support ES6, probably not worth transpiling
var page = require('webpage').create();
var system = require('system');
var framerate = 30;

page.onConsoleMessage = function (msg) {
    console.log(msg);
};

page.onError = function (msg) {
    console.log(msg);
};

page.open('http://localhost:3000', function (status) {
    if (status !== 'success') {
        console.log('Unable to access file');
    } else {
        console.log('Started the physics engine');
    }
});

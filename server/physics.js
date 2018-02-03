var page = require('webpage').create();
console.log('The default user agent is ' + page.settings.userAgent);
page.settings.userAgent = 'SpecialAgent';
page.onConsoleMessage = function (msg) {
  console.log(msg);
};
page.open('file:///home/scott/Documents/slime-soccer/client/public/index.html', function(status) {
  if (status !== 'success') {
    console.log('Unable to access network');
  } else {
      setInterval(function () {
          const physics = page.evaluate(function () {
              return window.getPhysicsState ? window.getPhysicsState() : null;
          });
          console.log(physics);
      }, 1000);
  }
});

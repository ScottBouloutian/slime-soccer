var page = require('webpage').create();
console.log('The default user agent is ' + page.settings.userAgent);
page.settings.userAgent = 'SpecialAgent';
page.open('file:///home/scott/Documents/slime-soccer/client/public/index.html', function(status) {
  if (status !== 'success') {
    console.log('Unable to access network');
  } else {
      setInterval(function () {
          console.log('pixi wtf where r u');
          const pixi = page.evaluate(function () {
              return window.PIXI;
          });
      }, 1000);
  }
});

var phantomjs = require('phantomjs-prebuilt')
var program = phantomjs.exec('physics.js')
program.stdout.pipe(process.stdout)
program.stderr.pipe(process.stderr)
program.on('exit', code => {
    console.log('done');
});

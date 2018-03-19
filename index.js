const { spawn } = require('cross-spawn');
const _ = require('lodash');

// Start the client and the server together
_.map(['client', 'server'], dir => (
    spawn('yarn', ['start'], {
        cwd: `src/${dir}`,
        stdio: 'inherit',
    })
));

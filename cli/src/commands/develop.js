const path = require('path');

require('child_process').fork(path.join(__dirname, '..', 'lifecycles', 'serve.js'));
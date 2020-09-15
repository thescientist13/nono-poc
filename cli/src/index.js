const path = require('path');

const command = process.argv[2] || 'build';
const commands = [
  'build',
  'develop'
];

console.log(`running command... ${command}`);

// TODO establish develop vs build modes
process.env.__GWD__ = command; // eslint-disable-line no-underscore-dangle

require('child_process').fork(path.join(__dirname, 'lifecycles', 'graph.js'));

switch (command) {

  case 'build':
    require('child_process').fork(path.join(__dirname, 'commands', 'build.js'));
    break;
  case 'develop':
    require('child_process').fork(path.join(__dirname, 'commands', 'develop.js'));
    break;
  default:
    console.log(`command ${command} unrecognized.  please use one of: ${commands.join(', ')}`);
    process.exit(1); // eslint-disable-line no-process-exit

}
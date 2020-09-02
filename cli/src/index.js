const path = require('path');

const command = process.argv[2] || 'build';
const commands = [
  'build',
  'develop'
];

console.log(`running command... ${command}`);

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
const shell = require('shelljs');
const jsonfile = require('jsonfile');
const file = 'buildInfo.json';

const data = jsonfile.readFileSync(file);
data.jsBuildVersion = data.jsBuildVersion + 1;

jsonfile.writeFileSync(file, data, { spaces: 2, EOL: '\r\n' });
shell.exec('./build.sh');
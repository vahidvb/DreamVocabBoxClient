const fs = require('fs');
const { version } = require('./package.json');

fs.writeFileSync('./public/version.json', JSON.stringify({ version }, null, 2));
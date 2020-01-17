const process = require('process');
const fs = require('fs');


function create() {
  const name = process.argv[process.argv.length - 1].split('--')[1];
  if (name) {
    fs.writeFileSync(`src/templates/components/${name}.pug`, '');
    fs.writeFileSync(`src/style/components/${name}.scss`, '');
    fs.writeFileSync(`src/js/modules/${name}.js`, '');
  }
  return Promise.resolve('Done!');
}

module.exports = create;

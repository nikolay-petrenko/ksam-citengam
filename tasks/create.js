const process = require('process');
const fs = require('fs');
const { paths } = require('path');

function create() {
  const name = process.argv[process.argv.length - 1].split('--')[1];
  if (name) {
    fs.writeFileSync(`${paths.src.templates}/components/${name}.pug`, '');
    fs.writeFileSync(`${paths.src.templates}/components/${name}.scss`, '');
    fs.writeFileSync(`${paths.src.templates}/modules/${name}.js`, '');
  }
  return Promise.resolve('Done!');
}

module.exports = create;

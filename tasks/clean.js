const del = require('del');

function clean() {
  del.sync('build/*');
  return Promise.resolve('Done!');
}

module.exports = clean;

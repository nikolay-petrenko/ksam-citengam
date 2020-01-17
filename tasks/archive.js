const zip = require('zip-local');

function archive() {
  zip.sync.zip('build/').compress().save('build/archive.zip');
  return Promise.resolve("Done!");
}

module.exports = archive;

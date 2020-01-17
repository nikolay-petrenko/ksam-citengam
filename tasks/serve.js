const { paths } = require('./settings');
const browserSync = require('browser-sync');
const { watch } = require('gulp');

const markup = require('./markup');
const style = require('./style');
const script = require('./script');
const image = require('./image');
const font = require('./font');

function serve() {
  browserSync({
    server: {
      baseDir: paths.build.main
    },
    open: false,
    notify: false,
    tunnel: false,
    port: 8000,
    host: 'localhost'
  });

  watch(paths.watch.pug, markup);
  watch(paths.watch.style, style);
  watch(paths.watch.scripts, script);
  watch(paths.watch.img, image);
  watch(paths.watch.fonts, font);
}

module.exports = serve;

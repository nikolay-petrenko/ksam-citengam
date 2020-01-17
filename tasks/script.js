const rollup = require('rollup');
const { paths, dev } = require('./settings');
const commonjs = require('@rollup/plugin-commonjs');
const resolve = require('@rollup/plugin-node-resolve');
const babel = require('rollup-plugin-babel');
const { src, dest } = require('gulp');
const browserSync = require('browser-sync');

async function script() {
  const bundle = await rollup.rollup({
    input: 'src/js/main.js',
    plugins: [commonjs(), resolve(), babel()]
  });

  await bundle.write({
    file: 'build/js/main.js',
    format: 'iife',
    sourcemap: dev()
  });

  return src(paths.src.scripts)
    .pipe(dest(paths.build.scripts))
    .pipe(browserSync.reload({ stream: true }));
}

module.exports = script;

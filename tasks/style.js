const { src, dest } = require('gulp');
const { paths, dev } = require('./settings');
const plumber = require('gulp-plumber');
const condition = require('gulp-if');
const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const csso = require('gulp-csso');
const rename = require('gulp-rename');
const browserSync = require('browser-sync');

const renameSettings = {
  basename: 'style',
  suffix: '.min'
};

function style() {
  return src(`${paths.src.styles}/main.scss`)
    .pipe(plumber())
    .pipe(condition(dev(), sourcemaps.init()))
    .pipe(sass())
    .pipe(autoprefixer({
      cascade: false
    }))
    .pipe(csso())
    .pipe(condition(dev(), sourcemaps.write()))
    .pipe(rename(renameSettings))
    .pipe(dest(paths.build.styles))
    .pipe(browserSync.reload({ stream: true }));
}

module.exports = style;

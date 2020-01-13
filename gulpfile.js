const gulp = require('gulp');
const browserSync = require('browser-sync');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const csso = require('gulp-csso');
const include = require('gulp-include');
const del = require('del');
const runSequence = require('run-sequence');
const fs = require('fs');
const wait = require('gulp-wait');
const svgmin = require('gulp-svgmin');
const zipper = require("zip-local");

const rollup = require('rollup');
const commonjs = require('@rollup/plugin-commonjs');
const resolve = require('@rollup/plugin-node-resolve');
const babel = require('rollup-plugin-babel');

let path = {
  src: {
    html: 'src/*.html',
    style: 'src/style/main.scss',
    // scripts: 'src/js/**/*.js',
    scripts: 'src/js/libs/*.js',
    img: 'src/img/*.+(jpg|jpeg|png|svg|ico|gif)',
    svg: 'src/img/**/*.svg',
    fonts: 'src/fonts/**/*',
    localization: "src/localization/*.json"
  },
  build: {
    html: 'build',
    style: 'build/css',
    scripts: 'build/js',
    img: 'build/img',
    fonts: 'build/fonts',
    localization: "build/localization"
  },
  watch: {
    htmlApp: 'src/*.html',
    html: 'src/components/**/*.html',
    style: 'src/**/*.+(sass|scss)',
    scripts: 'src/**/*.js',
    img: 'src/img/*.+(jpg|jpeg|png|svg|ico|gif)',
    svg: 'src/img/**/*.svg',
    fonts: 'src/fonts/**/*'
  }
};

gulp.task('browser-sync', function () {
  browserSync({
    server: {
      baseDir: 'build'
    },
    notify: false,
    tunnel: false,
    port: 8000,
    host: "localhost"
  });
});

gulp.task('html', function () {
  return gulp.src(path.src.html)
    .pipe(include())
    .pipe(gulp.dest(path.build.html))
    .pipe(browserSync.reload({ stream: true }));
});

gulp.task('style', function (done) {
  gulp.src(path.src.style)
    .pipe(sourcemaps.init())
    .pipe(wait(100))
    .pipe(sass().on('error', function (error) {
      done(error);
    }))
    .pipe(concat('main.css'))
    .pipe(autoprefixer({
      cascade: false
    }))
    .pipe(csso({
      // forceMediaMerge: true
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(path.build.style))
    .on('end', function () {
      done();
    })
    .pipe(browserSync.reload({ stream: true }));
});

// gulp.task('scripts', function() {
// 	return gulp.src(path.src.scripts)
// 		.pipe(sourcemaps.init())
// 		.pipe(include())
// 		.pipe(sourcemaps.write())
// 		.pipe(gulp.dest(path.build.scripts))
// 		.pipe(browserSync.reload({stream: true}));
// });

gulp.task('scripts', async function () {
  const bundle = await rollup.rollup({
    input: 'src/js/main.js',
    plugins: [commonjs(), resolve(), babel()]
  });

  await bundle.write({
    file: 'build/js/main.js',
    format: 'iife',
    sourcemap: true
  });

  return gulp.src(path.src.scripts)
    .pipe(gulp.dest(path.build.scripts))
    .pipe(browserSync.reload({ stream: true }));
});

gulp.task('img', function () {
  return gulp.src(path.src.img)
    .pipe(gulp.dest(path.build.img))
    .pipe(browserSync.reload({ stream: true }));
});

gulp.task('svg', function () {
  return gulp.src(path.src.svg)
    .pipe(svgmin({
      plugins: [{
        removeViewBox: false
      }]
    }))
    .pipe(gulp.dest(path.build.img))
    .pipe(browserSync.reload({ stream: true }));
});

gulp.task('fonts', function () {
  return gulp.src(path.src.fonts)
    .pipe(gulp.dest(path.build.fonts))
    .pipe(browserSync.reload({ stream: true }));
});

gulp.task('localization', function () {
  return gulp.src(path.src.localization)
    .pipe(include())
    .pipe(gulp.dest(path.build.localization))
});

gulp.task('deploy:style', function () {
  return gulp.src(path.src.style)
    .pipe(sass())
    .pipe(concat('main.css'))
    .pipe(autoprefixer({
      cascade: false
    }))
    .pipe(csso({
      // forceMediaMerge: true
    }))
    .pipe(gulp.dest(path.build.style))
});

// gulp.task('deploy:scripts', function() {
// 	return gulp.src(path.src.scripts)
// 		.pipe(include())
// 		.pipe(gulp.dest(path.build.scripts))
// 		.pipe(browserSync.reload({stream: true}));
// });

gulp.task('deploy:scripts', async function () {
  const bundle = await rollup.rollup({
    input: 'src/js/main.js',
    plugins: [commonjs(), resolve(), babel()]
  });

  await bundle.write({
    file: 'build/js/main.js',
    format: 'iife',
    sourcemap: false
  });

  return gulp.src(path.src.scripts)
    .pipe(gulp.dest(path.build.scripts))
    .pipe(browserSync.reload({ stream: true }));
});

gulp.task('clean', function () {
  return del.sync('build/*')
});

const name = process.argv[process.argv.length - 1].split('--')[1];
const level = process.argv[process.argv.length - 1].split('--')[2];

gulp.task('folder', function () {
  return gulp.src('*.*', { read: false })
    .pipe(gulp.dest('src/components/' + name))
});

gulp.task('files', function () {
  if (!level) {
    fs.writeFileSync(`src/templates/${name}.html`, '')
    fs.writeFileSync(`src/style/components/${name}.scss`, '')
  } else if (level == 1) {
    fs.writeFileSync(`src/templates/${name}.html`, '')
    fs.writeFileSync(`src/style/components/${name}.sass`, '')
  } else if (level == 2) {
    fs.writeFileSync(`src/templates/${name}.html`, '')
    fs.writeFileSync(`src/style/components/${name}.scss`, '')
    fs.writeFileSync(`src/js/modules/${name}.js`, '')
  } else if (level == 3) {
    fs.writeFileSync(`src/templates/${name}.html`, '')
    fs.writeFileSync(`src/style/components/${name}.sass`, '')
    fs.writeFileSync(`src/js/modules/${name}.js`, '')
  }
});

gulp.task('make', function () {
  runSequence('folder', 'files');
});

gulp.task('archive', function () {
  zipper.sync.zip("build/").compress().save("build/archive.zip");
});

gulp.task('watch', ['clean', 'browser-sync', 'html', 'style', 'scripts', 'img', 'fonts'], function () {
  gulp.watch([path.watch.htmlApp, path.watch.html], ['html']);
  gulp.watch([path.watch.style], ['style']);
  gulp.watch([path.watch.img], ['img']);
  gulp.watch([path.watch.scripts], ['scripts']);
  gulp.watch([path.watch.fonts], ['fonts']);
});

gulp.task('build', ['clean', 'html', 'deploy:style', 'deploy:scripts', 'img', 'fonts', 'localization']);

gulp.task('deploy', function () {
  runSequence('build', 'archive');
});

gulp.task('default', ['watch']);

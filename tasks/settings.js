const process = require('process');

// const

const paths = {
  src: {
    pug: 'src/templates/*.pug',
    style: 'src/styles/main.scss',
    scripts: 'src/js/libs/*.js',
    img: 'src/img/*.+(jpg|jpeg|png|svg|ico|gif)',
    svg: 'src/img/**/*.svg',
    fonts: 'src/fonts/**/*',
    localization: "src/localization/*.json"
  },
  build: {
    main: 'build',
    html: 'build',
    style: 'build/css',
    scripts: 'build/js',
    img: 'build/img',
    fonts: 'build/fonts',
    localization: "build/localization"
  },
  watch: {
    pug: 'src/templates/**/*.pug',
    style: 'src/**/*.+(sass|scss)',
    scripts: 'src/**/*.js',
    img: 'src/img/*.+(jpg|jpeg|png|svg|ico|gif)',
    svg: 'src/img/**/*.svg',
    fonts: 'src/fonts/**/*'
  }
}

const isDevelopmentMode = () => {
  return process.env.NODE_ENV === 'development';
}

const isProductionMode = () => {
  return process.env.NODE_ENV === 'production';
}

module.exports = {
  paths,
  dev: isDevelopmentMode,
  prod: isProductionMode
};

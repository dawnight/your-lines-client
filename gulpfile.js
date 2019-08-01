const gulp = require('gulp');
const rename = require('gulp-rename');
const cache = require('gulp-cache');
const imageMin = require('gulp-imagemin');
const sass = require('gulp-sass');
const minifyCSS = require('gulp-minify-css');
const autoPrefixer = require('gulp-autoprefixer');
const uglify = require('gulp-uglify');
const del = require('del');

sass.compiler = require('node-sass');

const PATH = {
  image: {
    src: './public/image/**/*',
    dist:'./dist/img'
  },
  style: {
    root: './public/style/index.scss',
    src: './public/style/**/*.scss',
    dist: './dist/css'
  },
  javascript: {
    src: './public/javascript/**/*.js',
    dist: './dist/javascript'
  },
  vendor: {
    src: './public/vendor/**/*',
    dist: './dist/lib'
  },
  font: {
    src: './public/font/**/*',
    dist: './dist/font'
  }
};

function image () {
  return gulp.src(PATH.image.src)
    .pipe(cache(imageMin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    .pipe(gulp.dest(PATH.image.dist));
}

function font () {
  return gulp.src(PATH.font.src).pipe(gulp.dest(PATH.font.dist));
}

function style () {
  return gulp.src(PATH.style.src)
    .pipe(sass.sync())
    .pipe(autoPrefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(minifyCSS())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(PATH.style.dist));
}

function javascript () {
  return gulp.src(PATH.javascript.src)
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(PATH.javascript.dist));
}

function vendor () {
  return gulp.src(PATH.vendor.src).pipe(gulp.dest(PATH.vendor.dist));
}

function watch(done) {
  gulp.watch(PATH.image.src, image);
  gulp.watch(PATH.style.src, style);
  gulp.watch(PATH.javascript.src, javascript);
  gulp.watch(PATH.vendor.src, vendor);
  gulp.watch(PATH.font.src, font);
  done();
}

function clean() {
  return del(['dist']);
}

const build = gulp.series(clean, gulp.parallel(image, font, style, javascript, vendor));

exports.default = gulp.series(build, watch);

'use strict';

const { series, src, dest, watch } = require('gulp');
const uglifycss = require('gulp-uglifycss');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const sass = require('gulp-sass');

sass.compiler = require('node-sass');

function scssTask () {
  return src('./src/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(uglifycss({"uglyComments": true}))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(dest('./assets/'));
}

function javascriptTask () {
  return src('./src/es6/main.js')
    .pipe(uglify())
    .pipe(rename({ extname: '.min.js' }))
    .pipe(dest('./assets/'));
}

function staticTask () {
  return src('./src/static/**')
    .pipe(dest('./assets/static/'));
}

watch(['./src/sass/**/*.scss', './src/es6/**/*.js', './src/static/*'], series(scssTask, javascriptTask, ));

exports.default = series(scssTask, javascriptTask, staticTask);

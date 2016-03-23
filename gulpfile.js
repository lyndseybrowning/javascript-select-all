'use strict';

const gulp = require('gulp');
const webserver = require('gulp-webserver');
const esLint = require('gulp-eslint');
const babel = require('gulp-babel');

const paths = {
  build: 'dist/',
  js: 'src/**/*.js'
};

gulp.task('webserver', () => {
  gulp.src('dist')
    .pipe(webserver({
      livereload: true,
      directoryListing: true,
      open: true
    }));
});

gulp.task('script', () => {
  return gulp
    .src(paths.js)
    .pipe(esLint())
    .pipe(esLint.format())
    .pipe(babel())
    .pipe(gulp.dest(paths.build))
});

gulp.task('default', ['script', 'webserver'], () => {
  gulp.watch(paths.js, ['script']);
});

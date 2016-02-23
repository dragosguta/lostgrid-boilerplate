'use strict';

var gulp = require('gulp'),
stylus = require('gulp-stylus'),
postcss = require('gulp-postcss'),
sourcemaps = require('gulp-sourcemaps'),
autoprefixer = require('gulp-autoprefixer'),
lost = require('lost');

var paths = {
  cssSource: 'src/css/',
  cssDestination: 'dist/css/',
  jsSource: 'src/js/',
  jsDestination: 'dist/js/'
};

gulp.task('styles', function() {
  return gulp.src(paths.cssSource + '**/*.styl')
    .pipe(sourcemaps.init())
    .pipe(stylus())
    .pipe(postcss([
      lost()
      ]))
    .pipe(autoprefixer())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(paths.cssDestination));
});

gulp.task('vendorCSS', function() {
  return gulp.src(paths.cssSource + 'vendor/**/*.css')
    .pipe(sourcemaps.init())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(paths.cssDestination + './vendor'));
});

gulp.task('vendorJS', function() {
  return gulp.src(paths.jsSource + 'vendor/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(paths.jsDestination + './vendor'));
});

gulp.task('scripts', function() {
  return gulp.src(paths.jsSource + '**/*.js')
    .pipe(sourcemaps.init())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(paths.jsDestination));
});

gulp.watch('src/**/*.*', ['styles', 'scripts']);

gulp.task('default', ['styles', 'scripts', 'vendorCSS', 'vendorJS']);

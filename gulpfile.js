var gulp = require('gulp');
var jade = require('gulp-jade');
var stylus = require('gulp-stylus');
var connect = require('gulp-connect');
var concatCss = require('gulp-concat-css');
var bower = require('gulp-bower');
var open = require('gulp-open');
var historyApiFallback = require('connect-history-api-fallback');

gulp.task('connect', ['styles', 'scripts', 'views', 'bower'], function() {
  connect.server({
    root: 'dist',
    port: 8888,
    livereload: true,
    middleware: function(connect, opt) {
      return [ historyApiFallback ];
    }
  });
  var options = {
    url: 'http://localhost:8888',
    app: 'google chrome'
  };
  gulp.src('./dist/index.html')
    .pipe(open('', options));
});

gulp.task('views', function() {
  gulp
    .src('./client/**/*.jade')
    .pipe(jade())
    .pipe(gulp.dest('./dist/'))
    .pipe(connect.reload());
});

gulp.task('scripts', function() {
  gulp
    .src('./client/**/*.js')
    .pipe(gulp.dest('./dist/'))
    .pipe(connect.reload());
});

gulp.task('styles', function() {
  gulp
    .src('./client/**/*.styl')
    .pipe(stylus())
    .pipe(concatCss('main.css'))
    .pipe(gulp.dest('./dist/'))
    .pipe(connect.reload());
});

gulp.task('bower', function() {
  return bower();
});

gulp.task('default', ['connect'], function() {
  gulp.watch('./client/**/*.styl', ['styles']);
  gulp.watch('./client/**/*.js', ['scripts']);
  gulp.watch('./client/**/*.jade', ['views']);
});

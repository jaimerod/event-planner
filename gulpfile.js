// Update: Hey Folks - I've got a full Gulpfile with everything else over at https://github.com/wesbos/React-For-Beginners-Starter-Files

var browserify = require('browserify');
var gulp = require('gulp');
var livereload = require('gulp-livereload');
var notify = require('gulp-notify');
var reactify = require('reactify');
var sass = require('gulp-ruby-sass');
var source = require('vinyl-source-stream');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var watchify = require('watchify');
var buffer = require('vinyl-buffer');

// Source Folders
var imageFolder = 'images';
var jsFolder = 'js';
var mainSassFile = 'main.scss';
var sassFolder = 'scss';

// Build Folders
var buildCssFolder = 'build/css';
var buildImageFolder = 'build/img';
var buildJsFolder = 'build/js';

function handleErrors() {
  var args = Array.prototype.slice.call(arguments);
  notify.onError({
    title: 'Compile Error',
    message: '<%= error.message %>'
  }).apply(this, args);
  this.emit('end'); // Keep gulp from hanging on this task
}

function buildScript(file, watch) {
  var props = {
    entries: ['./' + jsFolder + '/' + file],
    debug : true,
    transform:  [reactify]
  };

  // watchify() if watch requested, otherwise run browserify() once
  var bundler = watch ? watchify(browserify(props)) : browserify(props);

  function rebundle() {
    var stream = bundler.bundle();
    return stream
      .on('error', handleErrors)
      .pipe(source(file))
      .pipe(buffer())
      //.pipe(uglify())
      .pipe(gulp.dest('./' + buildJsFolder + '/'))
      .pipe(livereload());
  }

  // listen for an update and run rebundle
  bundler.on('update', function() {
    rebundle();
    console.log('Rebundle...');
  });

  // run it once the first time buildScript is called
  return rebundle();
}

// run once
gulp.task('scripts', function() {
  return buildScript('app.js', false);
});

gulp.task('watch-scripts', function () {
  return buildScript('app.js', true);
});

/**
 * Compiles SCSS to CSS and minifies CSS
 */
gulp.task('styles', function () {
 var sassOptions = {
    'sourcemap': true,
    'style': 'compressed'
  };

  return sass('scss/**/*.scss', sassOptions)
    .on('error', function (err) {
        console.error("Error", err.message);
    })
    .pipe(sourcemaps.init({debug: true}))
    .pipe(sourcemaps.write('./', {
      includeContent: true,
      sourceRoot: './'
    }))
    .pipe(gulp.dest('./' + buildCssFolder))
    .pipe(livereload());
});

gulp.task('watch', function () {
  var server = livereload.listen();
  buildScript('app.js', true);
  //gulp.watch([jsFolder + '/**/*.js'], ['scripts']);
  gulp.watch([sassFolder + '/**/*.scss'], ['styles']);
  //gulp.watch([imageFolder + '/**/*'], ['images']);
});

// run 'scripts' task first, then watch for future changes
gulp.task('default', ['scripts', 'styles'], function() {
  var server = livereload.listen();
  return buildScript('app.js', true);
});
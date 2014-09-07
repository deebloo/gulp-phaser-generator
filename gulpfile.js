// Gulp plugins
var gulp = require('gulp'),
    serve = require('gulp-serve'),
    uglify = require('gulp-uglify'),
    gulpif = require('gulp-if'),
    useref = require('gulp-useref'),
    create = require('./generator/create'),
    args = require('yargs'),
    inject = require('gulp-inject');

gulp.task('phaser:level', function()
{

  var lvlName = args.argv.n;

  create.level(lvlName, function()
  {

    var target = gulp.src('./app/index.html');
    var sources = gulp.src(['./app/js/levels/*.js'], {read: false});

    return target.pipe(inject(sources))
      .pipe(gulp.dest('./app'));

  });

});

// Create new master js file
gulp.task('js', function()
{

  var assets = useref.assets();

  return gulp.src('app/*.html')
    .pipe(assets)
    .pipe(gulpif('*.js', uglify()))
    .pipe(assets.restore())
    .pipe(useref())
    .pipe(gulp.dest('build'));

});

// Move assets to build folder
gulp.task('assets', function()
{

  return gulp.src('app/assets/*')
    .pipe(gulp.dest('build/assets'));

});

// Serve from root app folder
gulp.task('serve:dev', serve('app'));

// Serve from build folder
gulp.task('serve:prod', serve('build'));

// Create build, move assets and build js
gulp.task('phaser:build', ['js', 'assets']);

// Run the game in dev mode
gulp.task('run:dev', ['serve:dev']);

// Build and run the game
gulp.task('run:prod', ['build', 'serve:prod']);

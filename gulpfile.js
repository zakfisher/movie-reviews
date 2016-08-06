var gulp = require('gulp')
var livereload = require('gulp-livereload')
var nodemon = require('gulp-nodemon')
var react = require('gulp-react')
var sass = require('gulp-sass')
var wait = require('gulp-wait')
var watch = require('gulp-watch')
var env = require('./.env')

var reloadDelay = 1000

var source = require('vinyl-source-stream')
var browserify = require('browserify')
var reactify = require('reactify')

livereload({ start: true })

gulp.task('build', ['jsx', 'scss'])
gulp.task('default', ['build', 'server', 'watch'])

gulp.task('jsx', function() {
  return browserify('src/index.jsx')
    .transform(reactify)
    .bundle()
    .pipe(source('index.js'))
    .pipe(gulp.dest('public'))
    .pipe(wait(reloadDelay))
    .pipe(livereload())
})

gulp.task('scss', function () {
  return gulp.src(['./src/*.scss'])
    .pipe(sass({
      loadPath: ['./src/**']
    }).on('error', sass.logError))
    .pipe(gulp.dest('./public'))
    .pipe(wait(reloadDelay))
    .pipe(livereload())
})

gulp.task('server', function() {
  return nodemon({
    script: 'index.js',
    ext: 'html js jsx jade',
    env: env
  })
})

gulp.task('watch', function() {
  return gulp.watch(['src/**/**'], ['build'])
})

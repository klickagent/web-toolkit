import babelify from 'babelify'
import browserify from 'browserify'
import shim from 'browserify-shim'
import gulp from 'gulp'
import sourcemaps from 'gulp-sourcemaps'
import gutil from 'gulp-util'
import buffer from 'vinyl-buffer'
import source from 'vinyl-source-stream'
import notifier from 'node-notifier'

module.exports = () =>
  browserify({
    debug: true,
    extensions: ['.js', '.coffee'],
  })
  .transform(babelify)
  .transform(shim)
  .add('docs/js/index.js')
  .bundle()
  .on('error', (err) => {
    gutil.log(err.message)
    notifier.notify({
      title: 'Browserify Failed',
      message: err.message,
    })
    return this.emit('end')
  })
  .pipe(source('style-guide-docs.js'))
  .pipe(buffer())
  .pipe(sourcemaps.init({ loadMaps: true }))
  .on('error', gutil.log)
  .pipe(sourcemaps.write(''))
  .pipe(gulp.dest('dist/docs/js'))

//! Copyright AXA Versicherungen AG 2015
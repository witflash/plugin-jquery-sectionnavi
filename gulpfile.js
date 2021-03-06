/* CONFIG DATA */
const config = {
  src: {
    root: 'src',
    js: 'src/js',
  },
  dest: {
    root: 'dist',
    js: 'dist/js',
  },
  docs: {
    root: 'docs',
  },
};

/* IMPORT MODULES */
const gulp = require('gulp');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');

/* TASKS */
gulp.task('minimize', () => gulp
  .src(`${config.src.js}/*.js`)
  .pipe(babel({ presets: ['env'] }))
  .pipe(uglify())
  .pipe(rename({ suffix: '.min' }))
  .pipe(gulp.dest(config.dest.js)));

gulp.task('docs', () => gulp
  .src(`${config.src.root}/**/*.*`)
  .pipe(gulp.dest(config.docs.root)));

gulp.task('default', ['minimize', 'docs']);

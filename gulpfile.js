/* CONFIG DATA */
let config = {
	src: {
		root: 'src/',
		js: 'src/js/',
	},
	dest: {
		root: 'dist/',
		js: 'dist/js/',
	}
};

/* IMPORT MODULES */
const gulp      = require('gulp');
const uglify    = require('gulp-uglifyjs');
const rename 	= require('gulp-rename');


/* TASKS */
gulp.task('uglify', function() {
	return gulp.src(config.src.js + '**/*.js')
	.pipe(uglify())
	.pipe(rename({suffix: '.min'}))
	.pipe(gulp.dest(config.dest.js))
});
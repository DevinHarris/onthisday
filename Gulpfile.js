var gulp = require('gulp'),
	sass = require('gulp-sass'),
	uglify = require('gulp-uglify'),
	pump = require('pump');


gulp.task('sass', function() {
	return gulp.src('./sass/**/*.scss')
		.pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
		.pipe(gulp.dest('./css'));
});

gulp.task('uglify', function(cb) {

	pump([
		gulp.src('./js/**.js'),
		uglify(),
		gulp.dest('./js/min')
	],

	cb

	);
});

/*gulp.task('watch', function() {
	gulp.watch();
}); */

gulp.task('default', ['sass']);
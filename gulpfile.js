var gulp = require('gulp'),
	sass = require('gulp-sass'),
	plumber = require('gulp-plumber'),
	webServer = require('gulp-webserver'); // https://www.npmjs.org/package/gulp-webserver/

gulp.task('sass', function() {
	gulp.src('app/styles/sass/app.scss')
		.pipe(plumber())
		.pipe(sass())
		.pipe(gulp.dest('app/styles/css'));
});

gulp.task('watch', function() {
	gulp.watch('app/styles/sass/*.scss', ['sass']);
});

gulp.task('server', function() {
	gulp.src('app')
		.pipe(webServer({
			livereload: true,
			directoryListing: false,
			// https: true,
			open: false
		}));
});

gulp.task('default', ['sass', 'watch', 'server']);
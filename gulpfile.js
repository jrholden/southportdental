

var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass');
var jshint = require('gulp-jshint');
var jscs = require('gulp-jscs');
var minifyHtml = require('gulp-minify-html');
var angularTemplatecache = require('gulp-angular-templatecache');
var useref = require('gulp-useref');
var ngAnnotate = require('gulp-ng-annotate');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var del = require('del');

var config = {
    js: 'js/**/*.js',
    images: 'images/*.*',
    fonts: 'fonts/*.*',
    html: 'templates/*.html',
    temp: 'temp/'
};

var dist = {
    path: 'src/',
    images: 'images/',
    fonts: 'fonts/'
};


// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src(['node_modules/bootstrap/scss/bootstrap.scss', 'src/scss/*.scss'])
        .pipe(sass())
        .pipe(gulp.dest("src/css"))
        .pipe(browserSync.stream());
});

// Move the javascript files into our /src/js folder
gulp.task('js', function() {
    return gulp.src(['node_modules/bootstrap/dist/js/bootstrap.min.js', 'node_modules/jquery/dist/jquery.min.js', 'node_modules/tether/dist/js/tether.min.js','node_modules/tether/dist/js/tether.min.js', 'node_modules/angular/angular.min.js','node_modules/jquery/dist/jquery.min.js','node_modules/angular-route/angular-route.min.js'])
        .pipe(gulp.dest("src/js"))
        .pipe(browserSync.stream());
});
gulp.task('fonts', function() {
    return gulp.src(['node_modules/fonts/**'])
        .pipe(gulp.dest("src/fonts"))
        .pipe(browserSync.stream());
});

gulp.task('deploy', ['sass'], function () {
    return gulp.src(['src/**'])
        .pipe(gulp.dest('/xampp/htdocs/SouthportDental'))
        .pipe(browserSync.stream());
});

// Static Server + watching scss/html files
gulp.task('serve', ['deploy'], function() {

    browserSync.init({
        server: "/xampp/htdocs/SouthportDental"
    });

    gulp.watch(['src/**/*'], ['deploy']);
    gulp.watch("src/**").on('change', browserSync.reload);
});


gulp.task('default', ['js','sass','fonts']);
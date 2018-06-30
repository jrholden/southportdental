

var gulp = require('gulp');
var browserSync = require('browser-sync');
var sass        = require('gulp-sass');
var jshint = require('gulp-jshint');
var jscs = require('gulp-jscs');
var rename = require('gulp-rename');
var babel = require('gulp-babel');
var minifyHtml = require('gulp-minify-html');
var angularTemplatecache = require('gulp-angular-templatecache');
var useref = require('gulp-useref');
var ngAnnotate = require('gulp-ng-annotate');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var del = require('del');


const server = browserSync.create();

function reload(done) {
    server.reload();
    done();
}

function serve(done) {
    server.init({
        server: {
            baseDir: '/xampp/htdocs/SouthportDental'
        }
    });
    done();
}


function clean() {
    return del(['src/js', 'src/css']);
}

function styles() {
    return gulp.src(['node_modules/bootstrap/scss/**', 'src/scss/*.scss'])
        .pipe(sass())
        .pipe(concat('main.min.css'))
        .pipe(gulp.dest("src/css"))
}

function scripts() {
    return gulp.src(['node_modules/bootstrap/dist/js/bootstrap.min.js', 'node_modules/jquery/dist/jquery.min.js', 'node_modules/tether/dist/js/tether.min.js','node_modules/tether/dist/js/tether.min.js', 'node_modules/angular/angular.min.js','node_modules/jquery/dist/jquery.min.js','node_modules/angular-route/angular-route.min.js'])

        .pipe(gulp.dest("src/js"));
}

function watch() {
    gulp.watch('src/**/*.js', gulp.series([scripts, reload]));
    gulp.watch(['src/scss/*.scss',], gulp.series([styles, reload]));
}

function stage() {
    return gulp.src(['src/**'])
        .pipe(gulp.dest('/xampp/htdocs/SouthportDental'))
}

exports.clean = clean;
exports.styles = styles;
exports.scripts = scripts;
exports.watch = watch;
exports.stage = stage;
exports.reload = reload;
exports.serve = serve;

var build = gulp.series(clean, gulp.parallel(styles, scripts), stage, serve, watch);

gulp.task('build', build);

gulp.task('default', build);
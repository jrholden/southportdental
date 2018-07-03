

let gulp = require('gulp');
let browserSync = require('browser-sync');
let sass        = require('gulp-sass');
/*let jshint = require('gulp-jshint');
let jscs = require('gulp-jscs');
let rename = require('gulp-rename');
let babel = require('gulp-babel');
let minifyHtml = require('gulp-minify-html');
let angularTemplatecache = require('gulp-angular-templatecache');
let useref = require('gulp-useref');
let ngAnnotate = require('gulp-ng-annotate');
let uglify = require('gulp-uglify');*/
let concat = require('gulp-concat');
let del = require('del');


const paths = {
    src: 'src',
    styles: {
        src: ['node_modules/bootstrap/scss/**', 'src/scss/*.scss'],
        dist: 'dist/css'
    },
    scripts: {
        src: ['node_modules/bootstrap/dist/js/bootstrap.min.js', 'node_modules/jquery/dist/jquery.min.js', 'node_modules/tether/dist/js/tether.min.js','node_modules/tether/dist/js/tether.min.js', 'node_modules/angular/angular.min.js','node_modules/jquery/dist/jquery.min.js','node_modules/angular-route/angular-route.min.js'],
        dist: 'dist/js'
    },
    server: {
        baseDir: '/xampp/htdocs/SouthportDental'
    },
    dist: {
        path: 'dist'
    }
};


const server = browserSync.create();

function reload(done) {

    server.reload();
    done();
}

function serve(done) {
    server.init({
        files: [paths.src + '/**'],
        server: {
            baseDir: paths.dist.path
        }
    });
    done();
}


function clean() {
    return del([paths.scripts.dist, paths.styles.dist]);
}

function styles() {
    return gulp.src(paths.styles.src)
        .pipe(sass())
        .pipe(concat('main.min.css'))
        .pipe(gulp.dest(paths.styles.dist))
}

function scripts() {
    return gulp.src(paths.scripts.src)

        .pipe(gulp.dest(paths.scripts.dist));
}

function watch() {
    gulp.watch(paths.scripts.src, gulp.series([ reload]));
    gulp.watch(paths.styles.src, gulp.series([styles, reload]));
    gulp.watch([paths.src+'/*.html',paths.src+'/**/*.html'], gulp.series([clean,styles,scripts,stage, reload]));
}

function stage() {
    return gulp.src([paths.src+'/**'])
        .pipe(gulp.dest(paths.dist.path))
}

exports.clean = clean;
exports.styles = styles;
exports.scripts = scripts;
exports.watch = watch;
exports.stage = stage;
exports.reload = reload;
exports.serve = serve;

let build = gulp.series(clean, gulp.parallel(styles, scripts), stage, serve, watch);

gulp.task('build', build);

gulp.task('default', build);
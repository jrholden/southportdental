

let gulp = require('gulp');
let browserSync = require('browser-sync');
let sass = require('gulp-sass');
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

const rootPaths = {
    src: 'src',
    dist: 'dist',
}
const paths = {
    styles: {
        src: ['node_modules/bootstrap/scss/**', rootPaths.src + '/scss/*.scss'],
        dist: rootPaths.dist + '/css',
        minFileName: 'main.min.css'
    },
    depScripts: {
        src: [
            'node_modules/bootstrap/dist/js/bootstrap.min.js',
            'node_modules/jquery/dist/jquery.min.js',
            'node_modules/tether/dist/js/tether.min.js',
            'node_modules/tether/dist/js/tether.min.js',
            'node_modules/angular/angular.min.js',
            'node_modules/jquery/dist/jquery.min.js',
            'node_modules/angular-route/angular-route.min.js'
        ],
        dist: rootPaths.dist + '/js'
    },
    assets: {
        src: rootPaths.src + '/assets/**',
        dist: rootPaths.dist + '/assets'
    },
    customScripts: {
        src: [rootPaths.src + '/*.js', rootPaths.src + '/**/*.js'],
        dist: rootPaths.dist
    },
    html: {
        src: [rootPaths.src + '/*.html', rootPaths.src + '/**/*.html'],
        dist: rootPaths.dist
    }
};


const server = browserSync.create();

function reload(done) {
    server.reload();
    done();
}

function serve(done) {
    server.init({
        files: [rootPaths.dist + '/**'],
        server: {
            baseDir: rootPaths.dist
        }
    });
    done();
}
function quickClean() {
    return del([paths.styles.dist,paths.customScripts.dist, paths.html.dist])
}
function fullClean() {
    return del(rootPaths.dist)
}
function styles() {
    return gulp.src(paths.styles.src)
        .pipe(sass())
        .pipe(concat(paths.styles.minFileName))
        .pipe(gulp.dest(paths.styles.dist))
}
function assets() {
    return gulp.src(paths.assets.src)
        .pipe(gulp.dest(paths.assets.dist))
}
function html() {
    return gulp.src(paths.html.src)
        .pipe(gulp.dest(paths.html.dist))
}
function depScripts() {
    return gulp.src(paths.depScripts.src)
        .pipe(gulp.dest(paths.depScripts.dist));
}
function customScripts() {
    return gulp.src(paths.customScripts.src)
        .pipe(gulp.dest(paths.customScripts.dist));
}
function watch() {
    gulp.watch(paths.depScripts.src, gulp.series([depScripts, reload]));
    gulp.watch(paths.customScripts.src, gulp.series([customScripts, reload]));
    gulp.watch(paths.assets.src, gulp.series([assets, reload]));
    gulp.watch(paths.styles.src, gulp.series([styles, reload]));
    gulp.watch(paths.html.src, gulp.series([html, reload]));
}

let stage = gulp.parallel(styles, depScripts,customScripts,assets,html);


exports.quickClean = quickClean;
exports.fullClean = fullClean;
exports.styles = styles;
exports.depScripts = depScripts;
exports.customScripts = customScripts;
exports.html = html;
exports.assets = assets;
exports.watch = watch;
exports.stage = stage;
exports.reload = reload;
exports.serve = serve;

let build = gulp.series(fullClean, stage, serve, watch);

gulp.task('build', build);

gulp.task('default', build);
'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var cssnano = require('gulp-cssnano');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var flatten = require('gulp-flatten');
var rename = require('gulp-rename');
var notify = require('gulp-notify');
var newer = require('gulp-newer');
var uglify = require('gulp-uglify');
var debug = require('gulp-debug');
var del = require('del');
var filter = require('gulp-filter');
var fileinclude = require('gulp-file-include');
var browserSync = require('browser-sync').create();

function update() {
    return gulp.src('src/**/*.html')
        .pipe(fileinclude({
            prefix: '@@',
            basepath: 'src'}))
        .pipe(filter(['**','!src/templates/*']))
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.stream());
}

function images() {
    return gulp.src('src/img/**/*')
        .pipe(gulp.dest('dist/img'))
        .pipe(browserSync.stream());
}

function styles() {
    return gulp.src('src/sass/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass(
            {
                outputStyle: 'nested',
                includePaths: ['src/css','src/scss']
            }).on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 3 versions'],
            cascade: false
        }))
        .pipe(newer('dist/css/*.css'))
        .pipe(sourcemaps.write('maps'))
        .pipe(gulp.dest('dist/css'))
        .pipe(filter('**/*.css'))
        .pipe(rename({suffix: '.min'}))
        .pipe(cssnano())
        .pipe(sourcemaps.write('maps'))
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.stream());
}

function copy_css() {
    return gulp.src('src/ext-css/**/*.css')
        .pipe(newer('dist/css'))
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.stream());
}

function copy_js() {
    return gulp.src('src/ext-js/**/*.js')
        .pipe(newer('dist/js'))
        .pipe(gulp.dest('dist/js'))
        //.pipe(rename({suffix: '.min'}))
        //.pipe(uglify())
        //.pipe(gulp.dest('dist/js'))
        .pipe(browserSync.stream());
}

function clean() {
    return del(['dist/css', 'dist/**/*.html', 'js']);
}

gulp.task('default', done => {
    gulp.series(update, styles, copy_css, copy_js, images);
    done();
});

function reload() {
    browserSync.reload();
}

function watch() {
    browserSync.init({
        server: {
            baseDir: "./dist"
        }
    });
    gulp.watch('src/**/*.html').on('change',gulp.series(update,reload));
    gulp.watch('src/ext-css/**/*.css').on('change',gulp.series(copy_css,reload));
    gulp.watch('src/sass/**/*.scss').on('change',gulp.series(styles,reload));
    gulp.watch('src/ext-js/**/*.js').on('change',gulp.series(copy_js,reload));
    gulp.watch('src/img/**/*').on('change',gulp.series(images,reload));
//    gulp.watch('src/js/**/*.js', ['scripts']);
}

exports.watch = watch;
var build = gulp.parallel(update,styles,watch);
gulp.task('build',build);

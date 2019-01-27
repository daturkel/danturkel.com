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
var connect = require('gulp-connect');

gulp.task('update', function() {
    return gulp.src('src/**/*.html')
        .pipe(fileinclude({
            prefix: '@@',
            basepath: 'src'}))
        .pipe(filter(['**','!src/templates/*']))
        .pipe(gulp.dest('dist'))
        .pipe(connect.reload());
});

gulp.task('images', function () {
    return gulp.src('src/img/**/*')
        .pipe(gulp.dest('dist/img'))
        .pipe(connect.reload());
});

gulp.task('styles', function () {
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
        .pipe(connect.reload());
});


gulp.task('copy-css', function () {
    return gulp.src('src/ext-css/**/*.css')
        .pipe(newer('dist/css'))
        .pipe(gulp.dest('dist/css'))
        .pipe(connect.reload());
});

gulp.task('copy-js', function () {
    return gulp.src('src/ext-js/**/*.js')
        .pipe(newer('dist/js'))
        .pipe(gulp.dest('dist/js'))
        //.pipe(rename({suffix: '.min'}))
        //.pipe(uglify())
        //.pipe(gulp.dest('dist/js'))
        .pipe(connect.reload());
});

gulp.task('clean', function() {
    return del(['dist/css', 'dist/**/*.html', 'js']);
});

gulp.task('webserver', function() {
    connect.server({
        root: 'dist',
        host: 'danturkel.test',
        livereload: true
    });
});

gulp.task('default', function() {
    gulp.start('update', 'styles', 'copy-css', 'copy-js', 'images')
});

gulp.task('watch', function() {
    gulp.start('update','styles','webserver');
    gulp.watch('src/**/*.html', ['update']);
    gulp.watch('src/ext-css/**/*.css', ['copy-css']);
    gulp.watch('src/sass/**/*.scss', ['styles']);
    gulp.watch('src/ext-js/**/*.js', ['copy-js']);
    gulp.watch('src/img/**/*',['images']);
//    gulp.watch('src/js/**/*.js', ['scripts']);
});

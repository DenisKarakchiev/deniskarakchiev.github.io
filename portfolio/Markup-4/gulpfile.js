const gulp = require('gulp'),
    concat = require('gulp-concat'),
    autoprefixer = require('gulp-autoprefixer'),
    cleanCSS = require('gulp-clean-css');

const cssFiles = [
    './src/css/some.css',
    './src/css/other.css',
    './node_modules/normalize-css/normalize.css'
];

const jsFiles = [
    './src/js/lib.js',
    './src/js/script.js'
];

function styles() {
    return gulp.src(cssFiles).
        pipe(concat('all.css')).
        pipe(autoprefixer({
            browsers: ['> 0.1%'],
            cascade: false
        })).
        pipe(cleanCSSdsf({
            level: 2
        })).
        pipe(gulp.dest('./build/'));
}

function scripts() {
    return gulp.src(jsFiles).
        pipe(gulp.dest('./build/js'));
}

function html() {
    return gulp.src('./src/index.html').
        pipe(gulp.dest('./build/'));
}

gulp.task('styles', styles);
gulp.task('scripts', scripts);
gulp.task('html', html);

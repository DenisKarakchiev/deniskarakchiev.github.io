var gulp = require('gulp'),
    pug = require('gulp-pug')
    sass  = require('gulp-sass'),
    rename  = require('gulp-rename'),
    concat  = require('gulp-concat'),
    uglifyjs  = require('gulp-uglifyjs'),
    cssnano = require('gulp-cssnano'),
    imagemin  = require('gulp-imagemin'),
    clean = require('gulp-clean'),
    pngquant  = require('gulp-pngquant'),
    autoprefixer  = require('gulp-autoprefixer')
    browserSync = require('browser-sync'),
    cache = require('gulp-cache');

gulp.task('pug', function buildHTML() {
  return gulp.src('src/*.pug')
    .pipe(pug())
    .pipe(gulp.dest('src'))
});

gulp.task('sass', function(){
  return gulp.src('src/sass/**/*.sass')
    .pipe(sass())
    .pipe(autoprefixer(['last 15 versions', '>1%', 'ie 8', 'ie 7'],
      {cascade: true}))
    .pipe(gulp.dest('src/css'))
    .pipe(browserSync.reload({stream: true}))
});

gulp.task('browser-sync', function(){
  browserSync({
    server: {
      baseDir: 'src'
    },
    notify: false
  });
});

gulp.task('scripts', function(){
  return gulp.src(['src/components/wallop/js/Wallop.min.js'])
    .pipe(concat('libs.min.js'))
    .pipe(uglifyjs())
    .pipe(gulp.dest('src/js'));
});

gulp.task('css-libs', ['sass'], function(){
  return gulp.src('src/css/libs.css')
    .pipe(cssnano())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('src/css'));
});

gulp.task('watch', ['browser-sync', 'scripts', 'css-libs', 'pug'], function() {
  gulp.watch('src/sass/**/*.sass', ['sass']);
  gulp.watch('src/*.pug', ['pug']);
  gulp.watch('src/js/**/*.js', browserSync.reload);
  gulp.watch('src/*.html', browserSync.reload);
});

gulp.task('img', function(){
  return gulp.src('src/img/**/*')
    .pipe(cache(imagemin({
      interlaced: true,
      progressive: true,
      svgoPlugins: [{removeViewBox: false}],
      use: [pngquant()]
    })))
    .pipe(gulp.dest('dist/img'));
});

gulp.task('clean', function(){
  return gulp.src('dist', {read: false})
    .pipe(clean());
});

gulp.task('build', ['clean', 'img', 'css-libs', 'scripts', 'pug'], function(){
  var buildCss = gulp.src([
    'src/css/libs.min.css',
    'src/css/style.css'
  ])
  .pipe(gulp.dest('dist/css'));

  var buildJs = gulp.src('src/js/**/*')
    .pipe(gulp.dest('dist/js'));

  var buildHtml = gulp.src('src/*.html')
    .pipe(gulp.dest('dist'));
});

gulp.task('default', ['watch']);

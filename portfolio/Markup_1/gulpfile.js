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
  return gulp.src('app/*.pug')
    .pipe(pug())
    .pipe(gulp.dest('app'))
});

gulp.task('sass', function(){
  return gulp.src('app/sass/**/*.sass')
    .pipe(sass())
    .pipe(autoprefixer(['last 15 versions', '>1%', 'ie 8', 'ie 7'],
      {cascade: true}))
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({stream: true}))
});

gulp.task('browser-sync', function(){
  browserSync({
    server: {
      baseDir: 'app'
    },
    notify: false
  });
});

gulp.task('scripts', function(){
  return gulp.src([
    'app/components/jquery/dist/jquery.min.js',
    'app/components/magnific-popup/dist/jquery.magnific-popup.min.js',
    'app/components/bootstrap/dist/js/bootstrap.min.js'
    ])
    .pipe(concat('libs.min.js'))
    .pipe(uglifyjs())
    .pipe(gulp.dest('app/js'));
});

gulp.task('css-libs', ['sass'], function() {
  return gulp.src('app/components/magnific-popup/dist/magnific-popup.css')
    .pipe(cssnano())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('app/css'));
});

gulp.task('watch', ['browser-sync', 'css-libs', 'scripts', 'pug'], function(){
  gulp.watch('app/sass/**/*.sass', ['sass']);
  gulp.watch('app/*.pug', ['pug']);
  gulp.watch('app/js/**/*.js', browserSync.reload);
  gulp.watch('app/*.html', browserSync.reload);
});

gulp.task('img', function(){
  return gulp.src('app/img/**/*')
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

gulp.task('build', ['clean', 'img', 'sass', 'scripts'], function(){
  var buildCss = gulp.src([
    'app/css/libs.css',
    'app/css/style.css'
  ])
  .pipe(gulp.dest('dist/css'));

  var buildFonts = gulp.src('app/fonts/**/*')
    .pipe(gulp.dest('dist/fonts'));

  var buildJs = gulp.src('app/js/**/*')
    .pipe(gulp.dest('dist/js'));

  var buildHtml = gulp.src('app/*.html')
    .pipe(gulp.dest('dist'));

});

gulp.task('default', ['watch']);

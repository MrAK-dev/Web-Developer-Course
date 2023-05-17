const gulp = require('gulp');
const browserSync = require('browser-sync');
const sass = require('gulp-sass')(require('sass'));
const rename = require('gulp-rename');
const autoprefixer = require('gulp-autoprefixer');
const cleanCss = require('gulp-clean-css');

gulp.task('server', () => {
  browserSync.init({
    server: {
      baseDir: './src',
    },
  });
});

gulp.task('styles', () => {
  return gulp
    .src('./src/scss/*.+(scss|sass)')
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(
      rename({
        prefix: '',
        suffix: '.min',
      })
    )
    .pipe(
      autoprefixer({
        overrideBrowserslist: ['last 2 versions'],
        cascade: false,
      })
    )
    .pipe(cleanCss({ compatibility: 'ie8' }))
    .pipe(gulp.dest('./src/css'))
    .pipe(browserSync.stream());
});

gulp.task('watch', () => {
  gulp.watch('./src/scss/*.+(scss|sass)', gulp.parallel('styles'));
  gulp.watch('./src/*.html').on('change', browserSync.reload);
});

gulp.task('default', gulp.parallel('watch', 'server', 'styles'));

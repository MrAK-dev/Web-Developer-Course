export const icons = () => {
  return app.gulp
    .src(app.path.src.images)
    .pipe(
      app.plugins.plumber(
        app.plugins.notify.onError({
          title: 'ICONS',
          message: 'Error: <%= error.message %>',
        })
      )
    )
    .pipe(app.gulp.src(app.path.src.icons))
    .pipe(app.gulp.dest(app.path.build.icons))
    .pipe(app.plugins.browserSync.stream());
};

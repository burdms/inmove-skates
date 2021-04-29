/* eslint-disable arrow-body-style */
'use strict';

/* eslint-disable no-undef */
const gulp = require('gulp');
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const pug = require('gulp-pug');
const browserSync = require('browser-sync').create();
const uglify = require('gulp-uglify-es').default;
const del = require('del');

gulp.task('pug', () => {
  return gulp
    .src('./src/index.pug')
    .pipe(
      pug({
        pretty: true,
      })
    )
    .pipe(gulp.dest('./build/'))
    .on('end', browserSync.reload);
});

gulp.task('sass', () => {
  return gulp
    .src('./src/styles/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(
      sass({
        errorLogToConsole: true,
        outputStyle: 'compressed',
      })
    )
    .on('error', console.error.bind(console))
    .pipe(
      autoprefixer({
        cascade: false,
      })
    )
    .pipe(rename({ suffix: '.min' }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./build/styles/'))
    .pipe(
      browserSync.reload({
        stream: true,
      })
    );
});

gulp.task('js', () => {
  return gulp
    .src('./src/scripts/main.js')
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('./build/scripts/'))
    .pipe(
      browserSync.reload({
        stream: true,
      })
    );
});

gulp.task('images', () => {
  return gulp
    .src('./src/images/**/*')
    .pipe(gulp.dest('./build/images/'))
    .pipe(
      browserSync.reload({
        stream: true,
      })
    );
});

gulp.task('fonts', () => {
  return gulp
    .src('./src/fonts/**/*')
    .pipe(gulp.dest('./build/fonts/'))
    .pipe(
      browserSync.reload({
        stream: true,
      })
    );
});

gulp.task('clean', () => {
  return del('./build/*');
});

gulp.task('watch', () => {
  gulp.watch('./src/**/*.pug', gulp.series('pug'));
  gulp.watch('./src/styles/**/*.scss', gulp.series('sass'));
  gulp.watch('./src/scripts/**/*.js', gulp.series('js'));
  gulp.watch('./src/images/**/*', gulp.series('images'));
});

gulp.task('serve', () => {
  browserSync.init({
    server: {
      baseDir: './build',
    },
  });
});

gulp.task(
  'default',
  gulp.series(
    'clean',
    'images',
    'fonts',
    gulp.parallel('pug', 'js'),
    'sass',
    gulp.parallel('watch', 'serve')
  )
);

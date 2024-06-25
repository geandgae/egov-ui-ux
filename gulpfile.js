"use strict";

// plug-in
const gulp = require("gulp");
const sass = require("gulp-dart-sass");
const browserSync = require("browser-sync").create();

// path
const pathSrc = {
  root: "./app/src",
  scss: "./app/src/assets/scss",
  css: "./app/src/assets/css",
};

// dist 폴더를 삭제하는 task 정의
gulp.task("clean", function () {
  return import("del").then((del) => {
    return del.deleteAsync([pathSrc.css]);
  });
});

// SCSS 컴파일 작업
gulp.task("sass", function() {
  return gulp.src(pathSrc.scss + "/*.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(gulp.dest(pathSrc.css))
    .pipe(browserSync.stream());
});

// server
gulp.task("server", function () {
  browserSync.init({
    server: {
      baseDir: pathSrc.root
    }
  });
  // watch
  gulp.watch(pathSrc.scss + "/**/*", gulp.series("sass"));
});

// gulp start
gulp.task("default", gulp.series("clean", "sass", "server"));
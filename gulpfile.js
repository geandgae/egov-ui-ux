"use strict";

// plug-in
const gulp = require("gulp");
const sass = require("gulp-dart-sass");
const browserSync = require("browser-sync").create();


// path
const src = "./app/src";
const dist = "./dist";
const assets = "/assets";
const html = "/html";
const pathSrc = {
  root: src,
  scss: `${src + assets}/scss`,
  css: `${src + assets}/css`,
  fonts: `${src + assets}/fonts`,
  js: `${src + assets}/js`,
  images: `${src + assets}/images`,
  html: src + html,
};
const pathDist = {
  root: dist,
  css: `${dist + assets}/css`,
  fonts: `${dist + assets}/fonts`,
  images: `${dist + assets}/images`,
  js: `${dist + assets}/js`,
  html: dist + html,
};


// dist 폴더를 삭제하는 task 정의
gulp.task("clean", function () {
  return import("del").then((del) => {
    return del.deleteAsync([pathDist.root]);
  });
});

// SCSS 컴파일 작업
gulp.task("sass", function() {
  return gulp.src(pathSrc.scss + "/*.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(cleanCSS())
    .pipe(gulp.dest(pathDist.css))
    .pipe(browserSync.stream());
});

// server
gulp.task("server", function () {
  browserSync.init({
    server: {
      baseDir: pathDist.root
    }
  });
  // watch
  gulp.watch(pathSrc.scss + "/**/*", gulp.series("sass"));
});

// gulp start
gulp.task("default", gulp.series("clean", "sass", "server"));

"use strict";

// plug-in
const gulp = require("gulp");
const sass = require("gulp-dart-sass");
const flatten = require("gulp-flatten");
const sourcemaps = require("gulp-sourcemaps");
const fs = require("fs-extra");
const uglify = require("gulp-uglify");
const cleanCSS = require("gulp-clean-css");
const rename = require("gulp-rename");
const browserSync = require("browser-sync").create();

// path
const pathSrc = {
  root: "./",
  scss: "./resources/scss/**/*.scss",
  js: "./resources/js/**/*.js",
  images: "./resources/img",
  fonts: "./resources/fonts",
  html: "./html/**/*.html"
};
const pathDist = {
  cssResources: "./resources/css/output",
  css: "./dist/css/output",
  js: "./dist/js",
  images: "./dist/img",
  fonts: "./dist/fonts",
  html: "./dist/html"
};


// clean
gulp.task("clean", function () {
  return import("del").then((del) => {
    return del.deleteAsync([pathDist.cssResources, "./dist"]);
  });
});

// sass
gulp.task("sass", function() {
  return gulp.src(pathSrc.scss)
    .pipe(sourcemaps.init())
    .pipe(sass().on("error", sass.logError))
    .pipe(sourcemaps.write("./"))
    .pipe(flatten())
    .pipe(gulp.dest(pathDist.cssResources)) // 퍼블작업경로
    .pipe(rename({ suffix: ".min" }))
    .pipe(cleanCSS())
    .pipe(gulp.dest(pathDist.css)) // 배포경로
    .pipe(browserSync.stream());
});

// JavaScript
gulp.task("scripts", function () {
  return gulp.src([pathSrc.js, "!./resources/js/guide/*.js", "!./resources/js/pattern/jquery.min.js"])
    .pipe(gulp.dest(pathDist.js))
    .pipe(rename({ suffix: ".min" }))
    .pipe(uglify())
    .pipe(gulp.dest(pathDist.js))
    .pipe(browserSync.stream());
});

// css copy
gulp.task("css", function () {
  return gulp.src(["./resources/css/**/*.css", "!./resources/css/guide/*.css"] )
    .pipe(gulp.dest("./dist/css/"))
    .pipe(browserSync.stream());
});

// // html copy
// gulp.task("html", function () {
//   return gulp.src(pathSrc.html,)
//     .pipe(gulp.dest(pathDist.html))
//     .pipe(browserSync.stream());
// });

// fonts
gulp.task("fonts", function() {
  return fs.copy(pathSrc.fonts, pathDist.fonts);
});

// images
gulp.task("images", function() {
  return fs.copy(pathSrc.images, pathDist.images)
});


// server
gulp.task("server", function () {
  browserSync.init({
    server: {
      baseDir: pathSrc.root
    },
    startPath: "./html/guide/index.html"
  });
  // watch
  gulp.watch(pathSrc.scss, gulp.series("sass"))
  gulp.watch(pathSrc.js, gulp.series("scripts"))
  gulp.watch(pathSrc.root + "/**/*").on("change", browserSync.reload);
});

// gulp start
gulp.task("default", gulp.series("clean", "sass", "scripts", "css", "fonts", "images", "server"));
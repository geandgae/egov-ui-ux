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
const fileinclude = require("gulp-file-include");

// path
const pathSrc = {
  root: "./",
  scss: "./resources/scss/**/*.scss",
  js: "./resources/js/**/*.js",
  images: "./resources/img",
  fonts: "./resources/fonts",
  html: "./html/**/*.html",
  htmlInc: "./html/**/inc/*.html"
};
const pathDist = {
  root: "./dist",
  cssResources: "./resources/css/output",
  css: "./dist/resources/css/output",
  js: "./dist/resources/js",
  images: "./dist/resources/img",
  fonts: "./dist/resources/fonts",
  html: "./dist/html"
};


// clean
gulp.task("clean", function () {
  return import("del").then((del) => {
    return del.deleteAsync([pathDist.cssResources, "./dist"]);
  });
});

// sass
gulp.task("sass", function () {
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
  return gulp.src([pathSrc.js, "!./resources/js/pattern/jquery.min.js"])
    .pipe(gulp.dest(pathDist.js))
    .pipe(rename({ suffix: ".min" }))
    .pipe(uglify())
    .pipe(gulp.dest(pathDist.js))
    .pipe(browserSync.stream());
});

// css copy
gulp.task("css", function () {
  return gulp.src("./resources/css/**/*.css")
    .pipe(gulp.dest("./dist/resources/css/"))
    .pipe(browserSync.stream());
    // .pipe(browserSync.stream({ match: "**/*.css" }));
});

// fonts
gulp.task("fonts", function () {
  return fs.copy(pathSrc.fonts, pathDist.fonts);
});

// images
gulp.task("images", function () {
  return fs.copy(pathSrc.images, pathDist.images)
});

// html copy
gulp.task("html", function () {
  return gulp.src([pathSrc.html, "!" + pathSrc.htmlInc])
    .pipe(fileinclude({
      prefix: "@@",
      basepath: "@file",
      context: {
        html: "/html"
      }
    }))
    .pipe(gulp.dest(pathDist.html))
    .pipe(browserSync.stream());
});

// server
gulp.task("server", function () {
  browserSync.init({
    server: {
      baseDir: pathDist.root
    },
    // logLevel: "debug",
    logFileChanges: false,
    startPath: "/html/guide/index.html"
  });
  // watch
  gulp.watch(pathSrc.scss, gulp.series("sass"));
  gulp.watch(pathSrc.js, gulp.series("scripts"));
  gulp.watch(pathSrc.html, gulp.series("html"));
  // gulp.watch(pathSrc.root + "/**/*").on("change", browserSync.reload);
});

// gulp start
gulp.task("default", gulp.series("clean", "sass", "scripts", "css", "html", "fonts", "images", "server"));
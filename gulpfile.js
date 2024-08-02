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
gulp.task("clean", () => {
  return import("del").then((del) => {
    return del.deleteAsync(pathDist.root);
  });
});

// sass
gulp.task("sass", () => {
  return gulp.src(pathSrc.scss)
    .pipe(sourcemaps.init())
    .pipe(sass().on("error", sass.logError))
    .pipe(flatten())
    .pipe(sourcemaps.write("./"))
    .pipe(gulp.dest(pathDist.cssResources))
    .pipe(browserSync.stream())
    .on("end", function() {
      return gulp.src(pathDist.cssResources + "/*.css")
        .pipe(rename({ suffix: ".min" }))
        .pipe(cleanCSS())
        .pipe(gulp.dest(pathDist.css));
    });
});

// css copy
gulp.task("css", () => {
  return gulp.src("./resources/css/**/*")
    .pipe(gulp.dest("./dist/resources/css/"))
    .pipe(browserSync.stream());
});

// JavaScript
gulp.task("scripts", () => {
  return gulp.src(pathSrc.js)
    .pipe(gulp.dest(pathDist.js))
    .pipe(rename({ suffix: ".min" }))
    .pipe(uglify())
    .pipe(gulp.dest(pathDist.js))
    .pipe(browserSync.stream());
});

// html copy
gulp.task("html", () => {
  return gulp.src([pathSrc.html, `!${pathSrc.htmlInc}`])
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

// assets copy
gulp.task("assets", () => {
  return Promise.all([
    fs.copy(pathSrc.fonts, pathDist.fonts),
    fs.copy(pathSrc.images, pathDist.images),
    fs.copy("./resources/file", "./dist/resources/file")
  ]);
});

// server
gulp.task("server", () => {
  browserSync.init({
    server: {
      baseDir: pathDist.root
    },
    startPath: "/html/guide/index.html",
    logFileChanges: false,
  });
  // watch
  gulp.watch(pathSrc.scss, gulp.series("sass", "css"));
  gulp.watch(pathSrc.js, gulp.series("scripts"));
  gulp.watch(pathSrc.html, gulp.series("html"));
  // gulp.watch(pathSrc.root + "/**/*").on("change", browserSync.reload);
});

// gulp start
gulp.task("default", gulp.series("clean", "sass", "css", "scripts", "html", "assets", "server"));
"use strict";

// plug-in
const gulp = require("gulp");
const sass = require("gulp-dart-sass");
const browserSync = require("browser-sync").create();
const rename = require('gulp-rename');


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

// SCSS 파일에 대해 분리된 CSS 파일로 컴파일하는 Gulp 작업 설정
gulp.task('sass-individual', function() {
  // SCSS 파일을 읽어와서 각각의 파일 별로 컴파일
  return gulp.src(path.join(pathSrc.scss, '*.scss'))
    .pipe(sass().on('error', sass.logError)) // SCSS를 CSS로 컴파일하고 에러 처리
    .pipe(rename(function(path) {
      // 각 SCSS 파일의 이름을 기반으로 CSS 파일 이름 설정
      path.basename = path.basename; // 파일의 기본 이름 유지
    }))
    .pipe(gulp.dest(pathSrc.css)) // 컴파일된 CSS 파일을 지정된 디렉터리에 저장
    .pipe(browserSync.stream()); // 브라우저에 변경 사항 실시간 반영
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

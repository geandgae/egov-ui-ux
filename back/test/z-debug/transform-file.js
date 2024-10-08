const fs = require("fs");
const path = require("path");

// 파일 경로 설정 
const directoryPath = path.join(__dirname, "../../html/site/component");

// 폴더 내 모든 파일을 읽음
fs.readdir(directoryPath, (err, files) => {
  if (err) {
    return console.error("폴더를 읽는 도중 에러가 발생했습니다:", err);
  }

  // .html 파일만 처리
  files.forEach((file) => {
    if (path.extname(file) === ".html") {
      const filePath = path.join(directoryPath, file);

      // 각 파일의 내용을 읽음
      fs.readFile(filePath, "utf8", (err, data) => {
        if (err) {
          return console.error("파일을 읽는 도중 에러가 발생했습니다:", err);
        }

        // g-desc 안의 텍스트 추출
        const gDescMatch = data.match(/<p class="g-desc">([\s\S]*?)<\/p>/);
        let gDescText = "";
        if (gDescMatch && gDescMatch[1]) {
          // 개행 문자를 한 칸 띄어쓰기로 변환하고, 연속된 공백을 하나의 공백으로 축소한 후 양쪽 공백 제거
          gDescText = gDescMatch[1]
            .replace(/[\r\n]+/g, " ")
            .replace(/\s+/g, " ")
            .trim();
        }

        let updatedData;

        // 첫 번째 변경 사항 처리
        updatedData = data.replace(
          /<div class="contents">/g,
          `<div class="contents">
            <!-- breadcrumb -->
            @@include("../inc/page-breadcrumb.html")
            <!-- breadcrumb -->

            <!-- page-title -->
            @@include("../inc/page-title.html")
            <!-- //page-title -->`
        );

        // 두 번째 변경 사항 처리 - 제목 변환
        updatedData = updatedData.replace(/<div class="g-conts-area">\s*<h3 class="g-heading-m">(.*?)<\/h3>/g, (match, title) => {
          return `<div class="conts-wrap section-link">
                <h3 class="sec-tit">${title}</h3>`;
        });

        // 세 번째 변경 사항 - 설명 영역을 scroll-check로 변경
        updatedData = updatedData.replace(
          /<!-- 설명 -->\s*<div class="g-description-area">([\s\S]*?)<\/div>\s*<!-- \/\/설명 -->/g,
          `<!-- scroll-check -->
            <div class="conts-wrap scroll-check">$1</div>
            <!-- //scroll-check -->`
        );

        // 네 번째 변경 사항 - 예시 영역을 새로운 구조로 변경
        updatedData = updatedData.replace(
          /<!-- 예시 -->\s*<div class="g-example-area">([\s\S]*?)<\/div>\s*<!-- \/\/예시 -->/g,
          `<div class="conts-wrap section-link">
              <h3 class="sec-tit"></h3>
              <!-- 예시 -->
              <div class="g-example-area">$1</div>
              <!-- //예시 -->
            </div>`
        );

         // 다섯 번째 변경 사항 - scroll-check 영역을 quick-nav-type 구조로 변경
         updatedData = updatedData.replace(
          /<!-- scroll-check -->\s*<div class="conts-wrap scroll-check">([\s\S]*?)<\/div>\s*<!-- \/\/scroll-check -->/g,
          `<!-- quick-nav-type -->
            <div class="conts-area quick-nav-type">
              <div class="conts-detail-wrap">
                <!-- quick link -->
                @@include("../inc/page-quick-nav.html")
                <!-- //quick link -->

                <!-- scroll-check -->
                <div class="conts-wrap scroll-check">
                  $1
                </div>
                <!-- //scroll-check -->
              </div>
            </div>
            <!-- //quick-nav-type -->`
        );

        // 수정된 내용을 다시 파일에 씀
        fs.writeFile(filePath, updatedData, "utf8", (err) => {
          if (err) {
            return console.error("파일을 쓰는 도중 에러가 발생했습니다:", err);
          }
          console.log(`${file} 파일이 성공적으로 업데이트되었습니다.`);
        });
      });
    }
  });
});


// node ./test/z-debug/transform-file.js
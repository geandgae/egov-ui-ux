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
          /@@include\("\.\.\/inc\/page-title\.html"\)/g,
          `@@include("../inc/page-title.html", { 
              "desc" : "${gDescText}"
            })`
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
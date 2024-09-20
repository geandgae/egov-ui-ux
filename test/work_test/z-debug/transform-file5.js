const fs = require("fs");
const path = require("path");

// 디렉토리 경로 설정
const directoryPath = path.join(__dirname, "../../html/site/component");

// 디렉토리 내 모든 파일 읽기
fs.readdir(directoryPath, (err, files) => {
  if (err) {
    console.error("디렉토리 읽기 중 오류 발생:", err);
    return;
  }

  // 디렉토리 내 모든 파일에 대해 반복
  files.forEach((file) => {
    const filePath = path.join(directoryPath, file);

    // 파일이 있는지 확인 후, 파일 읽기
    fs.readFile(filePath, "utf-8", (err, data) => {
      if (err) {
        console.error(`파일 읽기 중 오류 발생 (${file}):`, err);
        return;
      }

      // 주석 사이의 내용을 찾고 <div class="conts-detail-wrap"> 태그를 포함한 부분을 수정
      const regex = /<!--\s*quick-nav-type\s*-->([\s\S]*?)<!--\s*\/\/\s*quick-nav-type\s*-->/g;

      const newData = data.replace(regex, (match, content) => {
        const updatedContent = content.replace(/([\s\S]*?)/g, '$1');
        
        // 최종 결과 반환
        return `<!-- quick-nav-type -->${updatedContent}<!-- // quick-nav-type -->`;
      });

      // 변경된 내용 파일에 다시 쓰기
      fs.writeFile(filePath, newData, (err) => {
        if (err) {
          console.error(`파일 쓰기 중 오류 발생 (${file}):`, err);
        } else {
          console.log(`파일이 성공적으로 업데이트되었습니다: ${file}`);
        }
      });
    });
  });
});


// node ./test/z-debug/transform-file5.js
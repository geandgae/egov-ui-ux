const fs = require("fs");
const path = require("path");

// 디렉토리 경로 설정
const directoryPath = path.join(__dirname, "../../html/site/service");

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

      // 1단계: <div class="conts-detail-wrap"> 태그를 제거
      let newData = data.replace(/<div class="conts-detail-wrap">\s*/g, '  ');

      // 2단계: <!-- // quick-nav-type --> 기준으로 위로 두 번째 </div> 태그를 찾아 제거
      const quickNavEndRegex = /<!--\s*\/\/\s*quick-nav-type\s*-->/g;
      const match = quickNavEndRegex.exec(newData);

      if (match) {
        const position = match.index; // <!-- // quick-nav-type --> 주석의 위치
        const beforeQuickNav = newData.slice(0, position); // 주석 이전의 부분을 추출
        const divCloseRegex = /<\/div>/g;
        let divMatches = [];
        let matchResult;

        // </div> 태그를 찾고 그 위치를 저장
        while ((matchResult = divCloseRegex.exec(beforeQuickNav)) !== null) {
          divMatches.push(matchResult.index);
        }

        // 위에서 두 번째 </div> 태그의 위치 찾기
        if (divMatches.length >= 2) {
          const secondLastDivIndex = divMatches[divMatches.length - 2]; // 위에서 두 번째 </div> 위치
          
          // 두 번째 </div> 태그 제거
          const beforeSecondLastDiv = beforeQuickNav.slice(0, secondLastDivIndex);
          const afterSecondLastDiv = beforeQuickNav.slice(secondLastDivIndex + 6); // 6은 </div>의 길이
          
          // 대체되는 부분의 공백 제거
          newData = beforeSecondLastDiv.trimEnd() + afterSecondLastDiv + newData.slice(position);
        }
      }

      // // 주석 사이의 내용을 찾고 <div class="conts-detail-wrap"> 태그를 포함한 부분을 수정
      // const regex = /<!--\s*quick-nav-type\s*-->([\s\S]*?)<!--\s*\/\/\s*quick-nav-type\s*-->/g;

      // newData = data.replace(regex, (match, content) => {
      //   // <div class="conts-detail-wrap"> 태그와 그 사이 내용을 정확하게 찾아서 수정
      //   const updatedContent = content.replace(/<div class="conts-detail-wrap">\s*([\s\S]*?)\s*<\/div>/g, '\n$1\n');
        
      //   // 최종 결과 반환
      //   return `<!-- quick-nav-type -->${updatedContent}<!-- // quick-nav-type -->`;
      // });

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


// node ./test/z-debug/transform-file4.js
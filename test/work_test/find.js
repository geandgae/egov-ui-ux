const fs = require('fs');
const path = require('path');

// 정규 표현식 패턴 정의
const variablePattern = /\$\w+/g;
const excludePattern = /var\(--#\{\$\w+/;

function findScssVariables(directory) {
  let variables = [];

  function readFiles(dir) {
    const files = fs.readdirSync(dir);

    files.forEach(file => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);

      if (stat.isDirectory()) {
        readFiles(filePath);
      } else if (path.extname(file) === '.scss') {
        const content = fs.readFileSync(filePath, 'utf8');
        let match;
        
        while ((match = variablePattern.exec(content)) !== null) {
          const varName = match[0];
          const beforeVar = content.substring(0, match.index);
          
          if (!excludePattern.test(beforeVar)) {
            variables.push(varName);
          }
        }
      }
    });
  }

  readFiles(directory);
  return variables;
}

// 스크립트를 실행할 디렉토리 경로 설정
// const directoryPath = './resources/scss/component/component/';
// const directoryPath = './resources/scss/component/forms/';
const directoryPath = './resources/scss/component/mixins/';

// 변수 찾기
const foundVariables = findScssVariables(directoryPath);

// 결과 출력
foundVariables.forEach(variable => console.log(variable));

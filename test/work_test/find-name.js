const fs = require('fs');
const path = require('path');

// 특정 폴더 경로
const directoryPath = path.join(__dirname, 'html/guide/global/code');

// HTML 파일 이름 가져오기
fs.readdir(directoryPath, (err, files) => {
  if (err) {
    return console.log('Unable to scan directory: ' + err);
  } 
  // HTML 파일 리스트 콘솔에 출력
  const htmlFiles = files.filter(file => path.extname(file) === '.html');
  console.log('HTML 파일 리스트:');
  htmlFiles.forEach(file => {
    console.log(file);
  });
});


// 검색어
// guideExample

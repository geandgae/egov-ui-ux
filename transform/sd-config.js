// 사용자 정의 필터 등록
const excludePrimitiveFilter = (token) => {
  return !token.path.includes('primitive');
};

// 사용자 정의 필터를 사용하는 설정 파일
module.exports = {
  source: ["./tokens/**/*.json"],
  platforms: {
    scss: {
      transformGroup: "scss",
      buildPath: "./test/resources/scss/component/tokens/",
      files: [{
        destination: "_krds_tokens2.scss",
        format: "scss/variables",
        filter: excludePrimitiveFilter
      }]
    }
  }
};
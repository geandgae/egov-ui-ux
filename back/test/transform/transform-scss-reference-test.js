const StyleDictionary = require("style-dictionary");

function formatDate(date) {
  const options = {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZoneName: "short",
  };
  return date.toLocaleString("en-US", options);
}

const preset = `
@charset "utf-8";

// Do not edit directly
// Generated on ${formatDate(new Date())}
`;

function transformName(prop, suffix) {
  const path = prop.path.join("-");
  return suffix ? `${suffix}-${path}` : path;
}

function transformScssVariable(reference) {
  return reference.replace(/\{|\}/g, "").replace(/\./g, "-").replace(/\s+/g, "-").replace(/\//g, "-");
}

StyleDictionary.registerFormat({
  name: "custom/scss-format",

  formatter: function (dictionary) {
    // 토큰을 사용자 정의 그룹으로 분류합니다.
    const groupedTokens = dictionary.allProperties.reduce((acc, prop) => {

      let customGroup;
			let subGroup;

      // 카테고리에 따라 customGroup을 다르게 설정
      switch (prop.attributes.category) {
        case "color":
					if (prop.path[1] === "light") {
						customGroup = `${prop.path[0]}-${prop.path[1]}-${prop.path[2]}`;
						subGroup = prop.path.slice(0, 3).join("-");
					} else if (prop.path[1] === "high-contrast") { 
						customGroup = `${prop.path[0]}-${prop.path[1]}-${prop.path[2]}`;
            subGroup = prop.path.slice(0, 3).join("-");
					}
					break;
        case "number":
          customGroup = `${prop.path[0]}`;
					subGroup = `${prop.path[1]}`;
          break;
        default:
          customGroup = `${prop.path[0]}`;
					subGroup = prop.path.slice(0, 3).join("-");
      }

      if (!acc[customGroup]) acc[customGroup] = {};
      if (!acc[customGroup][subGroup]) acc[customGroup][subGroup] = [];
      acc[customGroup][subGroup].push(prop);

			
      return acc;
    }, {});

		
		// scss 실행부
    let scssContent = preset + "\n"; // 헤더 추가

    Object.keys(groupedTokens).forEach((group) => {
			scssContent += `\n// ${group.toUpperCase()} \n`;
	
			Object.keys(groupedTokens[group]).forEach((subGroup) => {
				const tokenList = groupedTokens[group][subGroup];
				
				tokenList.forEach((prop) => {
					// let name = transformName(prop); // 변수 이름 변환
					let name = prop.name; // 변수 이름 변환
					let value = prop.original && prop.original.value ? prop.original.value : prop.value;
					// 참조된 토큰은 SCSS 형식으로 변환합니다.
					if (typeof value === "string" && value.startsWith("{") && value.endsWith("}")) {
						value = `$${transformScssVariable(value)}`;
					}
					scssContent += `$${name}: ${value} !default;\n`;
				});
	
				// 서브 그룹에 대해 맵을 생성합니다.
				if (tokenList.length > 1) {
					// scssContent += `\n$${group}: (\n`;
					scssContent += `\n$${subGroup}: (\n`;
					tokenList.forEach((prop) => {
						// const mapKey = prop.path[3] !== undefined ? prop.path[3] : prop.path[2]; // 경로가 없으면 path[2] 사용
						const mapKey = prop.path[prop.path.length - 1];
						const tokenValue = transformName(prop);
						scssContent += `\t${mapKey}: $${tokenValue},\n`;
					});
					scssContent += `) !default;\n\n`;
				}
			});
		});
    return scssContent;
  },
});

// Style Dictionary 설정을 내보냅니다.
// 변환할 디자인 토큰 파일의 경로와 결과물을 저장할 경로를 지정합니다.
module.exports = {
  source: ["./tokens/transformed_tokens.json"], // 변환할 디자인 토큰의 JSON 파일 경로
  platforms: {
    scss: {
      transformGroup: "scss", // SCSS 형식으로 변환
      buildPath: "./resources/scss/tokens/", // 결과물이 저장될 경로
      files: [
        {
          destination: "_krds_tokens_custom.scss", // 생성될 SCSS 파일 이름
          format: "custom/scss-format", // 커스텀 SCSS 포맷 사용
        },
      ],
    },
  },
};

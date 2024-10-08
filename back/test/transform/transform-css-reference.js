// node
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

// preset
const preset = `
@charset "utf-8";

/* Do not edit directly
 Generated on ${formatDate(new Date())} */


`;

// transformName
function transformName(prop, suffix) {
  let path;
  switch (prop.path[0]) {
    case "mode-light":
    case "mode-high-contrast":
    case "responsive-pc":
    case "responsive-mobile":
      prop.path[0] = prop.path[0].split("-").slice(1).join("-");
      break;
    default:
      path = prop.path.slice(1).join("-");
      break;
  }
  path = path || prop.path.join("-");
  return suffix ? `${suffix}-${path}` : path;
}

// transformVariables
function transformVariable(reference) {
  const cleanedReference = reference.replace(/\{|\}/g, "").replace(/\./g, "-").replace(/\s+/g, "-").replace(/\//g, "-");
  const trimReference = cleanedReference.split("-").slice(1).join("-");
  return trimReference;
}

// custom CSS 포맷 정의
StyleDictionary.registerFormat({
  name: "custom/css-format",
  formatter: function (dictionary) {
    let cssContent = preset + ":root {\n";

    // 토큰을 카테고리별로 그룹화
    let currentCategory = "";

    dictionary.allProperties.forEach((prop) => {
      let name = transformName(prop, "krds");
      let value = prop.original && prop.original.value ? prop.original.value : prop.value;
      if (typeof value === "string" && value.startsWith("{") && value.endsWith("}")) {
        value = `var(--krds-${transformVariable(value)})`;
      }

      // 카테고리가 바뀔 때마다 주석을 추가
      if (prop.attributes.category !== currentCategory) {
        currentCategory = prop.attributes.category;
        cssContent += `\n  /* ${currentCategory.toUpperCase()} */\n`;
      }

      // 각 변수를 --name: value; 형식으로 추가
      cssContent += `  --${name}: ${value};\n`;
    });

    cssContent += "\n}\n";
    return cssContent;
  },
});
// export
module.exports = {
  source: ["./tokens/transformed_tokens.json"],
  platforms: {
    css: {
      transformGroup: "css",
      buildPath: "./resources/scss/tokens/",
      files: [
        {
          destination: "_krds_tokens_custom_css.scss",
          format: "custom/css-format",
        },
      ],
    },
  },
};

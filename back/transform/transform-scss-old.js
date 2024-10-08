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

// Do not edit directly
// Generated on ${formatDate(new Date())}
`;

// transformName
function transformName(prop, slice, suffix) {
  if (suffix) {
    const path = prop.path.slice(slice).join("-");
    return `${suffix}-${path}`;
  } else {
    return prop.path.slice(slice).join("-");
  }
}

// custom
StyleDictionary.registerFormat({
  name: "custom/scss-format",
  formatter: function (dictionary) {
    const typeGroups = dictionary.allProperties.reduce((acc, prop) => {
      const category = prop.path[0].replace(/\//g, "-");
      // const category = prop.type;
      // const category = prop.description;

      // transformName 호출 후 공백과 % 기호를 대체
      let name = transformName(prop, 1)
        .replace(/\s+/g, "-") // 공백을 -로 대체
        .replace(/%/g, ""); // % 기호를 빈 문자열로 대체

      // primitive 제외
      if (category === "primitive") {
        return acc;
      }

      if (!acc[category]) {
        acc[category] = [];
      }

      acc[category].push(`  ${name}: ${prop.value},`);
      // acc[category].push(`$${name}: ${prop.value};`);

      return acc;
    }, {});

    const scssContent = Object.entries(typeGroups)
      .map(([category, tokens]) => {
        return `\n\n//${category}\n$${category}: (\n${tokens.join("\n")}\n) !default;`;
        // return `//${category}\n${tokens.join("\n")}\n`;
      })
      .join("\n");

    // return scssContent;
    return preset + scssContent;
  },
});

// export
module.exports = {
  source: ["./tokens/transformed_tokens.json"],
  platforms: {
    scss: {
      transformGroup: "scss",
      buildPath: "./resources/scss/tokens/",
      files: [
        {
          destination: "_krds_tokens_custom.scss",
          format: "custom/scss-format",
        },
      ],
    },
  },
};

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

// transformVariable
function transformVariable(reference) {
  const cleanedReference = reference.replace(/\{|\}/g, "").replace(/\./g, "-").replace(/\s+/g, "-").replace(/\//g, "-");
  const trimReference = cleanedReference.split("-").slice(1).join("-");
  return trimReference;
}

// custom SCSS 포맷 정의
StyleDictionary.registerFormat({
  name: "custom/scss-format",
  formatter: function (dictionary) {
    const scssContent = dictionary.allProperties
      .map((prop) => {
        let name = transformName(prop, "krds");
        let value = prop.original && prop.original.value ? prop.original.value : prop.value;
        if (typeof value === "string" && value.startsWith("{") && value.endsWith("}")) {
          value = `$krds-${transformVariable(value)}`;
        }
        return `$${name}: ${value};`;
      })
      .join("\n");
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

// node
const StyleDictionary = require("style-dictionary");

function formatDate(date) {
  const options = {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZoneName: 'short'
  };
  return date.toLocaleString('en-US', options);
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
  formatter: function(dictionary) {
    const typeGroups = dictionary.allProperties.reduce((acc, prop) => {
      const type = prop.path[0];
      // const type = prop.type;
      // const type = prop.description;
      const name = transformName(prop, 1);

      if (!acc[type]) {
        acc[type] = [];
      }
      acc[type].push(`  ${name}: ${prop.value},`);
      return acc;
    }, {});

    const scssContent = Object.entries(typeGroups)
      .map(([type, tokens]) => {
        return `//${type}\n$${type}: (\n${tokens.join("\n")}\n)!default;`;
      })
      .join("\n\n");

    // return scssContent;
    return preset + scssContent;
  }
});

// export
module.exports = {
  source: [
    "./tokens/**/*",
  ],
  platforms: {
    scss: {
      transformGroup: "scss",
      buildPath: "./resources/scss/component/token/",
      files: [
        {
          destination: "_krds_tokens_custom.scss",
          format: "custom/scss-format",
        },
      ],
    },
  },
};
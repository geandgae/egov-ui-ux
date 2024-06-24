// node
const StyleDictionary = require("style-dictionary");

// transformName
function transformName(prop, removeFirstPathSegment) {
  if (removeFirstPathSegment) {
    const path = prop.path;
    path[0] = removeFirstPathSegment
    return path.join("-");
  } else {
    return prop.path.slice(1).join("-");
  }
}

// custom
StyleDictionary.registerFormat({
  name: "custom/scss-format",
  formatter: function(dictionary) {
    const typeGroups = dictionary.allProperties.reduce((acc, prop) => {
      const type = prop.type;
      if (!acc[type]) {
        acc[type] = [];
      }
      const name = transformName(prop, "");
      acc[type].push(`  ${name}: ${prop.value},`);
      return acc;
    }, {});

    const scssContent = Object.entries(typeGroups)
      .map(([type, tokens]) => {
        return `$${type}s: (\n${tokens.join("\n")}\n)!default;`;
      })
      .join("\n\n");

    return scssContent;
  }
});

// export
module.exports = {
  source: ["tokens/token.json"],
  platforms: {
    scss: {
      // transforms: ['attribute/cti', 'name/cti/kebab', 'size/rem'],
      transformGroup: "scss",
      buildPath: "build/scss/",
      files: [
        {
          destination: "_variables.scss",
          format: "custom/scss-format",
        },
      ],
    },
  },
}
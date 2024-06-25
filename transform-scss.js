// node
const StyleDictionary = require("style-dictionary");

// transformName
function transformName(prop, removeFirstPathSegment) {
  if (removeFirstPathSegment) {
    const path = prop.path;
    path[0] = removeFirstPathSegment;
    return path.join("-");
  } else {
    // return prop.path.slice(1).join("-"); // 첫 번째 요소 제외
    return prop.path.slice(-2).join("-"); // 끝에서 두 번째 
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
        return `//${type}\n$${type}: (\n${tokens.join("\n")}\n)!default;`;
      })
      .join("\n\n");

    // return scssContent;
    return `@charset "utf-8";\n\n//prefix\n$prefix: krds- !default;\n\n${scssContent}`;
  }
});

// export
module.exports = {
  source: ["./app/src/assets/tokens/token.json"],
  platforms: {
    scss: {
      // transforms: ['attribute/cti', 'name/cti/kebab', 'size/rem'],
      transformGroup: "scss",
      buildPath: "./app/src/assets/scss/abstracts/",
      files: [
        {
          destination: "_variables.scss",
          format: "custom/scss-format",
        },
      ],
    },
  },
};
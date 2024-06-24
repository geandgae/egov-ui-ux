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

// nestedTransformer
// function nestedTransformer(prop) {
//   const { value } = prop.original;
//   const nestedKeys = Object.keys(value);
//   const nestedVars = nestedKeys.map((key) => {
//     const items = value[key];
//     const nestedItems = Object.entries(items).map(([subKey, subValue]) => {
//       return `"${key}-${subKey}": "${subValue}",`;
//     });
//     return nestedItems.join("\n");
//   });
//   return nestedVars.join("\n");
// }

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
        return `$${type}: (\n${tokens.join("\n")}\n)!default;`;
      })
      .join("\n\n");

    return scssContent;
  }
});

// StyleDictionary.registerFormat({
//   name: "custom/scss-format",
//   formatter: function (dictionary) {
//     const typeGroups = dictionary.allProperties.reduce((acc, prop) => {
//       const type = prop.type;
//       if (!acc[type]) {
//         acc[type] = [];
//       }
//       const name = transformName(prop, "");
//       let value = prop.value;
//       if (typeof value === "object") {
//         value = `(
//           ${nestedTransformer(prop)}
//         )`;
//       }
//       if (typeof value === "string") {
//         acc[type].push(`  ${name}: ${value},`);
//       } else if (typeof value === "number") {
//         acc[type].push(`  ${name}: ${value};`);
//       } else {
//         // Handle other types if necessary
//         acc[type].push(`  // ${name}: ${value};`);
//       }
//       return acc;
//     }, {});

//     const scssContent = Object.entries(typeGroups)
//       .map(([type, tokens]) => {
//         return `$${type}: (\n${tokens.join("\n")}\n)!default;`;
//       })
//       .join("\n\n");
//     return scssContent;
//   },
// });

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
};
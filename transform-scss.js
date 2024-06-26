// node
const StyleDictionary = require("style-dictionary");

// transformName
function transformName(prop, suffix) {
  if (suffix) {
    const path = prop.path;
    path[0] = suffix;
    return path.join("-");
  } else {
    return prop.path.slice(1).join("-"); // 첫 번째 요소 제외
    // return prop.path.slice(-1).join("-"); // 마지막
    // return prop.path.slice(-2).join("-"); // 끝에서 두 번째 
  }
}

// preset
// const preset = `@charset "utf-8";\n\n//prefix\n$prefix: krds- !default;\n$box-shadow-base: 2px 2px 2px 0px rgba(0, 0, 0, 0.15) !default;\n\n`;
const preset = `
@charset "utf-8";


//prefix
$prefix: krds- !default;

//transition
$transition-base: .4s ease-in-out !default;
$transition-fade: opacity .4s linear !default;
$transition-collapse: max-height .4s ease !default;
$transition-collapse-width: width .4s ease !default;

//box shadow
$box-shadow-base: 2px 2px 2px 0px rgba(0, 0, 0, 0.15) !default;


`;


// custom
StyleDictionary.registerFormat({
  name: "custom/scss-format",
  formatter: function(dictionary) {
    const typeGroups = dictionary.allProperties.reduce((acc, prop) => {
      // const type = prop.type;
      const type = prop.path[0];
      // const type = prop.description;
      if (!acc[type]) {
        acc[type] = [];
      }
      const name = transformName(prop, type);
      // acc[type].push(`  ${type}-${name}: ${prop.value},`);
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

// StyleDictionary.registerFormat({
//   name: "custom/scss-format2",
//   formatter: function(dictionary) {
//     const typeGroups = dictionary.allProperties.reduce((acc, prop) => {
//       // const type = prop.type;
//       // const type = prop.path[0];
//       const type = prop.description;
//       if (type !== undefined) { 
//         if (!acc[type]) {
//           acc[type] = [];
//         }
//         const name = transformName(prop);
//         acc[type].push(`  ${name}: ${prop.value},`);
//       }
//       return acc;
//     }, {});

//     const scssContent = Object.entries(typeGroups)
//       .map(([type, tokens]) => {
//         return `//${type}\n$${type}: (\n${tokens.join("\n")}\n)!default;`;
//       })
//       .join("\n\n");

//     // return scssContent;
//     return preset + scssContent;
//   }
// });

// export
module.exports = {
  source: [
    // "./app/src/assets/tokens/**/*",
    // "./app/src/assets/tokens/token.json",
    // "./app/src/assets/tokens/design-token.json"
    "./app/src/assets/tokens/local-variables.tokens.json",
    "./app/src/assets/tokens/style-typography.tokens.json"
  ],
  platforms: {
    scss1: {
      transformGroup: "scss",
      buildPath: "./app/src/assets/scss/abstracts/",
      files: [
        {
          destination: "_variables.scss",
          format: "custom/scss-format",
        },
      ],
    },
    // scss2: {
    //   transformGroup: "scss",
    //   buildPath: "./app/src/assets/scss/abstracts/",
    //   files: [
    //     {
    //       destination: "_variables-test.scss",
    //       format: "custom/scss-format2",
    //     },
    //   ],
    // },
  },
};
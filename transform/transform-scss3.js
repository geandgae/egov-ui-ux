// node
const StyleDictionary = require("style-dictionary");
const fs = require('fs');
const path = require('path');

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
      const namespace = prop.filePath.split('/')[1].split('.')[0];
      const type = namespace;
      const name = transformName(prop);

      if (!acc[type]) {
        acc[type] = [];
      }
      acc[type].push(`$${type}-${name}: ${prop.value};`);
      return acc;
    }, {});

    const scssContent = Object.entries(typeGroups)
      .map(([type, tokens]) => {
        return `//${type}\n${tokens.join("\n")}`;
      })
      .join("\n\n");
    // return scssContent;
    return preset + scssContent;
  }
});

// getSortedFiles 함수
function getSortedFiles(dir) {
  let files = fs.readdirSync(dir).filter(file => file.endsWith('.json'));

  files.sort((a, b) => {
    if (a.includes('primitive') && !b.includes('primitive')) return -1;
    if (!a.includes('primitive') && b.includes('primitive')) return 1;
    if (a.includes('semantic') && !b.includes('semantic')) return -1;
    if (!a.includes('semantic') && b.includes('semantic')) return 1;
    return a.localeCompare(b);
  });

  return files.map(file => path.join(dir, file));
}

// tokens 디렉토리 내의 모든 JSON 파일을 정렬
const tokenDir = path.join(__dirname, '../tokens');
const sortedFiles = getSortedFiles(tokenDir);

// export
module.exports = {
  source: sortedFiles,
  platforms: {
    scss: {
      transformGroup: "scss",
      buildPath: "./test/resources/scss/component/tokens/",
      files: [
        {
          destination: "_krds_tokens_custom_test.scss",
          format: "custom/scss-format",
        },
      ],
    },
  },
};
const StyleDictionary = require('style-dictionary');

// Helper function to set nested property
function setNestedProperty(obj, path, value) {
  // console.log(obj)
  // console.log(value)
  const keys = path.split('.');
  let current = obj;
  
  while (keys.length > 1) {
    const key = keys.shift();
    if (!current[key]) {
      current[key] = {};
    }
    current = current[key];
  }

  current[keys[0]] = value;
}

// Register a custom transform to add namespaces based on file path
StyleDictionary.registerTransform({
  name: 'name/cti/namespace',
  type: 'name',
  transformer: function(prop, options) {
    const namespace = prop.filePath.split('/')[1].split('.')[0];
    return [namespace].concat(prop.path).join('.');
  }
});

// Register a custom format for nested JSON
StyleDictionary.registerFormat({
  name: 'custom/nested-json',
  formatter: function(dictionary, config) {
    const nestedTokens = {};

    dictionary.allProperties.forEach(prop => {
      const path = prop.name;
      setNestedProperty(nestedTokens, path, { value: prop.value, type: prop.type });
    });

    return JSON.stringify(nestedTokens, null, 2);
  }
});

// Extend the Style Dictionary with custom configurations
StyleDictionary.extend({
  source: [
    "./tokens/**/*",
  ],
  platforms: {
    json: {
      transformGroup: "json",
      buildPath: "./test/resources/scss/component/token/",
      transforms: ["name/cti/namespace"],
      files: [{
        destination: "tokens.json",
        format: "custom/nested-json"
      }]
    }
  }
}).buildAllPlatforms();

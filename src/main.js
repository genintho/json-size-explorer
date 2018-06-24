const isPlainObject = require("lodash/isPlainObject");

module.exports = function main(obj, stats, path) {
  const keys = Object.keys(obj);

  keys.forEach(key => {
    const value = obj[key];
    stats.addKeyValue(key, value);
    if (isPlainObject(value)) {
      main(obj[key], stats, path + "." + key);
    }
  });
};

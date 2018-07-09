const isPlainObject = require("lodash/isPlainObject");
const Stats = require("./stats");

function _main(obj, stats, path) {
  const keys = Object.keys(obj);

  keys.forEach(key => {
    const value = obj[key];
    stats.addKeyValue(key, value);
    if (isPlainObject(value)) {
      _main(obj[key], stats, path + "." + key);
    }
  });
}

module.exports = function main(raw) {
  const stat = new Stats(raw.length);
  _main(JSON.parse(raw), stat, "");
  return stat;
};

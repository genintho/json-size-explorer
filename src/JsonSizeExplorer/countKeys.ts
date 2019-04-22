const isPlainObject = require("lodash/isPlainObject");

module.exports = function countKeys(obj) {
  const keys = Object.keys(obj);
  return (
    keys.length +
    keys.reduce((ac, current) => {
      if (isPlainObject(obj[current])) {
        return ac + countKeys(obj[current]);
      }
      return ac;
    }, 0)
  );
};

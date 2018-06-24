module.exports = class Stats {
  constructor(rawLength) {
    this.totalLength = rawLength;
    this.keys = {};
    this.values = {};
    this.keyValue = {};
  }

  addKeyValue(key, value, path) {
    if (!this.keys[key]) {
      this.keys[key] = 0;
    }
    this.keys[key] = this.keys[key] + 1;

    const jsonValue = JSON.stringify(value);
    const kv = key + "@#@" + jsonValue;
    if (!this.keyValue[kv]) {
      this.keyValue[kv] = 0;
    }
    this.keyValue[kv] = this.keyValue[kv] + 1;

    if (!this.values[jsonValue]) {
      this.values[jsonValue] = [];
    }
    this.values[jsonValue].push(path);
  }

  keySortedByCount() {
    const ks = Object.keys(this.keys);
    ks.sort((a, b) => {
      if (this.keys[a] > this.keys[b]) {
        return 1;
      } else if (this.keys[a] < this.keys[b]) {
        return -1;
      }
      return 0;
    });
    return ks;
  }

  keySortedBySize() {
    const ks = Object.keys(this.keys);
    ks.sort((a, b) => {
      const aL = this.keys[a] * a.length;
      const bL = this.keys[b] * b.length;
      if (aL > bL) {
        return 1;
      } else if (aL < bL) {
        return -1;
      }
      return 0;
    });
    return ks;
  }

  valuesSortedByCount() {
    const ks = Object.keys(this.values);
    ks.sort((a, b) => {
      if (this.values[a].length > this.values[b].length) {
        return 1;
      } else if (this.values[a].length < this.values[b].length) {
        return -1;
      }
      return 0;
    });
    return ks;
  }

  valuesSortedBySize() {
    const ks = Object.keys(this.values);
    ks.sort((a, b) => {
      const aL = a.length * this.values[a].length;
      const bL = b.length * this.values[b].length;
      if (aL > bL) {
        return 1;
      } else if (aL < bL) {
        return -1;
      }
      return 0;
    });
    return ks;
  }

  /**
   * Number of char used to store the key
   * @returns {number}
   */
  keySize() {
    return Object.keys(this.keys).reduce((ac, current) => {
      return ac + current.length * this.keys[current];
    }, 0);
  }
  perc(nb) {
    return Math.floor((nb / this.totalLength) * 1000) / 10;
  }
  dupsValue() {
    return Object.keys(this.keyValue).filter(el => {
      return this.keyValue[el] > 1;
    });
  }
};

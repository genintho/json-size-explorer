export interface Indexable {
    [key: string]: any;
}

const TOKEN = "@#@";

export class JsonDocumentStats {
    public readonly totalLength: number;
    public readonly keyValue: Indexable;
    public readonly keys: Indexable;
    public readonly values: Indexable;

    constructor(rawLength: number) {
        this.totalLength = rawLength;
        this.keys = {};
        this.values = {};
        this.keyValue = {};
    }

    addKeyValue(key: string, value: any, path: string) {
        if (!this.keys[key]) {
            this.keys[key] = 0;
        }
        this.keys[key] = this.keys[key] + 1;

        const jsonValue = JSON.stringify(value);
        const kv = key + TOKEN + jsonValue;
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

    nbOfKey() {
        return Object.keys(this.keys).reduce((ac, current) => {
            return ac + this.keys[current];
        }, 0);
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

    perc(nb: number) {
        return Math.floor((nb / this.totalLength) * 1000) / 10;
    }

    freqDupsValue() {
        const ks = Object.keys(this.keyValue).filter((el) => {
            return this.keyValue[el] > 1;
        });
        ks.sort((a, b) => {
            const aL = this.keyValue[a];
            const bL = this.keyValue[b];
            if (aL > bL) {
                return 1;
            } else if (aL < bL) {
                return -1;
            }
            return 0;
        });
        return ks;
    }
    biggestDupsValue() {
        const ks = Object.keys(this.keyValue).filter((el) => {
            return this.keyValue[el] > 1;
        });
        ks.sort((a, b) => {
            const aL = this.keyValue[a] * a.length;
            const bL = this.keyValue[b] * b.length;
            if (aL > bL) {
                return 1;
            } else if (aL < bL) {
                return -1;
            }
            return 0;
        });
        return ks;
    }

    distinctValue(key: string) {
        const distinct = Object.keys(this.keyValue).filter((el) => {
            return el.substr(0, key.length + TOKEN.length) === key + TOKEN;
        });
        distinct.sort((a, b) => {
            if (this.keyValue[a] > this.keyValue[b]) return -1;
            if (this.keyValue[a] < this.keyValue[b]) return 1;
            return 0;
        });
        return distinct.map((keyValue) => {
            return {
                key: keyValue,
                count: this.keyValue[keyValue],
                size: this.keyValue[keyValue] * keyValue.length,
            };
        });
    }
}

(function(global, factory) {
    typeof exports === "object" && typeof module !== "undefined"
        ? (module.exports = factory())
        : typeof define === "function" && define.amd
            ? define(factory)
            : (global.JSONSizeExplorer = factory());
})(this, function() {
    "use strict";

    var commonjsGlobal =
        typeof window !== "undefined"
            ? window
            : typeof global !== "undefined"
                ? global
                : typeof self !== "undefined"
                    ? self
                    : {};

    /** Detect free variable `global` from Node.js. */
    var freeGlobal =
        typeof commonjsGlobal == "object" &&
        commonjsGlobal &&
        commonjsGlobal.Object === Object &&
        commonjsGlobal;

    var _freeGlobal = freeGlobal;

    /** Detect free variable `self`. */
    var freeSelf =
        typeof self == "object" && self && self.Object === Object && self;

    /** Used as a reference to the global object. */
    var root = _freeGlobal || freeSelf || Function("return this")();

    var _root = root;

    /** Built-in value references. */
    var Symbol = _root.Symbol;

    var _Symbol = Symbol;

    /** Used for built-in method references. */
    var objectProto = Object.prototype;

    /** Used to check objects for own properties. */
    var hasOwnProperty = objectProto.hasOwnProperty;

    /**
     * Used to resolve the
     * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
     * of values.
     */
    var nativeObjectToString = objectProto.toString;

    /** Built-in value references. */
    var symToStringTag = _Symbol ? _Symbol.toStringTag : undefined;

    /**
     * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
     *
     * @private
     * @param {*} value The value to query.
     * @returns {string} Returns the raw `toStringTag`.
     */
    function getRawTag(value) {
        var isOwn = hasOwnProperty.call(value, symToStringTag),
            tag = value[symToStringTag];

        try {
            value[symToStringTag] = undefined;
        } catch (e) {}

        var result = nativeObjectToString.call(value);
        {
            if (isOwn) {
                value[symToStringTag] = tag;
            } else {
                delete value[symToStringTag];
            }
        }
        return result;
    }

    var _getRawTag = getRawTag;

    /** Used for built-in method references. */
    var objectProto$1 = Object.prototype;

    /**
     * Used to resolve the
     * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
     * of values.
     */
    var nativeObjectToString$1 = objectProto$1.toString;

    /**
     * Converts `value` to a string using `Object.prototype.toString`.
     *
     * @private
     * @param {*} value The value to convert.
     * @returns {string} Returns the converted string.
     */
    function objectToString(value) {
        return nativeObjectToString$1.call(value);
    }

    var _objectToString = objectToString;

    /** `Object#toString` result references. */
    var nullTag = "[object Null]",
        undefinedTag = "[object Undefined]";

    /** Built-in value references. */
    var symToStringTag$1 = _Symbol ? _Symbol.toStringTag : undefined;

    /**
     * The base implementation of `getTag` without fallbacks for buggy environments.
     *
     * @private
     * @param {*} value The value to query.
     * @returns {string} Returns the `toStringTag`.
     */
    function baseGetTag(value) {
        if (value == null) {
            return value === undefined ? undefinedTag : nullTag;
        }
        return symToStringTag$1 && symToStringTag$1 in Object(value)
            ? _getRawTag(value)
            : _objectToString(value);
    }

    var _baseGetTag = baseGetTag;

    /**
     * Creates a unary function that invokes `func` with its argument transformed.
     *
     * @private
     * @param {Function} func The function to wrap.
     * @param {Function} transform The argument transform.
     * @returns {Function} Returns the new function.
     */
    function overArg(func, transform) {
        return function(arg) {
            return func(transform(arg));
        };
    }

    var _overArg = overArg;

    /** Built-in value references. */
    var getPrototype = _overArg(Object.getPrototypeOf, Object);

    var _getPrototype = getPrototype;

    /**
     * Checks if `value` is object-like. A value is object-like if it's not `null`
     * and has a `typeof` result of "object".
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
     * @example
     *
     * _.isObjectLike({});
     * // => true
     *
     * _.isObjectLike([1, 2, 3]);
     * // => true
     *
     * _.isObjectLike(_.noop);
     * // => false
     *
     * _.isObjectLike(null);
     * // => false
     */
    function isObjectLike(value) {
        return value != null && typeof value == "object";
    }

    var isObjectLike_1 = isObjectLike;

    /** `Object#toString` result references. */
    var objectTag = "[object Object]";

    /** Used for built-in method references. */
    var funcProto = Function.prototype,
        objectProto$2 = Object.prototype;

    /** Used to resolve the decompiled source of functions. */
    var funcToString = funcProto.toString;

    /** Used to check objects for own properties. */
    var hasOwnProperty$1 = objectProto$2.hasOwnProperty;

    /** Used to infer the `Object` constructor. */
    var objectCtorString = funcToString.call(Object);

    /**
     * Checks if `value` is a plain object, that is, an object created by the
     * `Object` constructor or one with a `[[Prototype]]` of `null`.
     *
     * @static
     * @memberOf _
     * @since 0.8.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
     * @example
     *
     * function Foo() {
     *   this.a = 1;
     * }
     *
     * _.isPlainObject(new Foo);
     * // => false
     *
     * _.isPlainObject([1, 2, 3]);
     * // => false
     *
     * _.isPlainObject({ 'x': 0, 'y': 0 });
     * // => true
     *
     * _.isPlainObject(Object.create(null));
     * // => true
     */
    function isPlainObject(value) {
        if (!isObjectLike_1(value) || _baseGetTag(value) != objectTag) {
            return false;
        }
        var proto = _getPrototype(value);
        if (proto === null) {
            return true;
        }
        var Ctor =
            hasOwnProperty$1.call(proto, "constructor") && proto.constructor;
        return (
            typeof Ctor == "function" &&
            Ctor instanceof Ctor &&
            funcToString.call(Ctor) == objectCtorString
        );
    }

    var isPlainObject_1 = isPlainObject;

    var stats = class Stats {
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
        perc(nb) {
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
    };

    function _main(obj, stats$$1, path) {
        const keys = Object.keys(obj);

        keys.forEach((key) => {
            const value = obj[key];
            stats$$1.addKeyValue(key, value);
            if (isPlainObject_1(value)) {
                _main(obj[key], stats$$1, path + "." + key);
            }
        });
    }

    var main = function main(raw) {
        const stat = new stats(raw.length);
        _main(JSON.parse(raw), stat, "");
        return stat;
    };

    return main;
});

import * as _ from "lodash"
import {Stats, Indexable} from "./stats";

function _main(obj:Indexable, stats: Stats, path:string) {
    const keys = Object.keys(obj);

    keys.forEach((key) => {
        const value = obj[key];
        stats.addKeyValue(key, value, path);
        if (_.isPlainObject(value)) {
            _main(obj[key], stats, path + "." + key);
        }
    });
}

export default function main(raw:string) {
    const stat = new Stats(raw.length);
    _main(JSON.parse(raw), stat, "");
    return stat;
}

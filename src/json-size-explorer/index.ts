import * as _ from "lodash";
import { JsonDocumentStats, Indexable } from "./JsonDocumentStats";

function _main(obj: Indexable, stats: JsonDocumentStats, path: string) {
    const keys = Object.keys(obj);

    keys.forEach((key) => {
        const value = obj[key];
        stats.addKeyValue(key, value, path);
        if (_.isPlainObject(value)) {
            _main(obj[key], stats, path + "." + key);
        } else if (_.isArray(value)) {
            value.forEach((item, idx) => {
                if (_.isPlainObject(item))
                    _main(item, stats, path + "." + key + "." + idx);
            });
        }
    });
}

export default function main(raw: string) {
    const stat = new JsonDocumentStats(raw.length);
    _main(JSON.parse(raw), stat, "");
    return stat;
}

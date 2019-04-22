import isPlainObject from "lodash/isPlainObject";

export default function countKeys(obj: any): number {
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
}

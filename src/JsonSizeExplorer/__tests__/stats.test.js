import { Stats } from "../stats";

describe("Stats", () => {
    test("totalSize", () => {
        const s = new Stats(10);
        expect(s.totalLength).toBe(10);
    });

    test("addKeyValue", () => {
        const s = new Stats(10);
        s.addKeyValue("bob", 5);
        expect(s.keys).toEqual({ bob: 1 });
        expect(s.keyValue).toEqual({ "bob@#@5": 1 });
        s.addKeyValue("bob", 6);
        expect(s.keys).toEqual({ bob: 2 });
        expect(s.keyValue).toEqual({ "bob@#@5": 1, "bob@#@6": 1 });
    });

    test("keySortedByCount", () => {
        const s = new Stats(10);
        s.addKeyValue("b", 5);
        s.addKeyValue("a", 6);
        s.addKeyValue("a", 7);
        s.addKeyValue("c", 1);
        s.addKeyValue("c", 2);
        s.addKeyValue("c", 2);
        expect(s.keySortedByCount()).toEqual(["b", "a", "c"]);
    });

    test("keySize", () => {
        const s = new Stats(10);
        s.addKeyValue("chat", 5);
        s.addKeyValue("conifere", 6);
        s.addKeyValue("chat", 7);
        s.addKeyValue("boom", 1);
        s.addKeyValue("boom", 2);
        s.addKeyValue("boom", 2);
        expect(s.keySize()).toEqual(28);
    });

    test("perc", () => {
        const s = new Stats(234);
        expect(s.perc(3)).toBe(1.2);
        expect(s.perc(100)).toBe(42.7);
    });

    test("freqDupsValue", () => {
        const s = new Stats(10);
        s.addKeyValue("b", 5);
        s.addKeyValue("a", 6);
        s.addKeyValue("a", 7);
        s.addKeyValue("a", 7);
        s.addKeyValue("c", 1);
        s.addKeyValue("c", 2);
        s.addKeyValue("c", 2);
        s.addKeyValue("c", 2);
        expect(s.freqDupsValue()).toEqual(["a@#@7", "c@#@2"]);
    });

    test("biggestDupsValue", () => {
        const s = new Stats(10);
        s.addKeyValue("b", 5);
        s.addKeyValue("a", 6);
        s.addKeyValue("aa", 7);
        s.addKeyValue("aa", 7);
        s.addKeyValue("cc", 1);
        s.addKeyValue("c", 2);
        s.addKeyValue("c", 2);
        expect(s.biggestDupsValue()).toEqual(["c@#@2", "aa@#@7"]);
    });

    test("keySortedBySize", () => {
        const s = new Stats(10);
        s.addKeyValue("a", 6);
        s.addKeyValue("a", 7);
        s.addKeyValue("longer", 2);
        s.addKeyValue("a", 1);
        expect(s.keySortedBySize()).toEqual(["a", "longer"]);
    });

    test("valuesSortedByCount", () => {
        const s = new Stats(10);
        s.addKeyValue("a", 7);
        s.addKeyValue("longer", "aaaaaaaaaa");
        s.addKeyValue("key", "aaaaaaaaaa");
        expect(s.valuesSortedByCount()).toEqual(["7", '"aaaaaaaaaa"']);
    });

    test("valuesSortedBySize", () => {
        const s = new Stats(10);
        s.addKeyValue("a", 7);
        s.addKeyValue("longer", "aaaaaaaaaa");
        s.addKeyValue("key", "aaaaaaaaaa");
        expect(s.valuesSortedBySize()).toEqual(["7", '"aaaaaaaaaa"']);
    });

    test("nbOfKey", () => {
        const s = new Stats(10);
        s.addKeyValue("a", 7);
        s.addKeyValue("a", 6);
        s.addKeyValue("longer", "aaaaaaaaaa");
        s.addKeyValue("key", "aaaaaaaaaa");
        expect(s.nbOfKey()).toBe(4);
    });

    test("distinct", () => {
        const s = new Stats(10);
        s.addKeyValue("a", 7);
        s.addKeyValue("a", 6);
        s.addKeyValue("a", 7);
        s.addKeyValue("longer", "aaaaaaaaaa");
        expect(s.distinctValue("a")).toMatchSnapshot();
    });
});

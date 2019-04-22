const countKeys = require("../countKeys");

describe("countKeys", () => {
  test.each([
    [{}, 0],
    [{ a: 4 }, 1],
    [{ a: { b: 1 } }, 2],
    [{ a: 5, b: { c: 2 } }, 3]
  ])(".countKeys", (a, expected) => {
    expect(countKeys(a)).toBe(expected);
  });
});

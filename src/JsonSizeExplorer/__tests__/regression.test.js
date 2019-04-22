import JSONSizeExplorer from "../main";
import fs from "fs";
const path = require("path");

describe("Regression tests", () => {
    const dirname = path.resolve(__dirname, "data");
    console.log(dirname);
    const filenames = fs.readdirSync(dirname);

    filenames.forEach(function(filename) {
        console.log(filename);
        const content = fs.readFileSync(dirname + "/" + filename, "utf-8");
        test(filename, () => {
            const stats = JSONSizeExplorer(content);
            // expect(stats).toMatchSnapshot();
            expect(stats.keys).toMatchSnapshot();
        });
    });
});

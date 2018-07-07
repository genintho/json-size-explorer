#!/usr/bin/env node

const updateNotifier = require("update-notifier");
const pkg = require("./package.json");
const thousands = require("thousands");

updateNotifier({ pkg }).notify();

const fs = require("fs");
const main = require("./src/main");
const program = require("commander");
const Stats = require("./src/stats");
const Table = require("cli-table3");

program
  .option("--path [string]", "Path of JSON document")
  .option("--items [num]", "Add the specified type of cheese [marble]", 5)
  .parse(process.argv);

if (!fs.existsSync(program.path)) {
  throw new Error(`File '${program.path}' does not exists.`);
}

const tableConfig = {
  // chars: {
  //   top: "",
  //   "top-mid": "",
  //   "top-left": "",
  //   "top-right": "",
  //   bottom: "",
  //   "bottom-mid": "",
  //   "bottom-left": "",
  //   "bottom-right": "",
  //   left: "+",
  //   "left-mid": "",
  //   mid: "-",
  //   "mid-mid": "",
  //   right: "",
  //   "right-mid": "",
  //   middle: "|"
  // },
  colAligns: ["left", "right", "right", "right"],
  style: {
    "padding-left": 0,
    "padding-right": 2,
    head: ["yellow"]
  },
  head: ["Key Name", "Count", "Total Size", "% of Total"]
};

console.log("Processing", program.path);
const raw = fs.readFileSync(program.path, { encoding: "utf-8" });
const obj = JSON.parse(raw);
const documentStats = new Stats(raw.length);

main(obj, documentStats, "");

console.log();
console.log("======================");
console.log("Keys");
console.log("======================");
console.log("Number of keys: " + thousands(documentStats.nbOfKey()));
console.log(
  "Key size",
  thousands(documentStats.keySize()),
  "-",
  documentStats.perc(documentStats.keySize()) + "%"
);

console.log();
console.log();
console.log("Most frequent keys");
console.log("----------------------");
// instantiate
let table = new Table(tableConfig);

documentStats
  .keySortedByCount()
  .slice(-program.items)
  .forEach(k => {
    const size = k.length * documentStats.keys[k];
    table.push([
      k,
      thousands(documentStats.keys[k]),
      thousands(size),
      documentStats.perc(size)
    ]);
  });

console.log(table.toString());

console.log();
console.log();
console.log("Heaviest keys");
console.log("----------------------");
table = new Table(tableConfig);

documentStats
  .keySortedBySize()
  .slice(-program.items)
  .forEach(k => {
    const size = k.length * documentStats.keys[k];
    table.push([
      k,
      thousands(documentStats.keys[k]),
      thousands(size),
      documentStats.perc(size)
    ]);
  });

console.log(table.toString());

console.log();
console.log("======================");
console.log("Values");
console.log("======================");

console.log();
console.log("Most Frequent Values");
console.log("----------------------");
table = new Table(
  Object.assign(
    {
      head: ["Values", "Count", "Total Size", "% of Total"]
    },
    tableConfig
  )
);

documentStats
  .valuesSortedByCount()
  .slice(-program.items)
  .forEach(k => {
    const size = documentStats.values[k].length * k.length;
    table.push([
      k.length > 60 ? k.substr(0, 60) + "..." : k,
      thousands(documentStats.values[k].length),
      thousands(size),
      documentStats.perc(size) + "%"
    ]);
  });
console.log(table.toString());

console.log();
console.log();
console.log("Heaviest Values");
console.log("----------------------");
table = new Table(
  Object.assign(
    {
      head: ["Values", "Count", "Total Size", "% of Total"]
    },
    tableConfig
  )
);

documentStats
  .valuesSortedBySize()
  .slice(-program.items)
  .forEach(k => {
    const size = documentStats.values[k].length * k.length;
    table.push([
      k.length > 60 ? k.substr(0, 60) + "..." : k,
      thousands(documentStats.values[k].length),
      thousands(size),
      documentStats.perc(size) + "%"
    ]);
  });
console.log(table.toString());

console.log();
console.log();
console.log("======================");
console.log("DUPLICATES KEY/VALUES");
console.log("======================");

console.log();
console.log("Most Frequent Duplicates Key/Value");
console.log("----------------------");
table = new Table(
  Object.assign(
    {
      head: ["Value", "Count", "Total Size"]
    },
    tableConfig
  )
);

documentStats
  .freqDupsValue()
  .slice(-program.items)
  .forEach(k => {
    const size = documentStats.keyValue[k] * (k.length - 3);
    table.push([
      k.length > 60 ? k.substr(0, 60) + "..." : k,
      thousands(documentStats.keyValue[k]),
      thousands(size),
      documentStats.perc(size) + "%"
    ]);
  });
console.log(table.toString());

console.log();
console.log();
console.log("Biggest Duplicates Key/Value");
console.log("----------------------");
table = new Table(
  Object.assign(
    {
      head: ["Value", "Count", "Total Size"]
    },
    tableConfig
  )
);

documentStats
  .biggestDupsValue()
  .slice(-program.items)
  .forEach(k => {
    const size = documentStats.keyValue[k] * (k.length - 3);
    table.push([
      k.length > 60 ? k.substr(0, 60) + "..." : k,
      thousands(documentStats.keyValue[k]),
      thousands(size),
      documentStats.perc(size) + "%"
    ]);
  });
console.log(table.toString());

console.log();
console.log("----------");
console.log("Total document size", documentStats.totalLength);

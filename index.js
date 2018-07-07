#!/usr/bin/env node

const updateNotifier = require("update-notifier");
const pkg = require("./package.json");

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

console.log("Processing", program.path);
const raw = fs.readFileSync(program.path, { encoding: "utf-8" });
const obj = JSON.parse(raw);
const documentStats = new Stats(raw.length);

main(obj, documentStats, "");

console.log();
console.log("----------");
console.log("Keys");
console.log("----------");
console.log(documentStats.nbOfKey(), "keys");
console.log(
  "Key size",
  documentStats.keySize(),
  documentStats.perc(documentStats.keySize()) + "%"
);

console.log();
console.log("Most frequent keys");
// instantiate
let table = new Table({
  head: ["Key Name", "Count", "Total Size", "% of Total"],
  style: {
    head: ["yellow"]
  }
});

documentStats
  .keySortedByCount()
  .slice(-program.items)
  .forEach(k => {
    const size = k.length * documentStats.keys[k];
    table.push([k, documentStats.keys[k], size, documentStats.perc(size)]);
  });

console.log(table.toString());

console.log();
console.log("Heaviest keys");
table = new Table({
  head: ["Key Name", "Count", "Total Size", "% of Total"],
  style: {
    head: ["yellow"]
  }
});

documentStats
  .keySortedBySize()
  .slice(-program.items)
  .forEach(k => {
    const size = k.length * documentStats.keys[k];
    table.push([k, documentStats.keys[k], size, documentStats.perc(size)]);
  });

console.log(table.toString());

console.log();
console.log("----------");
console.log("Values");
console.log("----------");

console.log();
console.log("Most Frequent Values");
table = new Table({
  head: ["Values", "Count", "Total Size", "% of Total"],
  style: {
    head: ["yellow"]
  }
});

documentStats
  .valuesSortedByCount()
  .slice(-program.items)
  .forEach(k => {
    const size = documentStats.values[k].length * k.length;
    table.push([
      k.length > 60 ? k.substr(0, 60) + "..." : k,
      documentStats.values[k].length,
      size,
      documentStats.perc(size) + "%"
    ]);
  });
console.log(table.toString());

console.log();
console.log("Heaviest Values");
table = new Table({
  head: ["Values", "Count", "Total Size", "% of Total"],
  style: {
    head: ["yellow"]
  }
});

documentStats
  .valuesSortedBySize()
  .slice(-program.items)
  .forEach(k => {
    const size = documentStats.values[k].length * k.length;
    table.push([
      k.length > 60 ? k.substr(0, 60) + "..." : k,
      documentStats.values[k].length,
      size,
      documentStats.perc(size) + "%"
    ]);
  });
console.log(table.toString());

console.log();
console.log("----------");
console.log("Duplicates Key/values");
console.log("----------");

table = new Table({
  head: ["Value", "Count", "Total Size"],
  style: {
    head: ["yellow"]
  }
});

documentStats
  .dupsValue()
  .slice(-program.items)
  .forEach(k => {
    table.push([k, documentStats.keyValue[k], k.length]);
  });
console.log(table.toString());

console.log();
console.log("----------");
console.log("Total document size", documentStats.totalLength);

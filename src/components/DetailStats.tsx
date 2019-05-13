import React from "react";
import { thousands, limitLen } from "../uiUtils";
import { JsonDocumentStats } from "../json-size-explorer/JsonDocumentStats";

interface iProps {
    jsonStats: JsonDocumentStats;
}

type tProcessor = (k: string) => (string | number)[];

export function DetailStats(props: iProps) {
    return (
        <div className="flex-row">
            <div>
                <h2>Keys</h2>
                <MostFrequentKeys jsonStats={props.jsonStats} />
                <HeaviestKeys jsonStats={props.jsonStats} />
            </div>
            <div>
                <h2>Values</h2>
                <MostFrequentValues jsonStats={props.jsonStats} />
                <HeaviestValues jsonStats={props.jsonStats} />
            </div>
            <div>
                <div>
                    <h2>Duplicates</h2>
                    <MostFrequentKVDuplicates jsonStats={props.jsonStats} />
                    <HeaviestKVDuplicates jsonStats={props.jsonStats} />
                </div>
            </div>
        </div>
    );
}

function MostFrequentKeys(props: iProps) {
    const stats = props.jsonStats;
    function processor(k: string) {
        const size = k.length * stats.keys[k];
        return [
            limitLen(k),
            thousands(stats.keys[k]),
            thousands(size),
            stats.perc(size),
        ];
    }
    return (
        <KeyTable
            title="Most Frequently used keys"
            description="List all the keys found in the JSON and order them by how many times they were found."
            dataProvider={stats.keySortedByCount.bind(stats)}
            processor={processor}
        />
    );
}

function HeaviestKeys(props: iProps) {
    const stats = props.jsonStats;
    function processor(k: string) {
        const size = k.length * stats.keys[k];
        return [k, thousands(stats.keys[k]), thousands(size), stats.perc(size)];
    }
    return (
        <KeyTable
            title="Heaviest keys"
            description="List all the keys found in the JSON and order them by how many characters are needed to store them."
            dataProvider={stats.keySortedBySize.bind(stats)}
            processor={processor}
        />
    );
}

function MostFrequentValues(props: iProps) {
    const stats = props.jsonStats;
    function processor(k: string) {
        const size = stats.values[k].length * k.length;
        return [
            limitLen(k),
            thousands(stats.values[k].length),
            thousands(size),
            stats.perc(size) + "%",
        ];
    }
    return (
        <KeyTable
            title="Most Frequent Values"
            description="List all the values found in the JSON and order them by how many we saw them."
            dataProvider={stats.valuesSortedByCount.bind(stats)}
            processor={processor}
        />
    );
}

function HeaviestValues(props: iProps) {
    const stats = props.jsonStats;
    function processor(k: string) {
        const size = stats.values[k].length * k.length;
        return [
            limitLen(k),
            thousands(stats.values[k].length),
            thousands(size),
            stats.perc(size) + "%",
        ];
    }
    return (
        <KeyTable
            title="Heaviest Values"
            description="List all the values found in the JSON and order them by how many characters are needed to store them."
            dataProvider={stats.valuesSortedBySize.bind(stats)}
            processor={processor}
        />
    );
}

function MostFrequentKVDuplicates(props: iProps) {
    const stats = props.jsonStats;
    function processor(k: string) {
        const size = stats.keyValue[k] * (k.length - 3);
        return [
            limitLen(k.replace("@#@", " = ")),
            thousands(stats.keyValue[k]),
            thousands(size),
            stats.perc(size) + "%",
        ];
    }
    return (
        <KeyTable
            title="Most Frequent Duplicates"
            description="List all the tuples Key/Value found in the JSON and order them by how often we saw them."
            dataProvider={stats.freqDupsValue.bind(stats)}
            processor={processor}
        />
    );
}

function HeaviestKVDuplicates(props: iProps) {
    const stats = props.jsonStats;
    function processor(k: string) {
        const size = stats.keyValue[k] * (k.length - 3);
        return [
            limitLen(k.replace("@#@", " = ")),
            thousands(stats.keyValue[k]),
            thousands(size),
            stats.perc(size) + "%",
        ];
    }
    return (
        <KeyTable
            title="Heaviest Duplicates"
            description="List all the tuples Key/Value ordered by how many characters are used to store them."
            dataProvider={stats.biggestDupsValue.bind(stats)}
            processor={processor}
        />
    );
}

function KeyTable(props: {
    title: string;
    description: string;
    dataProvider: () => string[];
    processor: tProcessor;
}) {
    return (
        <>
            <h3>{props.title}</h3>;
            <div className="alert alert-secondary" role="alert">
                {props.description}
            </div>
            <table className="table table-striped table-sm">
                <thead>
                    <tr>
                        <th>Key Name</th>
                        <th>Count</th>
                        <th>Total Size</th>
                        <th>%</th>
                    </tr>
                </thead>
                <tbody>
                    {drawTableBody(props.dataProvider, props.processor)}
                </tbody>
            </table>
        </>
    );
}

function drawTableBody(dataProvider: () => string[], processor: tProcessor) {
    return dataProvider()
        .slice(-5)
        .map(processor)
        .map(buildRow);
}

function buildRow(arr: (string | number)[], rowIdx: number) {
    return (
        <tr key={rowIdx}>
            {arr.map((item, idx) => {
                return <td key={rowIdx + "-" + idx}>{item}</td>;
            })}
        </tr>
    );
}

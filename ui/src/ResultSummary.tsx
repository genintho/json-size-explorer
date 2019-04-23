import React from "react";
import { thousands } from "./DomUtils";
import { Stats } from "./JsonSizeExplorer/stats";

interface iProps {
    jsonStats: Stats;
}

export function ResultSummary(props: iProps) {
    const stats = props.jsonStats;
    return (
        <div className="flex-row">
          <h1>Summary</h1>
            <ul>
                <li>Total document size: {thousands(stats.totalLength)}</li>
                <li>Number of keys: {thousands(stats.nbOfKey())}</li>
                <li>
                    Number of unique keys:{" "}
                    {thousands(Object.keys(stats.keys).length)}
                </li>
                <li>
                    Key size: {thousands(stats.keySize())} -{" "}
                    {stats.perc(stats.keySize())}%
                </li>
            </ul>
        </div>
    );
}

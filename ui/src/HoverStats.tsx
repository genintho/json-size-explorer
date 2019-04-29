import React from "react";
import { Stats } from "./JsonSizeExplorer/stats";
import { limitLen, thousands } from "./DomUtils";

interface iProps {
    objKey: string;
    jsonObj: any;
    jsonStats: Stats;
}

export class HoverStats extends React.Component<iProps> {
    render() {
        const { jsonStats, objKey } = this.props;
        const nbKey = jsonStats.keys[objKey];
        const sizeKey = jsonStats.keys[objKey] * objKey.length;
        const distinctValues = this.props.jsonStats.distinctValue(
            this.props.objKey
        );
        const valueSize = distinctValues.reduce((acu, current) => {
            return current.size + acu;
        }, 0);
        return (
            <div>
                <h2>Stats for '{objKey}'</h2>
                <ul>
                    <li>The Key is found {nbKey} times in document</li>
                    <li>
                        The weight of the key itself is {thousands(sizeKey)} (
                        {jsonStats.perc(sizeKey)}
                        %)
                    </li>
                    <li>
                        The total size of all the keys and values{" "}
                        {thousands(valueSize)} ({jsonStats.perc(valueSize)})
                    </li>
                    <li>
                        Key has {distinctValues.length} distinct values
                        {distinctValues.length > 1 && (
                            <table>
                                <thead>
                                    <tr>
                                        <th>Value</th>
                                        <th>#</th>
                                        <th>%</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {[0, 1].map((idx) => {
                                        const item = distinctValues[idx];
                                        return (
                                            <tr key={objKey + "-" + idx}>
                                                <td>
                                                    {limitLen(item.key, 20)}
                                                </td>
                                                <td>{thousands(item.count)}</td>
                                                <td>{thousands(item.size)}</td>
                                                <td>
                                                    {jsonStats.perc(item.size)}
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        )}
                    </li>
                </ul>
            </div>
        );
    }
}

import React from "react";
import { Stats } from "./JsonSizeExplorer/stats";

interface iProps {
    objKey: string;
    jsonObj: any;
    jsonStats: Stats;
}

export class HoverStats extends React.Component<iProps> {
    render() {
        return (
            <div>
                <h2>Stats for '{this.props.objKey}'</h2>
                <ul>
                  <li></li>
                </ul>
            </div>
        );
    }
}

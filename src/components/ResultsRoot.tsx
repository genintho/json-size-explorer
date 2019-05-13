import React from "react";

import { HighLevelStatistic } from "./HighLevelStatistic";
import { DetailStats } from "./DetailStats";
import { Explorer } from "./explorer/";
import { JsonDocumentStats } from "../json-size-explorer/JsonDocumentStats";

interface iProps {
    jsonObj: any;
    jsonStats: JsonDocumentStats;
}

export function ResultsRoot(props: iProps) {
    return (
        <div className="flex-row">
            <HighLevelStatistic jsonStats={props.jsonStats} />
            <DetailStats jsonStats={props.jsonStats} />
            <Explorer jsonStats={props.jsonStats} jsonObj={props.jsonObj} />
        </div>
    );
}

import React from "react";

import { HighLevelStatistic } from "./HighLevelStatistic";
import { DetailStatistics } from "./detailStatistics";
import { Explorer } from "./explorer/";
import { JsonDocumentStats } from "../json-size-explorer/JsonDocumentStats";

interface iProps {
    jsonObj: any;
    jsonStats: JsonDocumentStats;
}

export function ResultsRoot(props: iProps) {
    return (
        <div>
            <HighLevelStatistic jsonStats={props.jsonStats} />
            <DetailStatistics jsonStats={props.jsonStats} />
            <Explorer jsonStats={props.jsonStats} jsonObj={props.jsonObj} />
        </div>
    );
}

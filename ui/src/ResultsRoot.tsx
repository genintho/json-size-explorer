import React from "react";

import { ResultSummary } from "./ResultSummary";
import { ResultTableCount } from "./ResultTableCount";
import { Explorer } from "./Explorer";
import { Stats } from "./JsonSizeExplorer/stats";

interface iProps {
    jsonObj: any;
    jsonStats: Stats;
}

export function ResultsRoot(props: iProps) {
    return (
        <div className="flex-row">
            <ResultSummary jsonStats={props.jsonStats} />
            <ResultTableCount />
            <Explorer />
        </div>
    );
}

import React from "react";

import { ResultSummary } from "./ResultSummary";
import { ResultTableCount } from "./ResultTableCount";
import { Explorer } from "./Explorer";

export function ResultsRoot() {
    return (
        <div className="flex-row">
            <ResultSummary />
            <ResultTableCount />
            <Explorer />
        </div>
    );
}

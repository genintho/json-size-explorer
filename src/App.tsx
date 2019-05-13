import React from "react";
import "./App.css";
import { Form } from "./components/form";
import { ResultsRoot } from "./components/ResultsRoot";
import JSONSizeExplorer from "./json-size-explorer";
import { JsonDocumentStats } from "./json-size-explorer/JsonDocumentStats";

interface iProps {}

interface iState {
    rawJsonString: string;
    jsonObj: any;
    jsonStats: JsonDocumentStats;
}

export class App extends React.Component<iProps, iState> {
    constructor(propS: iProps) {
        super(propS);
        // const testObj = {};
        const testRawStr = "";
        // const testRawStr = JSON.stringify(testObj);
        const stat = testRawStr.length
            ? JSONSizeExplorer(testRawStr)
            : new JsonDocumentStats(0);
        this.state = {
            rawJsonString: testRawStr,
            // jsonObj: testObj,
            jsonObj: {},
            jsonStats: stat,
        };
    }

    onSubmit(rawJsonString: string) {
        const jsonStats = JSONSizeExplorer(rawJsonString);
        const jsonObj = JSON.parse(rawJsonString);
        this.setState({ rawJsonString, jsonStats, jsonObj });
    }

    render() {
        return (
            <div className="App">
                {this.state.rawJsonString.length === 0 && (
                    <Form onSubmit={this.onSubmit.bind(this)} />
                )}
                {this.state.rawJsonString.length !== 0 && (
                    <ResultsRoot
                        jsonObj={this.state.jsonObj}
                        jsonStats={this.state.jsonStats}
                    />
                )}
            </div>
        );
    }
}

export default App;

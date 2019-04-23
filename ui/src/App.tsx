import React from "react";
import "./App.css";
import { Form } from "./Form";
import { ResultsRoot } from "./ResultsRoot";
import JSONSizeExplorer from "./JsonSizeExplorer/main";
import { Stats } from "./JsonSizeExplorer/stats";

interface iProps {}

interface iState {
    rawJsonString: string;
    jsonObj: any;
    jsonStats: Stats;
}

export class App extends React.Component<iProps, iState> {
    constructor(propS: iProps) {
        super(propS);
        // const testObj = JSON.stringify({ a: 5, b: 56 });
        const testObj = "";
        const stat = testObj.length ? JSONSizeExplorer(testObj) : new Stats(0);
        this.state = {
            rawJsonString: testObj,
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

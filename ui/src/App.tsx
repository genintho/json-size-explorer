import React from "react";
import "./App.css";
import { Form } from "./Form";
import { ResultsRoot } from "./ResultsRoot";

interface iProps {}

interface iState {
    rawJsonString: string;
}

export class App extends React.Component<iProps, iState> {
    constructor(propS: iProps) {
        super(propS);
        this.state = {
            rawJsonString: "",
        };
    }

    onSubmit(rawJsonString: string) {
        this.setState({ rawJsonString });
    }

    render() {
        return (
            <div className="App">
                {this.state.rawJsonString.length === 0 && (
                    <Form onSubmit={this.onSubmit.bind(this)} />
                )}
                {this.state.rawJsonString.length !== 0 && <ResultsRoot />}
            </div>
        );
    }
}

export default App;

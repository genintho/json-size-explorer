import React from "react";

interface iProps {
    onSubmit: (data: string) => void;
}

interface iState {
    value: string;
}
export class Form extends React.Component<iProps, iState> {
    constructor(props: iProps) {
        super(props);
        this.state = { value: "" };
        this.handleTextAreaChange = this.handleTextAreaChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(ev: React.MouseEvent) {
        if (this.state.value.length === 0) {
            return;
        }
        this.props.onSubmit(this.state.value);
    }

    handleTextAreaChange(event: React.ChangeEvent) {
        // @ts-ignore
        const value = event.target.value ? event.target.value : "";
        this.setState({ value });
    }

    render() {
        return (
            <div className="flex-row" id="intro">
                <div
                    className="card"
                    style={{
                        position: "absolute",
                        left: "20%",
                        top: "30%",
                        width: "600px",
                    }}
                >
                    <div className="card-body">
                        <h5 className="card-title">JSON Size Explorer</h5>
                        <p>Understand the structure of your JSON files.</p>

                        <div>
                            <h6 className="card-subtitle mb-2 text-muted">
                                Paste
                            </h6>
                            <textarea
                                id="area"
                                cols={60}
                                rows={10}
                                value={this.state.value}
                                onChange={this.handleTextAreaChange}
                            />
                            <br />
                            <button
                                id="sub"
                                className="btn btn-info btn-sm"
                                onClick={this.onSubmit}
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

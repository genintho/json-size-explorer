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
                        width: "500px",
                    }}
                >
                    <div className="card-body">
                        <h5 className="card-title">JSON Size Explorer</h5>
                        <p>
                            This toll allow you to get some inside into the
                            internal of your JSONs and help you find way to make
                            them smaller.
                        </p>
                        <br />
                        <div style={{ display: "flex" }}>
                            <div>
                                <h6 className="card-subtitle mb-2 text-muted">
                                    File Import
                                </h6>
                                <div>
                                    <input
                                        type="file"
                                        id="file"
                                        style={{
                                            width: "225px",
                                            position: "relative",
                                            top: "20px",
                                        }}
                                    />
                                </div>
                            </div>
                            <div
                                style={{
                                    paddingLeft: "30px",
                                    borderLeft: "solid 1px black",
                                }}
                            >
                                <h6 className="card-subtitle mb-2 text-muted">
                                    Paste
                                </h6>
                                <textarea
                                    id="area"
                                    value={this.state.value}
                                    onChange={this.handleTextAreaChange}
                                />
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
            </div>
        );
    }
}

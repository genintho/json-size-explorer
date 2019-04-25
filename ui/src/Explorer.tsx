import * as _ from "lodash";
import React from "react";
import { Stats } from "./JsonSizeExplorer/stats";
import { limitLen } from "./DomUtils";

interface iProps {
    jsonObj: IterableObject;
    jsonStats: Stats;
}

interface iState {}

interface IterableObject {
    [s: string]: number | string | boolean | IterableObject;
}

export class Explorer extends React.Component<iProps, iState> {
    render() {
        return (
            <div className="flex-row">
                <h2>Json Explorer</h2>
              <div style={{display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gridTemplateRows: "1fr"}}>
                <div style={{height:"1000px", overflow:"auto"}}>
                <List obj={this.props.jsonObj} stats={this.props.jsonStats} />
                </div>
                <div> Stats</div>
              </div>
            </div>
        );
    }
}

interface iListProps {
    obj: IterableObject;
    stats: Stats;
}

class List extends React.Component<iListProps> {
    render() {
        const keys = Object.keys(this.props.obj);
        keys.sort();
        return (
            <ul>
                {keys.map((key) => {
                    return (
                        <ListItem
                            key={_.uniqueId(key)}
                            name={key}
                            value={this.props.obj[key]}
                            stats={this.props.stats}
                        />
                    );
                })}
            </ul>
        );
    }
}

interface iListItemProps {
    name: any;
    value: any;
    stats: Stats;
}

interface iListItemState {
    open: boolean;
}

class ListItem extends React.Component<iListItemProps, iListItemState> {
    constructor(props: iListItemProps) {
        super(props);
        this.state = {
            open: false,
        };
        this.onClick = this.onClick.bind(this);
    }

    onClick() {
        this.setState({ open: !this.state.open });
    }

    render() {
        const { value, stats } = this.props;
        const key = this.props.name; // Key could not be used as it conflict with the JSX "key" attribute
        const valueSize = JSON.stringify({ [key]: value }).length - 2;
        const canOpen = _.isPlainObject(value);
        return (
            <li>
                <span onClick={canOpen ? this.onClick : _.noop}>
                    {stats.perc(valueSize)}% {key} <Value value={value} />
                </span>
                {this.state.open && <List obj={value} stats={stats} />}
            </li>
        );
    }
}

function Value(props: { value: any }) {
    const value = props.value;
    if (_.isNull(value)) {
        return <>null</>;
    }
    if (_.isNumber(value)) {
        return <>{value}</>;
    }
    if (_.isString(value)) {
        return <>"{limitLen(value)}"</>;
    }
    if (_.isArray(value)) {
        return <>[{value.length}]</>;
    }
    if (_.isPlainObject(value)) {
        return (
            <>
                {"{"}
                {_.size(value)}
                {"}"}
            </>
        );
    }
    if (_.isBoolean(value)) {
        return <>{String(value)}</>;
    }
    return <>###</>;
}

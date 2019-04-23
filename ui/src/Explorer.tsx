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
                <List
                    path={[]}
                    obj={this.props.jsonObj}
                    stats={this.props.jsonStats}
                />
            </div>
        );
    }
}

interface iListProps {
    obj: IterableObject;
    stats: Stats;
    path: string[];
}

class List extends React.Component<iListProps> {
    render() {
        const keys = Object.keys(this.props.obj);
        keys.sort();
        return (
            <ul>
                {keys.map((key) => {
                    const elemPath = this.props.path.concat([key]);
                    return (
                        <ListItem
                            key={JSON.stringify(elemPath)}
                            path={elemPath}
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
    path: string[];
}

class ListItem extends React.Component<iListItemProps> {
    render() {
        const { name, value, stats, path } = this.props;
        const valueSize = JSON.stringify({ [name]: value }).length - 2;
        return (
            <li>
                {stats.perc(valueSize)}% {name} <Value value={value} />
            </li>
        );
    }
}

function Value(props: { value: any }) {
    const value = props.value;
    if (_.isNull(value)) {
        return <>"null"</>;
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
    return <>{'{'}{_.size(value)}{'}'}</>;
  }
    return (<>###</>);
}

import * as _ from "lodash";
import React from "react";
import { Stats } from "./JsonSizeExplorer/stats";
import { limitLen } from "./DomUtils";
import { HoverStats } from "./HoverStats";

type tToggleCollapsedKey = (path: string[]) => void;

interface iProps {
    jsonObj: IterableObject;
    jsonStats: Stats;
}

interface iState {
    hoverObjKey: string;
    expendedKeys: IterableObject;
}

interface IterableObject {
    [s: string]: number | string | boolean | IterableObject;
}

export class Explorer extends React.Component<iProps, iState> {
    constructor(props: iProps) {
        super(props);
        this.state = {
            hoverObjKey: "",
            expendedKeys: {},
        };
        this.toggleCollapsedKey = this.toggleCollapsedKey.bind(this);
    }

    toggleCollapsedKey(path: string[]) {
        const copyExpendedKeys = _.clone(this.state.expendedKeys);
        if (_.has(copyExpendedKeys, path)) {
            _.unset(copyExpendedKeys, path);
        } else {
            _.set(copyExpendedKeys, path, true);
        }

        this.setState({ expendedKeys: copyExpendedKeys });
    }
    render() {
        return (
            <div className="flex-row">
                <h2>Json Explorer</h2>
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gridTemplateRows: "1fr",
                      textAlign:"left"
                    }}
                >
                    <div style={{ height: "1000px", overflow: "auto" }}>
                        <List
                            obj={this.props.jsonObj}
                            stats={this.props.jsonStats}
                            path={[]}
                            toggleCollapsedKey={this.toggleCollapsedKey}
                            expendedKeys={this.state.expendedKeys}
                        />
                    </div>
                    <div>
                        {this.state.hoverObjKey.length > 0 && (
                            <HoverStats
                                jsonObj={this.props.jsonObj}
                                jsonStats={this.props.jsonStats}
                                objKey={"ha"}
                            />
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

interface iListProps {
    obj: IterableObject;
    stats: Stats;
    toggleCollapsedKey: tToggleCollapsedKey;
    path: string[];
    expendedKeys: IterableObject;
}

class List extends React.Component<iListProps> {
    render() {
        const keys = Object.keys(this.props.obj);
        keys.sort();
        return (
            <ul style={{marginLeft:"15px", paddingLeft:"0px"}}>
                {keys.map((key) => {
                    const pathValue = _.get(
                        this.props.expendedKeys,
                        key,
                        false
                    );
                    return (
                        <ListItem
                            key={_.uniqueId(key)}
                            path={this.props.path.concat([key])}
                            value={this.props.obj[key]}
                            stats={this.props.stats}
                            toggleCollapsedKey={this.props.toggleCollapsedKey}
                            isOpen={pathValue !== false}
                            expendedKeys={pathValue !== false ? pathValue : {}}
                        />
                    );
                })}
            </ul>
        );
    }
}

interface iListItemProps {
    value: any;
    stats: Stats;
    toggleCollapsedKey: tToggleCollapsedKey;
    path: string[];
    expendedKeys: any;
    isOpen: boolean;
}

interface iListItemState {
    open: boolean;
}

class ListItem extends React.Component<iListItemProps, iListItemState> {
    constructor(props: iListItemProps) {
        super(props);
        this.onClick = this.onClick.bind(this);
    }

    onClick() {
        this.props.toggleCollapsedKey(this.props.path);
    }

    render() {
        const objKey = this.props.path[this.props.path.length - 1];
        const { value, stats } = this.props;
        const valueSize = JSON.stringify({ [objKey]: value }).length - 2;
        const canOpen = _.isPlainObject(value);
        const sizePercentage = stats.perc(valueSize);
        return (
            <li>
                <span onClick={canOpen ? this.onClick : _.noop} style={{color: heatMapColorforValue(sizePercentage/100)}}>
                    {sizePercentage}% {objKey} <Value value={value} />
                </span>
                {this.props.isOpen && (
                    <List
                        obj={value}
                        stats={stats}
                        path={this.props.path}
                        toggleCollapsedKey={this.props.toggleCollapsedKey}
                        expendedKeys={this.props.expendedKeys}
                    />
                )}
            </li>
        );
    }
}

function heatMapColorforValue(value: number){
  var h = (1.0 - value) * 240
  return "hsl(" + h + ", 100%, 50%)";
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

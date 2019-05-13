import * as _ from "lodash";
import React from "react";
import { JsonDocumentStats } from "../../json-size-explorer/JsonDocumentStats";
import { limitLen } from "../../uiUtils";
import { HoverStats } from "./HoverStats";
import style from "./style.module.css";

type tToggleCollapsedKey = (path: string[]) => void;
type tHoverOn = (key: string) => void;

interface iProps {
    jsonObj: IterableObject;
    jsonStats: JsonDocumentStats;
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
        this.hoverOn = this.hoverOn.bind(this);
    }

    hoverOn(keyName: string) {
        this.setState({ hoverObjKey: keyName });
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
                <div className={style.globalContainer}>
                    <div className={style.listContainer}>
                        <List
                            obj={this.props.jsonObj}
                            stats={this.props.jsonStats}
                            path={[]}
                            expendedKeys={this.state.expendedKeys}
                            toggleCollapsedKey={this.toggleCollapsedKey}
                            hoverOn={this.hoverOn}
                        />
                    </div>
                    <div>
                        {this.state.hoverObjKey.length > 0 && (
                            <HoverStats
                                jsonObj={this.props.jsonObj}
                                jsonStats={this.props.jsonStats}
                                objKey={this.state.hoverObjKey}
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
    stats: JsonDocumentStats;
    toggleCollapsedKey: tToggleCollapsedKey;
    path: string[];
    expendedKeys: IterableObject;
    hoverOn: tHoverOn;
}

class List extends React.Component<iListProps> {
    render() {
        const { obj } = this.props;
        const keys = Object.keys(obj);
        keys.sort();
        return (
            <ul className={style.list}>
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
                            valueFromArray={_.isArray(obj)}
                            value={obj[key]}
                            stats={this.props.stats}
                            toggleCollapsedKey={this.props.toggleCollapsedKey}
                            isOpen={pathValue !== false}
                            hoverOn={this.props.hoverOn}
                            expendedKeys={pathValue !== false ? pathValue : {}}
                        />
                    );
                })}
            </ul>
        );
    }
}

interface iListItemProps {
    readonly value: any;
    readonly valueFromArray: boolean;
    readonly stats: JsonDocumentStats;
    readonly toggleCollapsedKey: tToggleCollapsedKey;
    readonly path: string[];
    readonly expendedKeys: any;
    readonly isOpen: boolean;
    readonly hoverOn: tHoverOn;
}

interface iListItemState {
    open: boolean;
}

class ListItem extends React.Component<iListItemProps, iListItemState> {
    constructor(props: iListItemProps) {
        super(props);
        this.onClick = this.onClick.bind(this);
        this.onHoverIn = this.onHoverIn.bind(this);
    }
    onHoverIn() {
        this.props.hoverOn(this.props.path[this.props.path.length - 1]);
    }
    onClick() {
        this.props.toggleCollapsedKey(this.props.path);
    }

    render() {
        const objKey = this.props.path[this.props.path.length - 1];
        const { value, stats } = this.props;
        const valueSize = JSON.stringify({ [objKey]: value }).length - 2;
        const canOpen = _.isPlainObject(value) || _.isArray(value);
        const sizePercentage = stats.perc(valueSize);
        const keyLabel = this.props.valueFromArray
            ? "Array Key " + objKey
            : objKey;
        return (
            <li className={style.item}>
                <span
                    onClick={canOpen ? this.onClick : _.noop}
                    style={{
                        color: heatMapColorforValue(sizePercentage / 100),
                    }}
                    onMouseEnter={this.onHoverIn}
                >
                    {sizePercentage}% {keyLabel} <Value value={value} />
                </span>
                {this.props.isOpen && (
                    <List
                        obj={value}
                        stats={stats}
                        path={this.props.path}
                        toggleCollapsedKey={this.props.toggleCollapsedKey}
                        expendedKeys={this.props.expendedKeys}
                        hoverOn={this.props.hoverOn}
                    />
                )}
            </li>
        );
    }
}

function heatMapColorforValue(value: number) {
    var h = (1.0 - value) * 240;
    return "hsl(" + h + ", 100%, 50%)";
}

function Value(props: { value: any }) {
    const value = props.value;
    if (_.isNull(value)) {
        return <span className={style.null + " " + style.value}>null</span>;
    } else if (_.isNumber(value)) {
        return <span className={style.num + " " + style.value}>{value}</span>;
    } else if (_.isString(value)) {
        return (
            <span className={style.str + " " + style.value}>
                "{limitLen(value, 25)}"
            </span>
        );
    } else if (_.isArray(value)) {
        return (
            <span className={style.arr + " " + style.value}>
                [{value.length}]
            </span>
        );
    } else if (_.isPlainObject(value)) {
        return (
            <span className={style.obj + " " + style.value}>
                {"{"}
                {_.size(value)}
                {"}"}
            </span>
        );
    } else if (_.isBoolean(value)) {
        return (
            <span className={style.bool + " " + style.value}>
                {String(value)}
            </span>
        );
    }
    return <>###</>;
}

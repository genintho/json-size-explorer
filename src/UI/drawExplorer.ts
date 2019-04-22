import { elId, limitLen } from "./DomUtils";
import { Stats } from "../JsonSizeExplorer/stats";
import * as _ from "lodash";

export function drawExplorer(originalJSON: any, documentStats: Stats) {
    console.log(documentStats);
    const root = elId("result-explorer");
    root.hidden = false;
    drawList(originalJSON, documentStats, [], root);
    root.addEventListener("click", (event: any) => {
        console.log(event);
        if (!event.target.classList.contains("sub")) {
            console.log("not sublist");
            return;
        }
        const childrenRoot = event.target.querySelector("div");
        if (childrenRoot.childElementCount) {
            childrenRoot.innerHTML = "";
            return;
        }
        const path = JSON.parse(event.target.dataset.path);
        drawList(originalJSON, documentStats, path, childrenRoot);
    });
}

function drawList(
    originalJSON: any,
    documentStats: Stats,
    path: string[],
    node: HTMLElement
) {
    let target = originalJSON;
    const pathTemp = path.concat([]);
    while (pathTemp.length) {
        const key = pathTemp.shift();
        if (key) {
            target = target[key];
        }
    }
    const keys = Object.keys(target);
    keys.sort();
    const ul = document.createElement("ul");
    ul.classList.add("fa-ul");
    keys.forEach((key) => {
        const value = target[key];
        const valueSize = JSON.stringify({ [key]: value }).length - 2;
        const li = document.createElement("li");
        li.classList.add("fa-li");
        let nodeText = documentStats.perc(valueSize) + "% - " + key;
        li.dataset.path = JSON.stringify(path.concat([key]));

        const hasChildren = _.isPlainObject(value) || _.isArray(value);
        li.classList.toggle("sub", hasChildren);

        if (_.isNumber(value)) {
            nodeText += " - " + value;
        } else if (_.isString(value)) {
            nodeText += ' - "' + limitLen(value) + '"';
        } else if (_.isNull(value)) {
            nodeText += " - null";
        } else if (_.isArray(value)) {
            nodeText += " - [" + value.length + "]";
        } else if (_.isPlainObject(value)) {
            nodeText += " - {" + _.size(value) + "}";
        } else if (_.isBoolean(value)) {
            nodeText += " - " + value;
        }

        li.appendChild(document.createTextNode(nodeText));
        const subList = document.createElement("div");
        li.appendChild(subList);
        ul.appendChild(li);
    });
    node.appendChild(ul);
}

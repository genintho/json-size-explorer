import {elId} from "./DomUtils";
import {Stats } from "../JsonSizeExplorer/stats";

export function drawExplorer(originalJSON:any, documentStats: Stats) {
    console.log(documentStats);
    const root = elId("result-explorer");
    root.hidden = false;
    drawList(originalJSON,[], root);
}

function drawList(originalJSON :any, path :string[], node: HTMLElement) {
    let target = originalJSON;
    while (path.length) {
        const key = path.shift();
        if (key){
        target = target[key];}
    }
    const keys = Object.keys(target);
    keys.sort();
    const ul = document.createElement("ul");
    keys.forEach((key) => {
        const li = document.createElement("li");
        // @ts-ignore
        li.dataset.path = li.appendChild(document.createTextNode(key));
        ul.appendChild(li);
    });
    node.appendChild(ul);
}


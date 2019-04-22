import { elId } from "./DomUtils";
import { Stats } from "../JsonSizeExplorer/stats";

export function drawExplorer(originalJSON: any, documentStats: Stats) {
    console.log(documentStats);
    const root = elId("result-explorer");
    root.hidden = false;
    drawList(originalJSON, [], root);
    root.addEventListener("click", (event: any) => {
        console.log(event);
        const path = JSON.parse(event.target.dataset.path);
        console.log(path);
        drawList(originalJSON, path, event.target.querySelector("div"));
    });
}

function drawList(originalJSON: any, path: string[], node: HTMLElement) {
    debugger;
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
    keys.forEach((key) => {
        const li = document.createElement("li");
        li.dataset.path = JSON.stringify(path.concat([key]));
        li.appendChild(document.createTextNode(key));
        const subList = document.createElement("div");
        // subList.id = "ul-" + JSON.stringify(path.concat([key]));
        // JSON.stringify(path.concat([key]));

        li.appendChild(subList);
        ul.appendChild(li);
    });
    node.appendChild(ul);
}

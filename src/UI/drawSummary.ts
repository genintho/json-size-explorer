import { elId, limitLen } from "./DomUtils";
import { Stats } from "../JsonSizeExplorer/stats";

const NB_ITEMS = 5;

export function drawSummary(documentStats: Stats) {
    if (!documentStats) {
        return;
    }
    elId("result-summary").hidden = false;
    elId("general").innerText =
        "Total document size: " + thousands(documentStats.totalLength);
    addToList("keyStats", [
        "Number of keys: " + thousands(documentStats.nbOfKey()),
        "Number of unique keys: " +
            thousands(Object.keys(documentStats.keys).length),
        "Key size: " +
            thousands(documentStats.keySize()) +
            " - " +
            documentStats.perc(documentStats.keySize()) +
            "%",
    ]);
    drawMostFrequentKeys(documentStats);
    drawHeaviestKeys(documentStats);
    drawMostFrequentValues(documentStats);
    drawHeaviestValues(documentStats);
    drawMostFreqDup(documentStats);
    drawHeaviestDup(documentStats);
}

function drawMostFrequentKeys(documentStats: Stats) {
    drawTableBody(
        "freqKeys",
        documentStats.keySortedByCount.bind(documentStats),
        (k: string) => {
            const size = k.length * documentStats.keys[k];
            return [
                limitLen(k),
                thousands(documentStats.keys[k]),
                thousands(size),
                documentStats.perc(size),
            ];
        }
    );
}

function drawHeaviestKeys(documentStats: Stats) {
    drawTableBody(
        "heavyKeys",
        documentStats.keySortedBySize.bind(documentStats),
        (k: string) => {
            const size = k.length * documentStats.keys[k];
            return [
                k,
                thousands(documentStats.keys[k]),
                thousands(size),
                documentStats.perc(size),
            ];
        }
    );
}

function drawMostFrequentValues(documentStats: Stats) {
    drawTableBody(
        "freqValue",
        documentStats.valuesSortedByCount.bind(documentStats),
        (k: string) => {
            const size = documentStats.values[k].length * k.length;
            return [
                limitLen(k),
                thousands(documentStats.values[k].length),
                thousands(size),
                documentStats.perc(size) + "%",
            ];
        }
    );
}

function drawHeaviestValues(documentStats: Stats) {
    drawTableBody(
        "heavyValue",
        documentStats.valuesSortedBySize.bind(documentStats),
        (k: string) => {
            const size = documentStats.values[k].length * k.length;
            return [
                limitLen(k),
                thousands(documentStats.values[k].length),
                thousands(size),
                documentStats.perc(size) + "%",
            ];
        }
    );
}

function drawMostFreqDup(documentStats: Stats) {
    drawTableBody(
        "dupFreq",
        documentStats.freqDupsValue.bind(documentStats),
        (k: string) => {
            const size = documentStats.keyValue[k] * (k.length - 3);
            return [
                limitLen(k.replace("@#@", " = ")),
                thousands(documentStats.keyValue[k]),
                thousands(size),
                documentStats.perc(size) + "%",
            ];
        }
    );
}

function drawHeaviestDup(documentStats: Stats) {
    drawTableBody(
        "heavyDup",
        documentStats.biggestDupsValue.bind(documentStats),
        (k: string) => {
            const size = documentStats.keyValue[k] * (k.length - 3);
            return [
                limitLen(k.replace("@#@", " = ")),
                thousands(documentStats.keyValue[k]),
                thousands(size),
                documentStats.perc(size) + "%",
            ];
        }
    );
}

function drawTableBody(
    containerID: string,
    dataProvider: () => string[],
    processor: (k: string) => (string | number)[]
) {
    let frag = document.createDocumentFragment();
    dataProvider()
        .slice(-NB_ITEMS)
        .map(processor)
        .forEach((row) => {
            const tr = buildRow(row);
            frag.appendChild(tr);
        });

    const node = elId(containerID);
    node.innerHTML = "";
    node.appendChild(frag);
}

function buildRow(arr: (string | number)[]) {
    const tr = document.createElement("tr");
    arr.forEach((item) => {
        const td = document.createElement("td");
        td.innerText = String(item);
        tr.appendChild(td);
    });
    return tr;
}

const numFormator = new Intl.NumberFormat(navigator.language);
function thousands(input: number) {
    return numFormator.format(input);
}

function addToList(containerId: string, items: string[]) {
    const frag = document.createDocumentFragment();
    items.forEach((item) => {
        const li = document.createElement("li");
        li.appendChild(document.createTextNode(item));
        frag.appendChild(li);
    });
    const node = elId(containerId);
    node.innerHTML = "";
    node.appendChild(frag);
}

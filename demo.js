let NB_ITEMS = 5;
let documentStats = null;
document.getElementById("sub").onclick = () => {
    const raw = document.getElementById("area").value;
    documentStats = JSONSizeExplorer(raw);
    displayResults();
};

document.getElementById("nbItems").onchange = (e) => {
    NB_ITEMS = e.target.value;
    displayResults();
};

function displayResults() {
    if (!documentStats) {
        return;
    }
    // const resElm = document.getElementById("res");
    // resElm.innerText = documentStats.totalLength;
    drawMostFrequentKeys();
    drawHeaviestKeys();
}

function drawMostFrequentKeys() {
    drawTableBody("freqKeys", "keySortedByCount", (k) => {
        const size = k.length * documentStats.keys[k];
        return [
            k,
            thousands(documentStats.keys[k]),
            thousands(size),
            documentStats.perc(size),
        ];
    });
}

function drawHeaviestKeys() {
    drawTableBody("heavyKeys", "keySortedBySize", (k) => {
        const size = k.length * documentStats.keys[k];
        return [
            k,
            thousands(documentStats.keys[k]),
            thousands(size),
            documentStats.perc(size),
        ];
    });
}

function drawTableBody(containerID, method, processor) {
    let frag = document.createDocumentFragment();
    documentStats[method]()
        .slice(-NB_ITEMS)
        .map(processor)
        .forEach((row) => {
            const tr = buildRow(row);
            frag.appendChild(tr);
        });

    document.getElementById(containerID).innerHTML = "";
    document.getElementById(containerID).appendChild(frag);
}

function buildRow(arr) {
    const tr = document.createElement("tr");
    arr.forEach((item) => {
        const td = document.createElement("td");
        td.innerText = item;
        tr.appendChild(td);
    });
    return tr;
}

function thousands(input) {
    return new Intl.NumberFormat(navigator.language).format(input);
}

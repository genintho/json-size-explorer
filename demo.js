let NB_ITEMS = 5;
let documentStats = null;
elId("sub").onclick = () => {
    const raw = elId("area").value;
    documentStats = JSONSizeExplorer(raw);
    displayResults();
};

elId("nbItems").onchange = (e) => {
    NB_ITEMS = e.target.value;
    displayResults();
};

function displayResults() {
    if (!documentStats) {
        return;
    }
    elId("general").innerText =
        "Total document size " + thousands(documentStats.totalLength);
    elId("keyStats").innerText =
        "Number of keys: " +
        thousands(documentStats.nbOfKey()) +
        "Key size: " +
        thousands(documentStats.keySize()) +
        " - " +
        documentStats.perc(documentStats.keySize()) +
        "%";
    drawMostFrequentKeys();
    drawHeaviestKeys();
    drawMostFrequentValues();
    drawHeaviestValues();
    drawMostFreqDup();
    drawHeaviestDup();
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

function drawMostFrequentValues() {
    drawTableBody("freqValue", "valuesSortedByCount", (k) => {
        const size = documentStats.values[k].length * k.length;
        return [
            k.length > 60 ? k.substr(0, 60) + "..." : k,
            thousands(documentStats.values[k].length),
            thousands(size),
            documentStats.perc(size) + "%",
        ];
    });
}

function drawHeaviestValues() {
    drawTableBody("heavyValue", "valuesSortedBySize", (k) => {
        const size = documentStats.values[k].length * k.length;
        return [
            k.length > 60 ? k.substr(0, 60) + "..." : k,
            thousands(documentStats.values[k].length),
            thousands(size),
            documentStats.perc(size) + "%",
        ];
    });
}

function drawMostFreqDup() {
    drawTableBody("dupFreq", "freqDupsValue", (k) => {
        const size = documentStats.keyValue[k] * (k.length - 3);
        return [
            k.length > 60 ? k.substr(0, 60) + "..." : k,
            thousands(documentStats.keyValue[k]),
            thousands(size),
            documentStats.perc(size) + "%",
        ];
    });
}

function drawHeaviestDup() {
    drawTableBody("heavyDup", "biggestDupsValue", (k) => {
        const size = documentStats.keyValue[k] * (k.length - 3);
        return [
            k.length > 60 ? k.substr(0, 60) + "..." : k,
            thousands(documentStats.keyValue[k]),
            thousands(size),
            documentStats.perc(size) + "%",
        ];
    });
}

function elId(id) {
    return document.getElementById(id);
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

    elId(containerID).innerHTML = "";
    elId(containerID).appendChild(frag);
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

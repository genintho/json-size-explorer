let NB_ITEMS = 5;
let documentStats = null;

function handleFileSelect(evt) {
    const file = evt.target.files[0]; // FileList object

    if (file.type !== "application/json") {
        alert("Please select an JSON file");
        return;
    }
    var reader = new FileReader();
    // Closure to capture the file information.
    reader.onload = function() {
        processRaw(reader.result);
        setTimeout(() => {
            elId("area").value = "Inserting file content ...";
            setTimeout(() => {
                elId("area").value = reader.result;
            }, 100);
        }, 0);
    };

    // Read in the image file as a data URL.
    reader.readAsText(file);
}

elId("file").addEventListener("change", handleFileSelect, false);

elId("sub").onclick = () => {
    processRaw(elId("area").value);
};

elId("nbItems").onchange = (e) => {
    NB_ITEMS = e.target.value;
    displayResults();
};

function processRaw(raw) {
    documentStats = JSONSizeExplorer(raw);
    displayResults();
}

function displayResults() {
    if (!documentStats) {
        return;
    }
    elId("res").style.display = "block";
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
            limitLen(k),
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
            limitLen(k),
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
            limitLen(k),
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
            limitLen(k),
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
            limitLen(k),
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

function limitLen(input) {
    return input.length > 60 ? input.substr(0, 60) + "..." : input;
}

/*!
 * This code is not clearly not perfect neither is aimed at being perfect.
 * It is works and is small. That's good enough for this project.
 */

import { elId } from "./DomUtils";
import { drawExplorer } from "./drawExplorer";
import { drawSummary } from "./drawSummary";
import JSONSizeExplorer from "../JsonSizeExplorer/main";

let NB_ITEMS = 5;
let documentStats = null;
let originalObj = null;

document.addEventListener("DOMContentLoaded", () => {
    elId("sub").click();
});

function handleFileSelect(evt: any) {
    // Can not find the correct event type.
    const file = evt.target.files[0]; // FileList object

    if (file.type !== "application/json") {
        alert("Please select an JSON file");
        return;
    }
    const reader = new FileReader();
    // Closure to capture the file information.
    reader.onload = function() {
        const fileReaderData = reader.result as string;
        if (fileReaderData === null || fileReaderData.length === 0) {
            return;
        }
        processRaw(fileReaderData);
        setTimeout(() => {
            // elId("area").value = "Inserting file content ...";
            // setTimeout(() => {
            const textArea = elId("area") as HTMLTextAreaElement;
            textArea.value = fileReaderData;
            // }, 100);
        }, 0);
    };

    // Read in the image file as a data URL.
    reader.readAsText(file);
}

elId("file").addEventListener("change", handleFileSelect, false);

elId("sub").onclick = () => {
    const el = elId("area") as HTMLInputElement;
    processRaw(el.value);
};

//
// elId("nbItems").onchange = (e) => {
//     NB_ITEMS = e.target.value;
//     drawSummary();
// };

function processRaw(raw: string) {
    elId("intro").hidden = true;
    documentStats = JSONSizeExplorer(raw);

    originalObj = JSON.parse(raw);
    document.body.style.backgroundColor = "";

    drawSummary(documentStats);
    drawExplorer(originalObj, documentStats);
}

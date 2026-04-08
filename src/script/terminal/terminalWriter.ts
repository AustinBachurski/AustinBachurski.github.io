import type { TerminalContent }         from "../formatting/terminalContent.js";
import { DivStyle }                     from "../formatting/styles.js";
import { assertElementExists, sleep }   from "../utilities/utilities.js";

export function initializeTerminalWriter(): void {
    terminalOutput = assertElementExists<HTMLDivElement>("#terminal-content");
}

export async function pushContent(content: TerminalContent): Promise<void> {
    lineQueue.push(content);

    if (generatingOutput) { return; }

    generatingOutput = true;

    let current = lineQueue.shift();

    while (current) {
        await teletypeLine(current);
        current = lineQueue.shift();
    }

    generatingOutput = false;
}

export function clearTerminal(): void {
    terminalOutput.innerHTML = "";
}

const lineWriteDelay = 100;

let lineQueue:          TerminalContent[]   = [];
let generatingOutput:   boolean             = false;
let terminalOutput:     HTMLDivElement;

function createLineElement(style: DivStyle): HTMLDivElement {
    const div = document.createElement("div");
    div.classList.add(style);
    return div;
}

async function teletypeLine(content: TerminalContent): Promise<void> {
    const element = createLineElement(content.style);
    terminalOutput.appendChild(element);

    if (content.style == DivStyle.empty) {
        scrollToBottom();
        await sleep(lineWriteDelay);
        return;
    }

    if (content.style == DivStyle.html) {
        element.innerHTML = content.text;
        scrollToBottom();
        await sleep(lineWriteDelay);
        return;
    }

    if (content.typeDelay == 0) {
        element.textContent = content.text;
        scrollToBottom();
        await sleep(lineWriteDelay);
        return;
    }

    for (let c of content.text) {
        element.textContent += c;
        scrollToBottom();
        await sleep(content.typeDelay);
    }

    await sleep(lineWriteDelay);
}

function scrollToBottom(): void {
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
}


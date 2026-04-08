import type { TerminalContent }         from "../formatting/terminalContent.js";
import { DivStyle }                     from "../formatting/styles.js";
import { WriteDelay }                   from "../terminal/writeDelay.js";
import { assertElementExists, sleep }   from "../utilities/utilities.js";

export function initializeTerminalWriter(): void {
    terminalViewport = assertElementExists<HTMLDivElement>("#terminal-viewport");
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

let lineQueue:          TerminalContent[]   = [];
let generatingOutput:   boolean             = false;
let terminalViewport:   HTMLDivElement;
let terminalOutput:     HTMLDivElement;

function createLineElement(style: DivStyle): HTMLDivElement {
    const div = document.createElement("div");

    if (style) {
        div.classList.add(style);
    }

    return div;
}

function scrollToBottom(): void {
    terminalViewport.scrollTop = terminalViewport.scrollHeight;
}

async function teletypeLine(content: TerminalContent): Promise<void> {
    const element = createLineElement(content.style);
    terminalOutput.appendChild(element);

    if (content.style == DivStyle.empty) {
        scrollToBottom();
        await sleep(WriteDelay.ms_100);
        return;
    }

    if (content.style == DivStyle.html) {
        element.innerHTML = content.text;
        scrollToBottom();
        await sleep(WriteDelay.ms_100);
        return;
    }

    if (content.typeDelay == 0) {
        element.textContent = content.text;
        scrollToBottom();
        await sleep(WriteDelay.ms_100);
        return;
    }

    for (let c of content.text) {
        element.textContent += c;
        scrollToBottom();
        await sleep(content.typeDelay);
    }

    await sleep(WriteDelay.ms_100);
}


import type { TerminalContent }         from "./types/terminalContent";
import { assertElementExists, sleep }   from "./utilities";
import { DivStyle }                     from "./types/styles";

export function initializeTerminalWriter(): void {
    terminalOutput = assertElementExists<HTMLDivElement>("#terminal-content");
}

const charWriteDelay = 7;
const lineWriteDelay = 100;

let lineQueue:          TerminalContent[]   = [];
let generatingOutput:   boolean             = false;
let terminalOutput:     HTMLDivElement;

function scrollToBottom(): void {
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
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

function createLineElement(style: DivStyle): HTMLDivElement {
    const div = document.createElement("div");
    div.classList.add(style);
    return div;
}

async function teletypeLine(content: TerminalContent): Promise<void> {
    const element = createLineElement(content.style);
    terminalOutput.appendChild(element);

    if (!content) {
        scrollToBottom();
        return;
    }

    if (content.style == DivStyle.EMPTY) {
        scrollToBottom();
        return;
    }

    if (content.style == DivStyle.HTML) {
        element.innerHTML = content.text;
        scrollToBottom();
        sleep(lineWriteDelay);
        return;
    }

    for (let c of content.text) {
        element.textContent += c;
        scrollToBottom();
        sleep(charWriteDelay);
    }

    sleep(lineWriteDelay);
}


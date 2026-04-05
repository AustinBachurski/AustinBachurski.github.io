import { builtin, emptyDiv, htmlText, normalText } from "./shell_builtins.js";

let tuiTextInput;
let tuiTextDisplay;
let tuiCwdDisplay;
let tuiTextAfterCursor;
let tuiContent;
let generatingOutput = false;
let lineQueue = [];
let cursorPosition = 0;

export function initializeTuiInput() {
    tuiTextInput          = document.querySelector("#hidden-terminal-input");
    tuiTextDisplay        = document.querySelector("#tui-input-display");
    tuiCwdDisplay         = document.querySelector("#tui-input-cwd");
    tuiTextAfterCursor    = document.querySelector("#tui-input-after-cursor");
    tuiContent            = document.querySelector("#tui-content");

    document.addEventListener('click', () => tuiTextInput.focus());
    tuiTextInput.addEventListener('keydown', onKeypress);
    tuiTextInput.addEventListener('input', onInputChanged);

    tuiTextInput.focus();
}

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

function syncCursorDisplay() {
    const text = tuiTextInput.value;
    tuiTextDisplay.textContent  = text.slice(0, cursorPosition);
    tuiTextAfterCursor.textContent = text.slice(cursorPosition);
}

function moveCursorTo(target) {
    cursorPosition = Math.max(0, Math.min(target, tuiTextInput.value.length));
    tuiTextInput.setSelectionRange(cursorPosition, cursorPosition);
    syncCursorDisplay();
}

function scrollToBottom() {
    tuiContent.scrollTop = tuiContent.scrollHeight;
}

async function displayHelpText() {
    for (let line of builtin.help) {
        await pushContent(line);
    }
}

function generateCommandNotFoundLine(command) {
    return { style: normalText, text: command.split(' ')[0] + ": command not found" };
}

async function handleCommand(command) {
    switch (command) {
        case "clear":
            tuiContent.innerHTML = '';
            break;

        case "help":
            displayHelpText();
            break;

        case "cd":
        break;

        case "ls":
        break;

        case "cat":
        break;

        case "exit":
        break;

        default:
            await pushContent(generateCommandNotFoundLine(command));
            break;
    }
}

function createLineElement(style) {
    const div = document.createElement("div");
    div.classList.add(style);
    return div;
}

async function teletypeLine(content) {
    const element = createLineElement(content.style);
    tuiContent.appendChild(element);

    if (!content) {
        scrollToBottom();
        return;
    }

    if (content.style == emptyDiv) {
        scrollToBottom();
        return;
    }

    if (content.style == htmlText) {
        element.innerHTML = content.text;
        scrollToBottom();
        await sleep(100);
        return;
    }

    for (let c of content.text) {
        element.textContent += c;
        scrollToBottom();
        await sleep(7);
    }

    await sleep(100);
}

async function pushContent(content) {
    lineQueue.push(content);

    if (generatingOutput) { return; }

    generatingOutput = true;

    while (lineQueue.length > 0) {
        const currentLine = lineQueue.shift();
        await teletypeLine(currentLine);
    }

    generatingOutput = false;
}

function onInputChanged() {
    cursorPosition = tuiTextInput.selectionStart ?? tuiTextInput.value.length;
    syncCursorDisplay();
};

function onKeypress(event) {
    switch (event.key) {
        case 'Enter':
            event.preventDefault();
            const text = tuiTextInput.value.trim();
            tuiTextInput.value = '';
            cursorPosition = 0;
            syncCursorDisplay();
            if (text) { handleCommand(text); }
            break;

        case 'c':
        case 'C':
            if (!event.ctrlKey) { break; }
            event.preventDefault();
            tuiTextInput.value = '';
            cursorPosition = 0;
            syncCursorDisplay();
            handleCommand("^C");
            break;

        case 'ArrowLeft':
            event.preventDefault();
            moveCursorTo(cursorPosition - 1);
            break;

        case 'ArrowRight':
            event.preventDefault();
            moveCursorTo(cursorPosition + 1);
            break;

        case 'Home':
            event.preventDefault();
            moveCursorTo(0);
            break;

        case 'End':
            event.preventDefault();
            moveCursorTo(tuiTextInput.length);
            break;
    }
}


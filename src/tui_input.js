let tuiTextInput;
let tuiTextDisplay;
let tuiCwdDisplay;
let tuiTextAfterCursor;
let tuiContent;
let generatingOutput = false;
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

async function handleCommand(command) {
    if (command == "clear") {
        tuiContent.innerHTML = '';
        return;
    }

    await teletypeLine("Testing testing testing.");
}

function createLineElement() {
    const div = document.createElement("div");
    return div;
}

async function teletypeLine(item) {
    const element = createLineElement(item.type);
    tuiContent.appendChild(element);

    if (!item) {
        scrollToBottom();
        return;
    }

    if (item === 'html') {
        el.innerHTML = item.html;
        scrollToBottom();
        await sleep(CONFIG.lineDelay);
        return;
    }

    for (let c of item) {
        element.textContent += c;
        scrollToBottom();
        await sleep(7);
    }

    await sleep(100);
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


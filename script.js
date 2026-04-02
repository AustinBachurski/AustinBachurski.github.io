const tuiTextInput          = document.querySelector("#hidden-terminal-input");
const tuiTextDisplay        = document.querySelector("#tui-input-display");
const tuiCwdDisplay         = document.querySelector("#tui-input-cwd");
const tuiTextAfterCursor    = document.querySelector("#tui-input-after-cursor");
const tuiInputCursor        = document.querySelector("#tui-input-cursor");
const tuiContent            = document.querySelector("#tui-content");

let generatingOutput = false;
let cursorPosition = 0;

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Re-focus the hidden input on any click in the terminal
document.addEventListener('click', () => tuiTextInput.focus());

tuiTextInput.addEventListener('keydown', e => {
    switch (e.key) {
        case 'Enter':
            e.preventDefault();
            const text = tuiTextInput.value.trim();
            tuiTextInput.value = '';
            cursorPosition = 0;
            syncCursorDisplay();
            if (text) { handleCommand(text); }
            break;

        case 'c':
        case 'C':
            if (!e.ctrlKey) { break; }
            e.preventDefault();
            tuiTextInput.value = '';
            cursorPosition = 0;
            syncCursorDisplay();
            handleCommand("^C");
            break;

        case 'ArrowLeft':
            e.preventDefault();
            moveCursorTo(cursorPosition - 1);
            break;

        case 'ArrowRight':
            e.preventDefault();
            moveCursorTo(cursorPosition + 1);
            break;

        case 'Home':
            e.preventDefault();
            moveCursorTo(0);
            break;

        case 'End':
            e.preventDefault();
            moveCursorTo(tuiTextInput.length);
            break;
    }
});

tuiTextInput.addEventListener('input', () => {
    cursorPosition = tuiTextInput.selectionStart ?? tuiTextInput.value.length;
    syncCursorDisplay();
});


tuiTextInput.focus();

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


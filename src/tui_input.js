import { builtin, emptyDiv, htmlText, amberText, greenText, brightText } from "./shell_builtins.js";

let filesystem;
let tuiTextInput;
let tuiTextDisplay;
let tuiCWD;
let tuiTextAfterCursor;
let tuiContent;
let tuiUser;
let generatingOutput = false;
let lineQueue = [];
let cursorPosition = 0;

export async function initializeTuiInput() {
    filesystem          = await readFilesystem();
    tuiTextInput        = document.querySelector("#hidden-terminal-input");
    tuiTextDisplay      = document.querySelector("#tui-input-display");
    tuiCWD              = document.querySelector("#tui-input-cwd");
    tuiTextAfterCursor  = document.querySelector("#tui-input-after-cursor");
    tuiContent          = document.querySelector("#tui-content");
    tuiUser             = document.querySelector("#user-terminal");

    document.addEventListener('click', () => tuiTextInput.focus());
    tuiTextInput.addEventListener('keydown', onKeypress);
    tuiTextInput.addEventListener('input', onInputChanged);

    tuiTextInput.focus();
}

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function readFilesystem() {
    const response = await fetch("./src/filesystem.json");
    const data = await response.json();
    return data;
}

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

function getCwdFromFilesystem() {
    const path = tuiCWD.textContent.split('/');

    let cwd = filesystem['/'];

    for (let dir of path) {
        cwd = cwd.entries[dir];
    }

    return cwd;
}

async function traverseFilesystem(target) {
    const args = target.split('/');

    let cwd = getCwdFromFilesystem();
    let path = "";

    for (let dir of args) {
        dir = dir.trim();

        if (dir == "..") {
            // WORKING HERE.
            const pathArray = tuiCWD.textContent.split('/');
            pathArray.pop();
            await traverseFilesystem(pathArray.join('/'));
        }

        if (!(dir in cwd.entries)) {
            pushContent({
                style: greenText,
                text: "cd: " + path + dir + ": No such file or directory"
            });
            return;
        }

        if (cwd.entries[dir].type != "directory") {
            pushContent({
                style: greenText,
                text: "cd: " + path + dir + ": Not a directory" });
            return;
        }

        path += dir + '/';
        cwd = cwd.entries[dir];
    }


    tuiCWD.textContent += '/' + path.substring(0, path.length - 1);
}

async function executeCD(command) {
    let args = command.trim().split(' ');
    args.shift();  // Remove `cd` from args.

    if (args.length == 0) {
        // Go to home directory.
        tuiCWD.textContent = '~';
        return;
    }

    if (args.length != 1) {
        pushContent({
            style: greenText,
            text: "cd: too many arguments"
        });
        return;
    }

    traverseFilesystem(args[0]);
}

async function executeLS(command) {
    //TODO: Handle arguments.

    const cwd = getCwdFromFilesystem();

    for (let entry of Object.keys(cwd.entries)) {
        pushContent({
            style: (entry.type == "file" ? amberText : greenText),
            text: entry
        });
    }
}

function generateCommandNotFoundLine(command) {
    return { style: greenText, text: command.split(' ')[0] + ": command not found" };
}

async function handleCommand(command) {
    switch (command.split(' ')[0]) {
        case "clear":
            tuiContent.innerHTML = '';
            break;

        case "help":
            await displayHelpText();
            break;

        case "cd":
            await executeCD(command);
            break;

        case "ls":
            await executeLS(command);
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

function appendInputLineToContent(text) {
    const content = tuiUser.textContent
        + tuiCWD.textContent
        + "$ "
        + text;

    pushContent({
        style: htmlText,
        text: '<span class="dim-text">' + content + '</span>'
    });
}

function onKeypress(event) {
    switch (event.key) {
        case 'Enter':
            event.preventDefault();
            appendInputLineToContent(tuiTextInput.value);
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
            appendInputLineToContent(tuiTextInput.value);
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


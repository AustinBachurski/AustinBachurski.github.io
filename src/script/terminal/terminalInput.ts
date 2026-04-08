import { DimGreenLine }             from "../formatting/terminalContent.js";
import { assertElementExists }      from "../utilities/utilities.js";
import { handleTerminalCommand }    from "../commands/commandHandler.js";
import { pushContent }              from "./terminalWriter.js";


export function initializeTerminalInputHandlers(): void {
    inputElement                = assertElementExists<HTMLInputElement>("#hidden-terminal-input-element");
    textDisplayedBeforeCursor   = assertElementExists<HTMLSpanElement>("#terminal-text-before-cursor");
    textDisplayedAfterCursor    = assertElementExists<HTMLSpanElement>("#terminal-text-after-cursor");
    displayedCWD                = assertElementExists<HTMLSpanElement>("#terminal-cwd-display");

    document.addEventListener("click", () => inputElement.focus());
    inputElement.addEventListener("input", onInputChanged);
    inputElement.addEventListener("keydown", onKeypress);
    inputElement.focus();
}

let inputElement: HTMLInputElement;
let textDisplayedBeforeCursor: HTMLSpanElement;
let textDisplayedAfterCursor: HTMLSpanElement;
let displayedCWD: HTMLSpanElement;
let cursorPosition: number = 0;

function onInputChanged(): void {
    cursorPosition = inputElement.selectionStart ?? inputElement.value.length;
    syncCursorDisplay();
};

function syncCursorDisplay(): void {
    const text = inputElement.value;
    textDisplayedBeforeCursor.textContent  = text.slice(0, cursorPosition);
    textDisplayedAfterCursor.textContent = text.slice(cursorPosition);
}

function moveCursorTo(target: number): void {
    cursorPosition = Math.max(0, Math.min(target, inputElement.value.length));
    inputElement.setSelectionRange(cursorPosition, cursorPosition);
    syncCursorDisplay();
}

function appendInputLineToTerminalOutput(text: string): void {
    pushContent(new DimGreenLine(
        `guest@bach-term:${displayedCWD.textContent}$ ${text}`, 0
    ));
}

function onKeypress(event: KeyboardEvent): void {
    switch (event.key) {
        case 'Enter':
            event.preventDefault();
            appendInputLineToTerminalOutput(inputElement.value);
            const text = inputElement.value.trim();
            inputElement.value = '';
            cursorPosition = 0;
            syncCursorDisplay();
            if (text) { handleTerminalCommand(text); }
            break;

        case 'c':
        case 'C':
            if (!event.ctrlKey) { break; }
            event.preventDefault();
            appendInputLineToTerminalOutput(inputElement.value);
            inputElement.value = '';
            cursorPosition = 0;
            syncCursorDisplay();
            handleTerminalCommand("^C");
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
            moveCursorTo(inputElement.value.length);
            break;
    }
}


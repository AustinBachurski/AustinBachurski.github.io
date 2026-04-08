import { BlankLine, HtmlLine, NormalGreenLine } from "../formatting/terminalContent.js";
import { DivStyle }                             from "../formatting/styles.js";
import { assertElementExists }                  from "../utilities/utilities.js";
import { clearTerminal, pushContent }                        from "./terminalWriter.js";

export async function terminalReady(): Promise<void> {
    clearTerminal();
    assertElementExists<HTMLDivElement>("#terminal-input-container").style.display = "flex";
    await writeWelcomeMessage();
    assertElementExists<HTMLInputElement>("#hidden-terminal-input-element").focus();
}

async function writeWelcomeMessage(): Promise<void> {
    for (let line of welcomeMessage) {
        await pushContent(line);
    }
}


export const welcomeMessage = [
    new NormalGreenLine("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~"),
    new BlankLine(),
    new NormalGreenLine("Joseph Austin Bachurski - Software Engineer"),
    new BlankLine(),
    new NormalGreenLine("JA bach shell, version 0.1.12 - It's like bash, but strictly worse!"),
    new BlankLine(),
    new BlankLine(),
    new NormalGreenLine("Hint:"),
    new HtmlLine(
        `<span class="${DivStyle.normalGreenText}">    If this isn't your thing, type </span>`
            + `<span class="${DivStyle.brightGreenText}">exit</span>`
            + `<span class="${DivStyle.normalGreenText}">, hit enter,</span>`),
    new NormalGreenLine("    and you'll be taken to my standard portfolio page."),
    new BlankLine(),
    new HtmlLine(
        `<span class="${DivStyle.normalGreenText}">If you'd like to play along, type </span>`
            + `<span class="${DivStyle.brightGreenText}">help</span>`
            + `<span class="${DivStyle.normalGreenText}"> for available commands.</span>`),
    new BlankLine(),
    new NormalGreenLine("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~"),
    new BlankLine(),
] ;

export const helpHelpContent = [
    new NormalGreenLine("Usage: help [COMMAND]"),
    new NormalGreenLine("\tDisplay information about builtin commands."),
    new BlankLine(),
    new NormalGreenLine("\tDisplays brief summaries of builtin commands.  If COMMAND is"),
    new NormalGreenLine("\tspecified, gives detailed help on the commands matching COMMAND,"),
    new NormalGreenLine("\totherwise the list of help topics ir printed."),
    new BlankLine(),
    new NormalGreenLine("\tOptions:"),
    new NormalGreenLine("\t   NONE"),
    new BlankLine(),
    new NormalGreenLine("\tArguments:"),
    new NormalGreenLine("\t  COMMAND \tPattern specifying a help topic"),
    new BlankLine(),
];


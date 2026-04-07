import { BlankLine, HtmlLine, NormalGreenLine } from "../formatting/terminalContent.js";
import { DivStyle }                             from "../formatting/styles.js";
import { pushContent }                          from "../terminal/terminalWriter.js";

export async function displayHelpText(): Promise<void> {
    for (let line of helpContent) {
        await pushContent(line);
    }
}

const helpContent = [
    new NormalGreenLine(`These shell commands are defined internally.`),
    new BlankLine(),
    new HtmlLine(
        `<span class="${DivStyle.brightGreenText}">cd</span>`
            + `<span class="${DivStyle.dimGreenText}"> - Change the shell working directory.</span>`
    ),
    new HtmlLine(
        `<span class="${DivStyle.brightGreenText}">ls</span>`
            + `<span class="${DivStyle.dimGreenText}"> - List directory contents.</span>`
    ),
    new HtmlLine(
        `<span class="${DivStyle.brightGreenText}">cat</span>`
            + `<span class="${DivStyle.dimGreenText}"> - Display the contents of a file.</span>`
    ),
    new HtmlLine(
        `<span class="${DivStyle.brightGreenText}">exit</span>`
            + `<span class="${DivStyle.dimGreenText}"> - Close this terminal.</span>`
    ),
] ;


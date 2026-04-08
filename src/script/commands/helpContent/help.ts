import { BlankLine, HtmlLine, NormalGreenLine } from "../../formatting/terminalContent.js";
import { DivStyle }                             from "../../formatting/styles.js";

export const helpContent = [
    new NormalGreenLine("JAB bach, version 0.1.12 -It's like bash, but strictly worse!"),
    new NormalGreenLine("These shell commands are defined internally.  Type 'help' to see this list."),
    new NormalGreenLine("Type 'help command' to find out more about the function 'command'."),
    new NormalGreenLine("Use 'info bach' to find out more about the shell in general."),
    new BlankLine(),
    new HtmlLine(
        `<span class="${DivStyle.brightGreenText}">  cat</span>`
            + `<span class="${DivStyle.normalGreenText}"> - Display the contents of a file.</span>`
    ),
    new HtmlLine(
        `<span class="${DivStyle.brightGreenText}">clear</span>`
            + `<span class="${DivStyle.normalGreenText}"> - Clear the terminal display.</span>`
    ),
    new HtmlLine(
        `<span class="${DivStyle.brightGreenText}">   cd</span>`
            + `<span class="${DivStyle.normalGreenText}"> - Change the shell working directory.</span>`
    ),
    new HtmlLine(
        `<span class="${DivStyle.brightGreenText}"> exit</span>`
            + `<span class="${DivStyle.normalGreenText}"> - Close this terminal.</span>`
    ),
    new HtmlLine(
        `<span class="${DivStyle.brightGreenText}"> help</span>`
            + `<span class="${DivStyle.normalGreenText}"> - Display information about how to use a command. ex. 'help help'</span>`
    ),
    new HtmlLine(
        `<span class="${DivStyle.brightGreenText}">   ls</span>`
            + `<span class="${DivStyle.normalGreenText}"> - List the contents of the current directory.</span>`
    ),
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


import { BlankLine, NormalGreenLine } from "../../formatting/terminalContent.js";

export const catHelpContent = [
    new NormalGreenLine("Usage: help [command]"),
    new NormalGreenLine("\tDisplay information about builtin commands."),
    new BlankLine(),
    new NormalGreenLine("\tDisplays brief summaries of builtin commands.  If PATTERN is"),
    new NormalGreenLine("\tspecified, gives detailed help on the commands matching PATTERN,"),
    new NormalGreenLine("\totherwise the list of help topics ir printed."),
    new BlankLine(),
    new NormalGreenLine("\tOptions:"),
    new NormalGreenLine("\t   NONE"),
    new BlankLine(),
    new NormalGreenLine("\tArguments:"),
    new NormalGreenLine("\t  PATTERN\tPattern specifying a help topic"),
    new BlankLine(),
];


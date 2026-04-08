import { BlankLine, NormalGreenLine } from "../../formatting/terminalContent.js";

export const lsHelpContent = [
    new NormalGreenLine("Usage: ls [OPTION] [FILE]"),
    new NormalGreenLine("\tList information about the FILEs (the current directory by default)."),
    new BlankLine(),
    new NormalGreenLine("\tOptions:"),
    new NormalGreenLine("\t    -ls\tDisplay information in a list view."),
    new BlankLine(),
    new NormalGreenLine("\tArguments:"),
    new NormalGreenLine("\t     FILE\tThe directory or file to display."),
    new BlankLine(),
];


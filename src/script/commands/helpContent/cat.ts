import { BlankLine, NormalGreenLine } from "../../formatting/terminalContent.js";

export const catHelpContent = [
    new NormalGreenLine("Usage: cat [FILE]"),
    new NormalGreenLine("\tPrint the contents of FILE if FILE is a file."),
    new NormalGreenLine("\thint: say that five times fast"),
    new BlankLine(),
    new NormalGreenLine("\tOptions:"),
    new NormalGreenLine("\t   NONE"),
    new BlankLine(),
    new NormalGreenLine("\tArguments:"),
    new NormalGreenLine("\t     FILE \tThe name of the file to be printed"),
    new BlankLine(),
];


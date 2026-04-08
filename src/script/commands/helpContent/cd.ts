import { BlankLine, NormalGreenLine } from "../../formatting/terminalContent.js";

export const cdHelpContent = [
    new NormalGreenLine("Usage: cd [dir]"),
    new NormalGreenLine("\tChange the shell working directory."),
    new BlankLine(),
    new NormalGreenLine("\tChange the current directory to DIR.  The default DIR"),
    new NormalGreenLine("\tis HOME, represented as '~'."),
    new NormalGreenLine("\tUse 'cd ..' to move up one directory level."),
    new NormalGreenLine("\tNested directories may be separated with a '/' character,"),
    new NormalGreenLine("\ti.e. 'cd dir/nestedDir' or 'cd ../dir'"),
    new BlankLine(),
    new NormalGreenLine("\tOptions:"),
    new NormalGreenLine("\t   NONE"),
    new BlankLine(),
    new NormalGreenLine("\tArguments:"),
    new NormalGreenLine("\t      DIR\tThe desired destination directory"),
    new BlankLine(),
];


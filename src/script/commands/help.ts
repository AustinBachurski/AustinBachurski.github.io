import type { TerminalContent } from "../formatting/terminalContent.js";
import { pushContent } from "../terminal/terminalWriter.js";
import { catHelpContent } from "./helpContent/cat.js";
import { cdHelpContent } from "./helpContent/cd.js";
import { helpContent, helpHelpContent } from "./helpContent/help.js";
import { lsHelpContent } from "./helpContent/ls.js";

export async function help(args: string[]): Promise<void> {
    switch (args[0]) {
        case "help":
            display(helpHelpContent);
        break;

        case "cd":
            display(cdHelpContent);
        break;

        case "ls":
            display(lsHelpContent);
        break;

        case "cat":
            display(catHelpContent);
        break;

        case "exit":
        break;

        default:
            await display(helpContent);
            break;
    }
}

async function display(content: TerminalContent[]): Promise<void> {
    for (let line of content) {
        await pushContent(line);
    }
}


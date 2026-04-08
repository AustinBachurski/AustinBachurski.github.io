import type { TerminalContent } from "../formatting/terminalContent.js";
import { pushContent } from "../terminal/terminalWriter.js";
import { helpContent, helpHelpContent } from "./helpContent/help.js";

export async function help(args: string[]): Promise<void> {
    switch (args[0]) {
        case "help":
            display(helpHelpContent);
        break;

        case "cd":
        break;

        case "ls":
        break;

        case "cat":
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

